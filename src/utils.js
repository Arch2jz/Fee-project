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
// Calculate Muscle Recovery % based on hours elapsed since last session
// Dynamic Muscle Readiness & Fatigue Decay (48-hour physiological model)
export const calculateMuscleRecovery = (workouts = []) => {
  const muscles = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];
  const now = new Date();

  return muscles.map((muscle) => {
    // Find all sessions matching this muscle group
    const muscleWorkouts = workouts.filter((w) => w.targetMuscle === muscle);

    // If muscle was never trained, it is fully rested
    if (muscleWorkouts.length === 0) {
      return {
        muscle,
        readiness: 100,
        hoursElapsed: null,
        hoursRemaining: 0,
        status: 'Primed',
        recommendation: 'Fully recovered. Ideal candidate for high-intensity training.',
        lastSessionDate: null,
        color: '#10b981', // green
      };
    }

    // Sort to locate the most recent workout timestamp
    const latest = [...muscleWorkouts].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    const workoutTime = new Date(latest.date + 'T10:00:00'); // Normalize workout session time
    const diffMs = now - workoutTime;
    const hoursElapsed = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));

    // 48-Hour Biological Recovery Model
    const FULL_RECOVERY_HOURS = 48;
    const hoursRemaining = Math.max(0, FULL_RECOVERY_HOURS - hoursElapsed);
    const readiness = Math.min(100, Math.round((hoursElapsed / FULL_RECOVERY_HOURS) * 100));

    let status = 'Primed';
    let color = '#10b981'; // green
    let recommendation = 'Fully recovered. Prime target for progressive overload.';

    if (hoursElapsed < 24) {
      status = 'Fatigued';
      color = '#ef4444'; // red
      recommendation = 'In acute recovery phase. Rest or work antagonist muscle groups.';
    } else if (hoursElapsed < 48) {
      status = 'Rebuilding';
      color = '#f59e0b'; // amber
      recommendation = 'Protein synthesis active. Light pump or mobility work only.';
    }

    return {
      muscle,
      readiness,
      hoursElapsed,
      hoursRemaining,
      status,
      recommendation,
      lastSessionDate: latest.date,
      color,
    };
  });
};