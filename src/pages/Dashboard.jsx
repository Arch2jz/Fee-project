import StatsCard from '../components/StatsCard';
import ProgressChart from '../components/ProgressChart';
import MuscleSplit from '../components/MuscleSplit';
import { calculateVolume } from '../utils';

export default function Dashboard({ workouts }) {
  const totalVolume = workouts.reduce((acc, w) => acc + calculateVolume(w.sets, w.reps, w.weight), 0);
  const totalSets = workouts.reduce((acc, w) => acc + (w.sets || 0), 0);

  return (
    <div className="page-container dashboard-view">
      <div className="dashboard-header">
        <h2>Performance Overview</h2>
        <span className="live-pulse">System Live</span>
      </div>

      <section className="stats-row">
        <StatsCard label="Total Workload" value={totalVolume.toLocaleString()} unit="kg" />
        <StatsCard label="Total Sets" value={totalSets} />
        <StatsCard label="Sessions Logged" value={workouts.length} />
      </section>

      <section className="analytics-grid">
        <ProgressChart workouts={workouts} />
        <MuscleSplit workouts={workouts} />
      </section>
    </div>
  );
}