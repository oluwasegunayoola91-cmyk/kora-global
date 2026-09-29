import fs from 'fs';
import path from 'path';
import {
  validateOrderInput,
  sendOrderNotificationEmail,
  getEmailDiagnostics,
  ADMIN_EMAIL,
} from '../../src/server/orderService';

// Fallback in-memory storage for serverless invocation
const recentSubmissions: { key: string; timestamp: number; order: any }[] = [];

// Safe file write for serverless ephemeral storage in /tmp
function recordOrderInTmp(order: any) {
  try {
    const tmpFile = path.resolve('/tmp', 'kora_orders.json');
    let orders: any[] = [];
    if (fs.existsSync(tmpFile)) {
      orders = JSON.parse(fs.readFileSync(tmpFile, 'utf-8'));
    }
    orders.unshift(order);
    fs.writeFileSync(tmpFile, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (err) {
    // Non-fatal in serverless environment
    console.warn('Note: Could not write order to /tmp:', err);
  }
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json',
};

export const handler = async (event: any, _context: any) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: '',
    };
  }

  // Handle health check / GET request
  if (event.httpMethod === 'GET') {
    const diagnostics = getEmailDiagnostics();
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        message: 'KORA Global Netlify Orders Function is healthy',
        adminNotificationEmail: ADMIN_EMAIL,
        diagnostics,
      }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' }),
    };
  }

  try {
    let body: any = {};
    if (event.body) {
      body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    }

    const validation = validateOrderInput(body);
    if (!validation.valid) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: false, error: validation.error }),
      };
    }

    const newOrder = validation.cleanData;

    // Deduplication check (within 60 seconds)
    const now = Date.now();
    const dedupeKey = `${newOrder.phone.toLowerCase()}-${newOrder.size}-${newOrder.address.toLowerCase()}`;
    const recent = recentSubmissions.find((r) => r.key === dedupeKey && now - r.timestamp < 60000);

    if (recent) {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: true,
          isDuplicate: true,
          order: recent.order,
          orderStored: true,
          emailSent: true,
          message: 'Order already received and queued for dispatch.',
        }),
      };
    }

    // Record order in serverless ephemeral storage
    recordOrderInTmp(newOrder);
    recentSubmissions.push({ key: dedupeKey, timestamp: now, order: newOrder });
    if (recentSubmissions.length > 50) recentSubmissions.shift();

    // Send real email notification to oluwasegunayoola91@gmail.com
    const emailResult = await sendOrderNotificationEmail(newOrder);

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        order: newOrder,
        orderStored: true,
        emailSent: emailResult.sent,
        emailMethod: emailResult.method,
        emailDeliveryDiagnostic: {
          orderId: newOrder.orderId,
          recipient: ADMIN_EMAIL,
          fromAddress: emailResult.sender,
          emailProvider: emailResult.method,
          emailProviderMessageId: emailResult.messageId || 'NONE',
          providerStatus: emailResult.providerStatus,
          errorMessage: emailResult.errorReason || null,
          warning: emailResult.warning || null,
        },
      }),
    };
  } catch (error: any) {
    console.error('Netlify function error processing order:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        error: 'An internal error occurred while processing the order.',
      }),
    };
  }
};
