import WorkoutForm from '../components/WorkoutForm';
import { useNavigate } from 'react-router-dom';

export default function LogWorkout({ onAdd }) {
  const navigate = useNavigate();

  const handleSubmission = (workout) => {
    onAdd(workout);
    navigate('/history'); // Redirect to history after logging
  };

  return (
    <div className="page-container">
      <h2>Log New Workout</h2>
      <WorkoutForm onAddWorkout={handleSubmission} />
    </div>
  );
}