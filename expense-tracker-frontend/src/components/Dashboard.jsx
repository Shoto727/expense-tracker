import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = ({ expenses }) => {
  const [categoryData, setCategoryData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);

  useEffect(() => {
    if (!expenses || !expenses.length) return;

    // Category Totals (Pie Chart)
    const categoryTotals = {};
    expenses.forEach(exp => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });

    setCategoryData({
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          label: "Expenses by Category",
          data: Object.values(categoryTotals),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#5cb85c", "#9370DB", "#f39c12"],
        },
      ],
    });

    // Monthly Totals (Bar Chart)
    const monthlyTotals = {};
    expenses.forEach(exp => {
      const month = new Date(exp.date).toLocaleString("default", { month: "short", year: "numeric" });
      monthlyTotals[month] = (monthlyTotals[month] || 0) + exp.amount;
    });

    setMonthlyData({
      labels: Object.keys(monthlyTotals),
      datasets: [
        {
          label: "Monthly Expenses",
          data: Object.values(monthlyTotals),
          backgroundColor: "#36A2EB",
        },
      ],
    });
  }, [expenses]);

  return (
    <div>
      <h3>Expense Overview</h3>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ width: "300px" }}>
          {categoryData && <Pie data={categoryData} />}
        </div>
        <div style={{ width: "500px" }}>
          {monthlyData && <Bar data={monthlyData} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
