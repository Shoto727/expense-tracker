const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Get all expenses
router.get("/", async (req, res) => {
  const expenses = await Expense.find().sort({ date: -1 });
  res.json(expenses);
});

// Add expense
router.post("/", async (req, res) => {
  const newExpense = new Expense(req.body);
  await newExpense.save();
  res.status(201).json(newExpense);
});

// Update expense
router.put("/:id", async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete expense
router.delete("/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
