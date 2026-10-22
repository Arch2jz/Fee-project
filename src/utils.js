// Calculate total volume for sets * reps * weight
export const calculateVolume = (sets, reps, weight) => {
  return (Number(sets) || 0) * (Number(reps) || 0) * (Number(weight) || 0);
};

// Format date nicely (e.g. "Sep 5")
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
};

// Workouts persistence
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

// Daily Goals templates & persistence
export const DEFAULT_GOALS = [
  { id: 'g1', text: 'Hit at least 10 total sets', targetType: 'sets', targetValue: 10 },
  { id: 'g2', text: 'Reach 2,000 kg total volume', targetType: 'volume', targetValue: 2000 },
  { id: 'g3', text: 'Drink 3L of water', targetType: 'habit' },
  { id: 'g4', text: 'Hit post-workout protein goal', targetType: 'habit' },
];

export const loadDailyGoals = (dateKey) => {
  try {
    const saved = localStorage.getItem(`liftly_goals_${dateKey}`);
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return DEFAULT_GOALS.map((goal) => ({ ...goal, completed: false }));
};

export const saveDailyGoals = (dateKey, goals) => {
  localStorage.setItem(`liftly_goals_${dateKey}`, JSON.stringify(goals));
};

// Streak storage & evaluation logic
export const loadStreakData = () => {
  try {
    const saved = localStorage.getItem('liftly_streak');
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return { currentStreak: 0, lastCompletedDate: null };
};

export const updateStreakOnCompletion = (todayKey) => {
  const data = loadStreakData();

  if (data.lastCompletedDate === todayKey) {
    return data;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().split('T')[0];

  let newStreak = 1;
  if (data.lastCompletedDate === yesterdayKey) {
    newStreak = (data.currentStreak || 0) + 1;
  }

  const updatedData = {
    currentStreak: newStreak,
    lastCompletedDate: todayKey,
  };

  localStorage.setItem('liftly_streak', JSON.stringify(updatedData));
  return updatedData;
};