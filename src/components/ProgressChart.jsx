import { calculateVolume, formatDate } from '../utils';

export default function ProgressChart({ workouts }) {
  if (workouts.length === 0) return <p style={{color: '#8b949e'}}>Log some workouts to see your chart!</p>;

  // Aggregate total volume per day
  const dailyVolume = workouts.reduce((acc, curr) => {
    const vol = calculateVolume(curr.sets, curr.reps, curr.weight);
    acc[curr.date] = (acc[curr.date] || 0) + vol;
    return acc;
  }, {});

  const sortedDates = Object.keys(dailyVolume).sort().slice(-7); // Last 7 logged days
  const maxVolume = Math.max(...sortedDates.map((d) => dailyVolume[d]), 1);

  return (
    <div className="chart-container">
      <h3>Recent Volume Trends</h3>
      <div className="chart-bars">
        {sortedDates.map((date) => {
          const heightPercent = (dailyVolume[date] / maxVolume) * 100;
          return (
            <div key={date} className="bar-wrapper">
              <span className="bar-tooltip">{dailyVolume[date].toLocaleString()}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ height: `${Math.max(heightPercent, 8)}%` }}
                />
              </div>
              <span className="bar-label">{formatDate(date)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}