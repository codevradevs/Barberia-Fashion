const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
  try {
    const { customerName, phone, email, location, address, items, paymentMethod, notes, subtotal, deliveryFee, totalAmount } = req.body;

    // Items come pre-validated from the frontend (products.ts static data)
    // We trust the cart data directly since products are not yet in MongoDB
    const orderItems = items.map(item => ({
      productId: item.productId,
      name: item.name || item.productId,
      price: item.price || 0,
      size: item.size,
      quantity: item.quantity,
      image: item.image || '',
    }));

    const calcSubtotal = subtotal || orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const calcDelivery = deliveryFee !== undefined ? deliveryFee : (calcSubtotal > 5000 ? 0 : 300);
    const calcTotal = totalAmount || calcSubtotal + calcDelivery;

    const order = new Order({
      customerName,
      phone,
      email,
      location,
      address,
      items: orderItems,
      subtotal: calcSubtotal,
      deliveryFee: calcDelivery,
      totalAmount: calcTotal,
      paymentMethod,
      notes,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const skip = (Number(page) - 1) * Number(limit);
    const orders = await Order.find(filter).sort('-createdAt').skip(skip).limit(Number(limit));
    const total = await Order.countDocuments(filter);
    res.json({ orders, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id/status', auth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
