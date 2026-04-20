const express = require('express');
const router = express.Router();
const axios = require('axios');
const Order = require('../models/Order');

const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY || 'GTWADFxIpUfDoNikNGqq1C3023evM6UH';
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET || 'amFbAoUByPV2rM5A';
const BUSINESS_SHORT_CODE = process.env.MPESA_SHORT_CODE || '174379';
const PASSKEY = process.env.MPESA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL || 'https://baberia.co.ke/api/mpesa/callback';

// Get M-Pesa access token
async function getAccessToken() {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  const res = await axios.get(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return res.data.access_token;
}

// Format phone: 0712345678 or +254712345678 → 254712345678
function formatPhone(phone) {
  const cleaned = phone.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
  if (cleaned.startsWith('+254')) return cleaned.slice(1);
  if (cleaned.startsWith('0')) return '254' + cleaned.slice(1);
  if (cleaned.startsWith('254')) return cleaned;
  return '254' + cleaned;
}

// @route POST /api/mpesa/stkpush
router.post('/stkpush', async (req, res) => {
  try {
    const { phone, amount, orderId } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({ message: 'Phone and amount are required' });
    }

    const accessToken = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
    const password = Buffer.from(`${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`).toString('base64');
    const formattedPhone = formatPhone(phone);

    const payload = {
      BusinessShortCode: BUSINESS_SHORT_CODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.ceil(amount), // use 1 for sandbox testing
      PartyA: formattedPhone,
      PartyB: BUSINESS_SHORT_CODE,
      PhoneNumber: formattedPhone,
      CallBackURL: CALLBACK_URL,
      AccountReference: `Baberia-${orderId || 'ORDER'}`,
      TransactionDesc: 'Baberia Fashion Payment',
    };

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      payload,
      { headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' } }
    );

    res.json({
      message: 'STK Push sent. Check your phone to complete payment.',
      checkoutRequestId: response.data.CheckoutRequestID,
      merchantRequestId: response.data.MerchantRequestID,
    });
  } catch (error) {
    console.error('M-Pesa STK error:', error.response?.data || error.message);
    res.status(500).json({ message: 'M-Pesa request failed. Please try again.', error: error.response?.data });
  }
});

// @route POST /api/mpesa/callback
// Safaricom calls this after payment
router.post('/callback', async (req, res) => {
  try {
    const { Body } = req.body;
    const result = Body?.stkCallback;

    if (result?.ResultCode === 0) {
      // Payment successful
      const metadata = result.CallbackMetadata?.Item || [];
      const amount = metadata.find(i => i.Name === 'Amount')?.Value;
      const mpesaCode = metadata.find(i => i.Name === 'MpesaReceiptNumber')?.Value;
      const phone = metadata.find(i => i.Name === 'PhoneNumber')?.Value;

      console.log(`✅ M-Pesa payment confirmed: ${mpesaCode} | KSh ${amount} | ${phone}`);

      // Update order payment status if orderId is in AccountReference
      const ref = result.CallbackMetadata?.Item?.find(i => i.Name === 'AccountReference')?.Value;
      if (ref) {
        const orderId = ref.replace('Baberia-', '');
        await Order.findByIdAndUpdate(orderId, { paymentStatus: 'paid' }).catch(() => {});
      }
    } else {
      console.log('❌ M-Pesa payment failed:', result?.ResultDesc);
    }

    res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  } catch (error) {
    console.error('M-Pesa callback error:', error);
    res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  }
});

// @route POST /api/mpesa/query — check STK push status
router.post('/query', async (req, res) => {
  try {
    const { checkoutRequestId } = req.body;
    const accessToken = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
    const password = Buffer.from(`${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`).toString('base64');

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
      { BusinessShortCode: BUSINESS_SHORT_CODE, Password: password, Timestamp: timestamp, CheckoutRequestID: checkoutRequestId },
      { headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' } }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Query failed', error: error.response?.data });
  }
});

module.exports = router;
