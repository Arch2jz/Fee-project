import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LogWorkout from './pages/LogWorkout';
import History from './pages/History';
import WorkoutDetail from './pages/WorkoutDetail';
import NotFound from './pages/NotFound';
import { loadWorkouts, saveWorkouts } from './utils';

export default function App() {
  const [workouts, setWorkouts] = useState(loadWorkouts);

  useEffect(() => {
    saveWorkouts(workouts);
  }, [workouts]);

  const handleAddWorkout = (workout) => {
    setWorkouts((prev) => [workout, ...prev]);
  };

  const handleDeleteWorkout = (id) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard workouts={workouts} />} />
          <Route path="/log" element={<LogWorkout onAdd={handleAddWorkout} />} />
          <Route path="/history" element={<History workouts={workouts} onDelete={handleDeleteWorkout} />} />
          
          {/* Dynamic Route */}
          <Route path="/workout/:id" element={<WorkoutDetail workouts={workouts} />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}