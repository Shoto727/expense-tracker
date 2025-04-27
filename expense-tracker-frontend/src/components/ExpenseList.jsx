import React from "react";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  return (
    <div>
      <h3>All Expenses</h3>
      <ul>
        {expenses.map((exp) => (
          <li key={exp._id}>
            {exp.date} - {exp.category} - Rs.{exp.amount}
            <button onClick={() => onEdit(exp)}>Edit</button>
            <button onClick={() => onDelete(exp._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
