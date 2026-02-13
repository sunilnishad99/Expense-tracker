import React from "react";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseChart from "./ExpenseChart";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Expense summery */}

      <ExpenseSummary />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Expense Chart */}
          <ExpenseChart />
        </div>
        <div>{/* Expense Form */}
            <ExpenseForm />
        </div>
      </div>

      {/* Expense List */}
      <ExpenseList />
    </div>
  );
};

export default Dashboard;
