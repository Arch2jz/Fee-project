import { useState, useEffect } from 'react';
import { loadDailyGoals, saveDailyGoals, loadStreakData, updateStreakOnCompletion } from '../utils';

export default function DailyGoals() {
  const todayKey = new Date().toISOString().split('T')[0];
  const [goals, setGoals] = useState(() => loadDailyGoals(todayKey));
  const [newGoalText, setNewGoalText] = useState('');
  const [streakInfo, setStreakInfo] = useState(() => {
    const saved = loadStreakData();
    // Validate if the streak died because more than 1 day lapsed
    if (saved.lastCompletedDate) {
      const last = new Date(saved.lastCompletedDate + 'T00:00:00');
      const now = new Date(todayKey + 'T00:00:00');
      const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));
      if (diffDays > 1) {
        return { currentStreak: 0, lastCompletedDate: saved.lastCompletedDate };
      }
    }
    return saved;
  });

  useEffect(() => {
    saveDailyGoals(todayKey, goals);

    // If there is at least one goal and all are marked complete
    if (goals.length > 0 && goals.every((g) => g.completed)) {
      const updated = updateStreakOnCompletion(todayKey);
      setStreakInfo(updated);
    }
  }, [goals, todayKey]);

  const toggleGoal = (id) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    const trimmed = newGoalText.trim();
    if (!trimmed) return;

    const newGoal = {
      id: crypto.randomUUID(),
      text: trimmed,
      targetType: 'custom',
      completed: false,
    };

    setGoals((prev) => [...prev, newGoal]);
    setNewGoalText('');
  };

  const handleDeleteGoal = (id, e) => {
    e.stopPropagation();
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const completedCount = goals.filter((g) => g.completed).length;
  const progressPercent = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;
  const allDone = goals.length > 0 && completedCount === goals.length;

  return (
    <div className="glass-panel daily-goals-container">
      <div className="goals-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h3>Daily Mission & Goals</h3>
            {streakInfo.currentStreak > 0 && (
              <span className="streak-badge">
                🔥 {streakInfo.currentStreak} Day{streakInfo.currentStreak > 1 ? 's' : ''} Streak
              </span>
            )}
          </div>
          <p className="goals-subtitle">
            {allDone
              ? 'All daily objectives completed! Streak extended.'
              : 'Complete all goals today to maintain your streak!'}
          </p>
        </div>
        <div className="goals-score">
          <span>{completedCount}/{goals.length} Done</span>
          <span className="goals-percent">{progressPercent}%</span>
        </div>
      </div>

      <div className="goals-progress-bar">
        <div className="goals-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Add Custom Goal Form */}
      <form onSubmit={handleAddGoal} className="add-goal-form">
        <input
          type="text"
          placeholder="Add a custom daily goal (e.g. 10k steps, 8h sleep)..."
          value={newGoalText}
          onChange={(e) => setNewGoalText(e.target.value)}
          className="goal-input"
        />
        <button type="submit" className="add-goal-btn">
          + Add
        </button>
      </form>

      {/* Goals List */}
      <div className="goals-list">
        {goals.length === 0 ? (
          <p style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>
            No goals set for today. Add one above!
          </p>
        ) : (
          goals.map((goal) => (
            <div
              key={goal.id}
              className={`goal-item ${goal.completed ? 'goal-done' : ''}`}
              onClick={() => toggleGoal(goal.id)}
            >
              <div className="goal-status-indicator">
                {goal.completed ? '✓' : ''}
              </div>
              <span className="goal-text">{goal.text}</span>
              <div className="goal-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className={`goal-action-btn ${goal.completed ? 'btn-achieved' : ''}`}
                  onClick={() => toggleGoal(goal.id)}
                >
                  {goal.completed ? 'Achieved 🎯' : 'Mark Achieved'}
                </button>
                <button
                  type="button"
                  className="delete-goal-btn"
                  title="Remove goal"
                  onClick={(e) => handleDeleteGoal(goal.id, e)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}