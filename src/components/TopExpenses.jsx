const CATEGORIES = [
  { key: 'food', label: 'Food', color: '#a855f7', fillClass: 'bar-fill-food' },
  { key: 'entertainment', label: 'Entertainment', color: '#f97316', fillClass: 'bar-fill-entertainment' },
  { key: 'travel', label: 'Travel', color: '#eab308', fillClass: 'bar-fill-travel' },
];

export default function TopExpenses({ categoryTotals }) {
  const maxVal = Math.max(...Object.values(categoryTotals), 1);

  return (
    <div className="top-expenses-card">
      <div className="bar-chart-container">
        {CATEGORIES.map(({ key, label, fillClass }) => {
          const value = categoryTotals[key] || 0;
          const pct = (value / maxVal) * 100;
          return (
            <div className="bar-row" key={key}>
              <div className="bar-label">{label}-</div>
              <div className="bar-track">
                <div
                  className={`bar-fill ${fillClass}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
