import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../utils/expenses";

const ExpenseBarChart = ({ data }) => {
  const chartData = Object.entries(data)
    .map(([name, value]) => ({
      name,
      amount: value,
    }))
    .reverse();

  if (chartData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No expense data to display
      </div>
    );
  }

  const CustomToolTip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 sm:p-4 rounded-md shadow-md border border-gray-100">
          <p className="font-medium text-sm sm:text-base">{label}</p>
          <p className="text-base sm:text-lg">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[250px] sm:h-[300px] md:h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 10,
            left: 0,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={60}
            tick={{ fontSize: 10 }}
            className="sm:text-xs md:text-sm"
          />
          <YAxis
            tickFormatter={(value) => `₹${value}`}
            tick={{
              fontSize: 10,
            }}
            className="sm:text-xs md:text-sm"
            width={60}
          />
          <Tooltip content={<CustomToolTip />} />
          <Bar
            dataKey="amount"
            fill="#9b87f5"
            radius={[4, 4, 0, 0]}
            animationDuration={750}
            animationBegin={0}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseBarChart;