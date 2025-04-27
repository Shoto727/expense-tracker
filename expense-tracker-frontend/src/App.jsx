import React, { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Dashboard from "./components/Dashboard";
import "./App.css";


import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "./services/api";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const loadExpenses = async () => {
    try {
      const res = await getExpenses();
      setExpenses(res.data);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleSubmit = async (expense) => {
    try {
      if (expense._id) {
        await updateExpense(expense._id, expense);
      } else {
        await addExpense(expense);
      }
      setSelectedExpense(null);
      loadExpenses();
    } catch (err) {
      console.error("Failed to save expense:", err);
    }
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      loadExpenses();
    } catch (err) {
      console.error("Error", err);
    }
  };

  return (
    <div className="container">
      <h2>Expense Tracker</h2>
      <ExpenseForm onSubmit={handleSubmit} selectedExpense={selectedExpense} />
      <ExpenseList expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />
      <Dashboard expenses={expenses} />
    </div>
  );
};

export default App;
