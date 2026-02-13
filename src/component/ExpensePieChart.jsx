import {
  PieChart,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  Pie,
} from "recharts";
import React, { useMemo } from "react";

const CATEGORY_COLORS = {
  food: "#6366F1",
  transport: "#06B6D4",
  entertainment: "#AB55F7",
  utilities: "#14B8A6",
  health: "#22C55E",
  shopping: "#F97316",
  other: "#64748B",
};

const ExpensePieChart = ({ data }) => {
  // Memoize the chart data to prevent unnecessary re-renders
  const chartData = useMemo(() => {
    let processedData = [];
    
    if (Array.isArray(data)) {
      processedData = data.map(item => ({
        name: typeof item.name === 'string' 
          ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
          : item.name,
        value: item.value,
        originalName: typeof item.name === 'string' ? item.name.toLowerCase() : item.name,
      }));
    } else if (typeof data === 'object' && data !== null) {
      processedData = Object.entries(data).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: value,
        originalName: name.toLowerCase(),
      }));
    }

    // Filter out categories with zero or null values
    return processedData.filter(item => item.value && item.value > 0);
  }, [data]);

  if (chartData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No expense data to display
      </div>
    );
  }

  const getColor = (originalName) => {
    return CATEGORY_COLORS[originalName.toLowerCase()] || "#8E9196";
  };

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const total = chartData.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((data.value / total) * 100).toFixed(1);

      return (
        <div className="bg-white p-3 sm:p-4 rounded-md shadow-md border border-gray-100">
          <p className="font-medium text-sm sm:text-base">{data.name}</p>
          <p className="text-base sm:text-lg">
            ₹{data.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="text-xs sm:text-sm text-gray-500 ml-1">({percentage}%)</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full" style={{ minHeight: '350px' }}>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            labelLine={false}
            outerRadius={window.innerWidth < 640 ? 70 : 100}
            dataKey="value"
            animationDuration={750}
            animationBegin={0}
            animationEasing="ease-out"
            paddingAngle={2}
            isAnimationActive={true}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${entry.originalName}-${index}`}
                fill={getColor(entry.originalName)}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomToolTip />} />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
            formatter={(value) => <span className="text-xs sm:text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensePieChart;