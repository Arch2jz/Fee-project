import StatsCard from '../components/StatsCard';
import ProgressChart from '../components/ProgressChart';
import { calculateVolume } from '../utils';

export default function Dashboard({ workouts }) {
  const totalVolume = workouts.reduce((acc, w) => acc + calculateVolume(w.sets, w.reps, w.weight), 0);
  const totalSets = workouts.reduce((acc, w) => acc + (w.sets || 0), 0);

  return (
    <div className="page-container">
      <h2>Dashboard</h2>
      <section className="stats-row">
        <StatsCard label="Total Volume" value={totalVolume.toLocaleString()} unit="pts" />
        <StatsCard label="Total Sets" value={totalSets} />
        <StatsCard label="Total Workouts" value={workouts.length} />
      </section>
      <section className="analytics-section" style={{ marginTop: '2rem' }}>
        <ProgressChart workouts={workouts} />
      </section>
    </div>
  );
}