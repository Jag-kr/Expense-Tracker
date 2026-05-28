import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label } from 'recharts';

const COLORS = {
  food: '#a855f7',
  entertainment: '#f97316',
  travel: '#eab308',
};

const CATEGORY_LABELS = {
  food: 'Food',
  entertainment: 'Entertainment',
  travel: 'Travel',
};

export default function ExpensePieChart({ categoryTotals }) {
  const total = Object.values(categoryTotals).reduce((s, v) => s + v, 0);

  const data = Object.entries(categoryTotals)
    .filter(([, v]) => v > 0)
    .map(([key, value]) => ({
      name: CATEGORY_LABELS[key],
      value,
      color: COLORS[key],
      percent: total > 0 ? Math.round((value / total) * 100) : 0,
    }));

  const emptyData = [
    { name: 'Food', value: 1, color: '#a855f7' },
    { name: 'Entertainment', value: 1, color: '#f97316' },
    { name: 'Travel', value: 1, color: '#eab308' },
  ];

  const chartData = data.length > 0 ? data : emptyData;
  const isEmpty = data.length === 0;

  return (
    <div className="chart-area">
      <ResponsiveContainer width={200} height={160}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={75}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={isEmpty ? '#888' : entry.color} opacity={isEmpty ? 0.4 : 1} />
            ))}
            {!isEmpty && data.map((entry, index) => null)}
          </Pie>
          {!isEmpty && (
            <Tooltip
              formatter={(value, name) => [`₹${value.toLocaleString()}`, name]}
              contentStyle={{ borderRadius: '8px', fontSize: '0.85rem' }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-dot" style={{ background: COLORS.food }} />
          <span style={{ color: COLORS.food }}>Food</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: COLORS.entertainment }} />
          <span>Entertainment</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: COLORS.travel }} />
          <span>Travel</span>
        </div>
      </div>
    </div>
  );
}
