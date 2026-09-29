import nodemailer from 'nodemailer';

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'oluwasegunayoola91@gmail.com';

export const PRODUCT_PRICES: Record<string, number> = {
  '6 × 6': 28000,
  '6 × 7': 28000,
  '6 × 4': 25000,
};

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export function validateOrderInput(body: any): { valid: boolean; error?: string; cleanData?: any } {
  const { fullName, phone, email, address, state, lga, size, quantity } = body || {};

  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    return { valid: false, error: 'Full name is required.' };
  }
  if (!phone || typeof phone !== 'string' || phone.trim().length < 9) {
    return { valid: false, error: 'Valid phone number is required for dispatch.' };
  }
  if (!address || typeof address !== 'string' || !address.trim()) {
    return { valid: false, error: 'Detailed delivery address is required.' };
  }
  if (!state || typeof state !== 'string' || !state.trim()) {
    return { valid: false, error: 'Delivery state is required.' };
  }
  if (!lga || typeof lga !== 'string' || !lga.trim()) {
    return { valid: false, error: 'Local Government Area (LGA) is required.' };
  }

  const cleanSize = (size || '').trim();
  if (!PRODUCT_PRICES[cleanSize]) {
    return {
      valid: false,
      error: `Invalid size selected "${cleanSize}". Available sizes are 6 × 6, 6 × 7, and 6 × 4.`,
    };
  }

  const orderQty = Math.max(1, Math.min(20, parseInt(quantity, 10) || 1));
  const unitPrice = PRODUCT_PRICES[cleanSize];
  const total = unitPrice * orderQty;

  const dateObj = new Date();
  const formattedDate = dateObj.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = dateObj.toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  const orderId = `KORA-${Math.floor(100000 + Math.random() * 900000)}`;

  return {
    valid: true,
    cleanData: {
      orderId,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: (email || '').trim(),
      address: address.trim(),
      state: state.trim(),
      lga: lga.trim(),
      product: 'KORA Foldable Mosquito Net',
      size: cleanSize,
      quantity: orderQty,
      unitPrice,
      total,
      date: formattedDate,
      time: formattedTime,
      createdAt: dateObj.toISOString(),
      status: 'pending_dispatch',
    },
  };
}

