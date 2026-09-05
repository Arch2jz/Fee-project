import { Link } from 'react-router-dom';
import { calculateVolume, formatDate } from '../utils';

export default function WorkoutCard({ workout, onDelete }) {
  const volume = calculateVolume(workout.sets, workout.reps, workout.weight);

  return (
    <div className="workout-card">
      <div className="card-top">
        <div>
          {/* Link to dynamic route */}
          <h4><Link to={`/workout/${workout.id}`}>{workout.exercise}</Link></h4>
          <span className="category-pill">{workout.category}</span>
        </div>
        <button className="delete-btn" onClick={() => onDelete(workout.id)}>✕</button>
      </div>
      {/* ... keep the rest of the metrics from the previous card code ... */}
      <div className="card-footer">
        <span>{formatDate(workout.date)}</span>
      </div>
    </div>
  );
}