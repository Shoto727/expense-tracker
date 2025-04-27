import React, { useState, useEffect } from "react";

const ExpenseForm = ({ onSubmit, selectedExpense }) => {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (selectedExpense) setForm(selectedExpense);
  }, [selectedExpense]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ amount: "", category: "", description: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <button type="submit">{selectedExpense ? "Update" : "Add"} Expense</button>
    </form>
  );
};

export default ExpenseForm;
