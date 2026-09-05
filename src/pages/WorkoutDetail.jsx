import { useParams, Link } from 'react-router-dom';
import { formatDate, calculateVolume } from '../utils';

export default function WorkoutDetail({ workouts }) {
  const { id } = useParams(); // Grabs the ID from the URL
  const workout = workouts.find((w) => w.id === id);

  if (!workout) {
    return <div className="page-container"><h2>Workout not found</h2><Link to="/history">Go back</Link></div>;
  }

  return (
    <div className="page-container">
      <Link to="/history" className="back-link">← Back to History</Link>
      <h2>{workout.exercise} Details</h2>
      <div className="detail-card">
        <p><strong>Category:</strong> {workout.category}</p>
        <p><strong>Date:</strong> {formatDate(workout.date)}</p>
        <p><strong>Sets:</strong> {workout.sets}</p>
        <p><strong>Reps:</strong> {workout.reps}</p>
        <p><strong>Weight:</strong> {workout.weight}</p>
        <p><strong>Total Volume:</strong> {calculateVolume(workout.sets, workout.reps, workout.weight)}</p>
      </div>
    </div>
  );
}