export async function sendOrderNotificationEmail(
  order: any
): Promise<{ sent: boolean; method: string; details?: string }> {
  const subject = `NEW KORA GLOBAL ORDER — ${order.fullName.toUpperCase()} — ${order.size}`;

  const plainText = `KORA GLOBAL — NEW ORDER

Customer Information:
- Full Name: ${order.fullName}
- Phone Number: ${order.phone}
- Email Address: ${order.email || 'Not provided'}
- Delivery Address: ${order.address}
- State: ${order.state}
- Local Government: ${order.lga}

Order Information:
- Product: Foldable Mosquito Net
- Selected Size: ${order.size}
- Quantity: ${order.quantity}
- Unit Price: ${formatNaira(order.unitPrice)}
- Total Order Amount: ${formatNaira(order.total)}

Additional Information:
- Order Date: ${order.date}
- Order Time: ${order.time}
- Order ID: ${order.orderId}
`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAFAF7; color: #17202A; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #102A43; color: #ffffff; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; letter-spacing: 0.5px; text-transform: uppercase; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #1687C9; font-weight: bold; }
    .content { padding: 24px; }
    .section-title { font-size: 13px; font-weight: 800; color: #1687C9; text-transform: uppercase; letter-spacing: 1px; margin-top: 20px; margin-bottom: 8px; border-bottom: 2px solid #EAF6FC; padding-bottom: 4px; }
    .section-title:first-child { margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
    td { padding: 8px 0; font-size: 14px; vertical-align: top; }
    td.label { color: #64748B; width: 38%; font-weight: 600; }
    td.value { color: #102A43; font-weight: 700; }
    .total-box { background: #EAF6FC; border: 1px solid #BAE3F8; border-radius: 12px; padding: 14px 18px; margin-top: 16px; display: flex; justify-content: space-between; align-items: baseline; }
    .total-label { font-size: 14px; font-weight: 800; color: #102A43; text-transform: uppercase; }
    .total-amount { font-size: 22px; font-weight: 900; color: #1687C9; }
    .footer { background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748B; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>KORA GLOBAL — NEW ORDER</h1>
      <p>Order ID: ${order.orderId}</p>
    </div>
    <div class="content">
      <div class="section-title">Customer Information</div>
      <table>
        <tr><td class="label">Full Name:</td><td class="value">${order.fullName}</td></tr>
        <tr><td class="label">Phone Number:</td><td class="value"><a href="tel:${order.phone}" style="color:#1687C9; text-decoration:none;">${order.phone}</a></td></tr>
        <tr><td class="label">Email Address:</td><td class="value">${order.email || 'Not provided'}</td></tr>
        <tr><td class="label">Delivery Address:</td><td class="value">${order.address}</td></tr>
        <tr><td class="label">State:</td><td class="value">${order.state}</td></tr>
        <tr><td class="label">Local Government:</td><td class="value">${order.lga}</td></tr>
      </table>

      <div class="section-title">Order Information</div>
      <table>
        <tr><td class="label">Product:</td><td class="value">KORA Foldable Mosquito Net</td></tr>
        <tr><td class="label">Selected Size:</td><td class="value" style="color:#1687C9;">${order.size}</td></tr>
        <tr><td class="label">Quantity:</td><td class="value">${order.quantity}</td></tr>
        <tr><td class="label">Unit Price:</td><td class="value">${formatNaira(order.unitPrice)}</td></tr>
      </table>

      <div class="total-box">
        <span class="total-label">Total Order Amount:</span>
        <span class="total-amount">${formatNaira(order.total)}</span>
      </div>

      <div class="section-title">Additional Information</div>
      <table>
        <tr><td class="label">Order Date:</td><td class="value">${order.date}</td></tr>
        <tr><td class="label">Order Time:</td><td class="value">${order.time}</td></tr>
        <tr><td class="label">Order ID:</td><td class="value" style="font-family:monospace;">${order.orderId}</td></tr>
      </table>
    </div>
    <div class="footer">
      Please contact the customer promptly to confirm delivery dispatch.<br/>
      KORA Global Notification System
    </div>
  </div>
</body>
</html>
`;

  // Method 1: Resend API (recommended for Netlify & serverless)
  const resendApiKey = process.env.RESEND_API_KEY || process.env.API_KEY;
  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'KORA Global Orders <onboarding@resend.dev>',
          to: [ADMIN_EMAIL],
          subject: subject,
          text: plainText,
          html: htmlContent,
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        console.log('Order notification email successfully dispatched via Resend:', resData);
        return { sent: true, method: 'Resend', details: JSON.stringify(resData) };
      } else {
        const errText = await response.text();
        console.error('Resend API returned error:', errText);
      }
    } catch (err: any) {
      console.error('Error sending email via Resend API:', err.message);
    }
  }

  // Method 2: Standard SMTP / Nodemailer
  if (process.env.SMTP_HOST || process.env.SMTP_USER || process.env.GMAIL_USER) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || (process.env.GMAIL_USER ? 'smtp.gmail.com' : undefined),
        port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
        secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER || process.env.GMAIL_USER,
          pass: process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from:
          process.env.EMAIL_FROM ||
          `"KORA Global Orders" <${process.env.SMTP_USER || process.env.GMAIL_USER || 'no-reply@koraglobal.com'}>`,
        to: ADMIN_EMAIL,
        subject: subject,
        text: plainText,
        html: htmlContent,
      });

      console.log('Order notification email sent via SMTP:', info.messageId);
      return { sent: true, method: 'SMTP', details: info.messageId };
    } catch (err: any) {
      console.error('Error sending email via SMTP:', err.message);
    }
  }

  // Fallback logging for audit trail
  console.log('----------------------------------------------------');
  console.log(`[ORDER NOTIFICATION EMAIL FOR ${ADMIN_EMAIL}]`);
  console.log(`SUBJECT: ${subject}`);
  console.log(plainText);
  console.log('----------------------------------------------------');

  return {
    sent: false,
    method: 'LocalLog',
    details: 'Order logged and stored. Configure RESEND_API_KEY or SMTP credentials to deliver real-time SMTP emails.',
  };
}
