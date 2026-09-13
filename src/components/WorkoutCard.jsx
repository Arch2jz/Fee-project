import { Link } from 'react-router-dom';
import { calculateVolume, formatDate } from '../utils';

export default function WorkoutCard({ workout, allWorkouts = [], onDelete }) {
  const volume = calculateVolume(workout.sets, workout.reps, workout.weight);

  // Check if this specific workout is the heaviest recorded for this movement
  const maxLiftForExercise = Math.max(
    ...allWorkouts
      .filter((w) => w.exercise.toLowerCase() === workout.exercise.toLowerCase())
      .map((w) => Number(w.weight) || 0),
    0
  );
  const isPR = workout.weight > 0 && workout.weight === maxLiftForExercise;

  return (
    <div className={`workout-card glass-panel ${isPR ? 'pr-highlight' : ''}`}>
      <div className="card-top">
        <div>
          <div className="title-pr-row">
            <h4><Link to={`/workout/${workout.id}`}>{workout.exercise}</Link></h4>
            {isPR && <span className="pr-tag">🏆 PR</span>}
          </div>
          <div className="tag-group">
            <span className="category-pill">{workout.category}</span>
            {workout.targetMuscle && (
              <span className="muscle-pill">{workout.targetMuscle}</span>
            )}
          </div>
        </div>
        <button className="delete-btn" onClick={() => onDelete(workout.id)}>✕</button>
      </div>

      <div className="card-metrics">
        <div>
          <span className="metric-label">Sets × Reps</span>
          <span className="metric-val">{workout.sets} × {workout.reps}</span>
        </div>
        <div>
          <span className="metric-label">Weight</span>
          <span className="metric-val">{workout.weight} kg</span>
        </div>
        <div>
          <span className="metric-label">Volume</span>
          <span className="metric-val">{volume.toLocaleString()}</span>
        </div>
      </div>

      <div className="card-footer">
        <span>{formatDate(workout.date)}</span>
      </div>
    </div>
  );
}