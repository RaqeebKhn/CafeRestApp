const express = require('express');
const router = express.Router();
const Table = require('../models/Tables');

router.get('/', async (req, res) => {
  try {
    const tables = await Table.find().sort({ id: 1 });
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id, customers } = req.body;
    
   
    const existingTable = await Table.findOne({ id });
    if (existingTable) {
      return res.status(400).json({ message: `Table ${id} already exists` });
    }
    
    const newTable = new Table({
      id,
      customers: customers || 0
    });
    
    const savedTable = await newTable.save();
    res.status(201).json(savedTable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tableId = req.params.id;
    const deletedTable = await Table.findOneAndDelete({ id: tableId });
    
    if (!deletedTable) {
      return res.status(404).json({ message: `Table ${tableId} not found` });
    }
    
    res.status(200).json({ message: `Table ${tableId} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tableId = req.params.id;
    const { customers } = req.body;
    
    const updatedTable = await Table.findOneAndUpdate(
      { id: tableId },
      { customers },
      { new: true }
    );
    
    if (!updatedTable) {
      return res.status(404).json({ message: `Table ${tableId} not found` });
    }
    
    res.status(200).json(updatedTable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;