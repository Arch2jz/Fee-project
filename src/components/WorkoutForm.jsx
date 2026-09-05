import { useState } from 'react';

export default function WorkoutForm({ onAddWorkout }) {
  const [formData, setFormData] = useState({
    exercise: '',
    category: 'Strength',
    sets: '',
    reps: '',
    weight: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.exercise.trim() || !formData.sets || !formData.reps) return;

    onAddWorkout({
      id: crypto.randomUUID(),
      ...formData,
      sets: Number(formData.sets),
      reps: Number(formData.reps),
      weight: Number(formData.weight) || 0,
    });

    setFormData({
      exercise: '',
      category: 'Strength',
      sets: '',
      reps: '',
      weight: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="input-group full-width">
          <label>Exercise Name</label>
          <input type="text" name="exercise" placeholder="e.g. Squat" value={formData.exercise} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Strength">Strength</option>
            <option value="Hypertrophy">Hypertrophy</option>
            <option value="Endurance">Endurance</option>
            <option value="Cardio">Cardio</option>
          </select>
        </div>

        <div className="input-group">
          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Sets</label>
          <input type="number" name="sets" min="1" placeholder="3" value={formData.sets} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Reps</label>
          <input type="number" name="reps" min="1" placeholder="10" value={formData.reps} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Weight (lbs/kg)</label>
          <input type="number" name="weight" min="0" step="0.5" placeholder="135" value={formData.weight} onChange={handleChange} />
        </div>
      </div>

      <button type="submit" className="submit-btn">Save Workout</button>
    </form>
  );
}