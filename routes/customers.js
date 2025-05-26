const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Get all customers
router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

// Update delivery status
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  await Customer.findByIdAndUpdate(req.params.id, { status });
  res.json({ message: 'Status updated' });
});

module.exports = router;

// Add new customer
router.post('/', async (req, res) => {
  const { name, phone, status } = req.body;
  const newCustomer = new Customer({ name, phone, status });
  await newCustomer.save();
  res.json({ message: 'Customer added successfully' });
});
// DELETE a customer by ID
router.delete('/:id', async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Customer deleted' });
});

