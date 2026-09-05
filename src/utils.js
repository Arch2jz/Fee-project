export const calculateVolume = (sets, reps, weight) => {
  return (Number(sets) || 0) * (Number(reps) || 0) * (Number(weight) || 0);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
};

export const loadWorkouts = () => {
  try {
    const saved = localStorage.getItem('fitness_workouts');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const saveWorkouts = (workouts) => {
  localStorage.setItem('fitness_workouts', JSON.stringify(workouts));
}; 