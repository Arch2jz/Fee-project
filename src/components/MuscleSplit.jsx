export default function MuscleSplit({ workouts }) {
  const muscleCounts = workouts.reduce((acc, w) => {
    const muscle = w.targetMuscle || 'Other';
    acc[muscle] = (acc[muscle] || 0) + (Number(w.sets) || 0);
    return acc;
  }, {});

  const totalSets = Object.values(muscleCounts).reduce((a, b) => a + b, 0) || 1;
  const muscles = Object.entries(muscleCounts).sort((a, b) => b[1] - a[1]);

  if (muscles.length === 0) return null;

  return (
    <div className="glass-panel muscle-split-container">
      <h3>Target Muscle Distribution</h3>
      <div className="split-list">
        {muscles.map(([muscle, sets]) => {
          const percent = Math.round((sets / totalSets) * 100);
          return (
            <div key={muscle} className="muscle-row">
              <div className="muscle-info">
                <span>{muscle}</span>
                <span className="set-count">{sets} sets ({percent}%)</span>
              </div>
              <div className="split-track">
                <div className="split-fill" style={{ width: `${percent}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}