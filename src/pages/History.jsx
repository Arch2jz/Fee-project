import WorkoutCard from '../components/WorkoutCard';

export default function History({ workouts, onDelete }) {
  return (
    <div className="page-container">
      <h2>Workout History</h2>
      {workouts.length === 0 ? (
        <p className="empty-state">No workouts logged yet. Start crushing sets!</p>
      ) : (
        <div className="workout-list">
          {workouts.map((w) => (
            <WorkoutCard
              key={w.id}
              workout={w}
              allWorkouts={workouts}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}