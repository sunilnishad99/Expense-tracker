import React from "react";
import { useExpenses } from "../context/ExpenseContext";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import {
  formatCurrency,
  getExpensesByCategory,
  getTotalExpenses,
} from "../utils/expenses";

const ExpenseSummary = () => {
  const { expenses } = useExpenses();

  const totalExpenses = getTotalExpenses(expenses);
  const categoriesData = getExpensesByCategory(expenses);

  let highestCategory = {
    name: "none",
    amount: 0,
  };

  Object.entries(categoriesData).forEach(([category, amount]) => {
    if (amount > highestCategory.amount) {
      highestCategory = { name: category, amount: amount };
    }
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Total Expenses Card */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="bg-expense-light p-2 sm:p-3 rounded-full flex-shrink-0">
            <Wallet size={20} className="text-expense sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500">
              Total Expenses
            </h3>
            <p className="text-lg sm:text-2xl font-bold text-expense-dark truncate">
              {formatCurrency(totalExpenses)}
            </p>
          </div>
        </div>
      </div>

      {/* Highest Category Card */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="bg-red-100 p-2 sm:p-3 rounded-full flex-shrink-0">
            <TrendingUp size={20} className="text-red-500 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500">
              Highest Category
            </h3>
            <div className="text-lg sm:text-2xl font-bold text-expense-dark">
              {highestCategory.name !== "none" ? (
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                  <span className="capitalize truncate">
                    {highestCategory.name}
                  </span>
                  <span className="text-xs sm:text-sm font-normal text-gray-500 truncate">
                    ({formatCurrency(highestCategory.amount)})
                  </span>
                </div>
              ) : (
                "None"
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Total Entries Card */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="bg-green-100 p-2 sm:p-3 rounded-full flex-shrink-0">
            <TrendingDown size={20} className="text-green-500 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500">
              Total Entries
            </h3>
            <p className="text-lg sm:text-2xl font-bold text-expense-dark">
              {expenses.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;