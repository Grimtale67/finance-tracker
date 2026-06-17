const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const authMiddleware = require('../middleware/authMiddleware')

// Protect all routes below
router.use(authMiddleware)

// Get all records for logged in user
router.get('/', async (req, res) => {
  try {
    const records = await Record.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json(records)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// Add new record
router.post('/', async (req, res) => {
  try {
    const { description, amount, category } = req.body
    const record = new Record({
      description,
      amount: Number(amount),
      category,
      userId: req.userId
    })
    await record.save()
    res.status(201).json(record)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// Delete a record
router.delete('/:id', async (req, res) => {
  try {
    const record = await Record.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    })
    if (!record) {
      return res.status(404).json({ message: 'Record not found' })
    }
    res.json({ message: 'Record deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

module.exports = router