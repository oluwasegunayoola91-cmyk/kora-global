import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  validateOrderInput,
  sendOrderNotificationEmail,
  ADMIN_EMAIL,
} from './src/server/orderService';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Persistent Orders Storage
const DATA_DIR = path.resolve(__dirname, 'data');
const ORDERS_FILE = path.resolve(DATA_DIR, 'orders.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

function getStoredOrders(): any[] {
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading orders file:', err);
    return [];
  }
}

function saveStoredOrders(orders: any[]) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving orders file:', err);
  }
}

// In-memory sliding window for recent order deduplication
interface RecentSubmission {
  key: string;
  timestamp: number;
  order: any;
}
const recentSubmissions: RecentSubmission[] = [];

// API: Process and verify new order
app.post('/api/orders', async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = validateOrderInput(req.body);
    if (!validation.valid) {
      res.status(400).json({ success: false, error: validation.error });
      return;
    }

    const newOrder = validation.cleanData;

    // Duplicate submission prevention (within 60 seconds)
    const now = Date.now();
    const dedupeKey = `${newOrder.phone.toLowerCase()}-${newOrder.size}-${newOrder.address.toLowerCase()}`;
    const recentIndex = recentSubmissions.findIndex((r) => r.key === dedupeKey && now - r.timestamp < 60000);

    if (recentIndex !== -1) {
      const existing = recentSubmissions[recentIndex].order;
      res.json({
        success: true,
        isDuplicate: true,
        order: existing,
        orderStored: true,
        emailSent: true,
        message: 'Order already received and queued for dispatch.',
      });
      return;
    }

    // 1. Safely store the order to disk
    const orders = getStoredOrders();
    orders.unshift(newOrder);
    saveStoredOrders(orders);

    // Record in deduplication window
    recentSubmissions.push({ key: dedupeKey, timestamp: now, order: newOrder });
    if (recentSubmissions.length > 100) recentSubmissions.shift();

    // 2. Dispatch real email notification to oluwasegunayoola91@gmail.com
    const emailResult = await sendOrderNotificationEmail(newOrder);

    res.json({
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
    });
  } catch (error: any) {
    console.error('Server error processing order:', error);
    res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing the order.',
    });
  }
});

// API: Retrieve orders (admin inspection)
app.get('/api/orders', (_req: Request, res: Response) => {
  const orders = getStoredOrders();
  res.json({ success: true, count: orders.length, orders });
});

// API: Email Delivery Diagnostics & Troubleshooting
app.get('/api/diagnostics', async (_req: Request, res: Response) => {
  const { getEmailDiagnostics } = await import('./src/server/orderService');
  res.json({ success: true, diagnostics: getEmailDiagnostics() });
});

// API: Send Test Order Email directly to oluwasegunayoola91@gmail.com
app.post('/api/test-email', async (_req: Request, res: Response) => {
  const { sendOrderNotificationEmail, getEmailDiagnostics, ADMIN_EMAIL } = await import(
    './src/server/orderService'
  );
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
  res.json({
    success: emailResult.sent,
    recipient: ADMIN_EMAIL,
    emailResult,
    diagnostics: getEmailDiagnostics(),
  });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KORA Global full-stack server running on http://0.0.0.0:${PORT}`);
    console.log(`Admin order notifications configured for: ${ADMIN_EMAIL}`);
  });
}

startServer();
