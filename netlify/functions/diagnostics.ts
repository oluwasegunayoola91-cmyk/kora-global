import {
  getEmailDiagnostics,
  sendOrderNotificationEmail,
  ADMIN_EMAIL,
} from '../../src/server/orderService';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json',
};

export const handler = async (event: any, _context: any) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: '',
    };
  }

  // GET: Return diagnostics of email configuration
  if (event.httpMethod === 'GET') {
    const diagnostics = getEmailDiagnostics();
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        diagnostics,
      }),
    };
  }

  // POST: Trigger a live test email directly to oluwasegunayoola91@gmail.com
  if (event.httpMethod === 'POST') {
    const testOrder = {
      orderId: `TEST-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName: 'Test Customer',
      phone: '08012345678',
      email: 'test@example.com',
      address: '12 Test Delivery Street, Ikeja',
      state: 'Lagos',
      lga: 'Ikeja',
      product: 'KORA Foldable Mosquito Net',
      size: '6 × 6',
      quantity: 1,
      unitPrice: 28000,
      total: 28000,
      date: new Date().toLocaleDateString('en-NG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      time: new Date().toLocaleTimeString('en-NG', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      }),
      status: 'diagnostic_test',
    };

    const emailResult = await sendOrderNotificationEmail(testOrder);
    const diagnostics = getEmailDiagnostics();

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: emailResult.sent,
        recipient: ADMIN_EMAIL,
        emailResult,
        diagnostics,
      }),
    };
  }

  return {
    statusCode: 405,
    headers: CORS_HEADERS,
    body: JSON.stringify({ error: 'Method Not Allowed' }),
  };
};
