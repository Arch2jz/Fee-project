import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LogWorkout from './pages/LogWorkout';
import History from './pages/History';
import WorkoutDetail from './pages/WorkoutDetail';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { loadWorkouts, saveWorkouts } from './utils';

export default function App() {
  const [workouts, setWorkouts] = useState(loadWorkouts);
  const [user, setUser] = useState(() => localStorage.getItem('liftly_user') || null);

  useEffect(() => {
    saveWorkouts(workouts);
  }, [workouts]);

  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem('liftly_user', username);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('liftly_user');
  };

  const handleAddWorkout = (workout) => {
    setWorkouts((prev) => [workout, ...prev]);
  };

  const handleDeleteWorkout = (id) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div className="app-layout">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          {/* Public / Auth Route */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />}
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Dashboard workouts={workouts} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/log"
            element={
              <ProtectedRoute user={user}>
                <LogWorkout onAdd={handleAddWorkout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute user={user}>
                <History workouts={workouts} onDelete={handleDeleteWorkout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workout/:id"
            element={
              <ProtectedRoute user={user}>
                <WorkoutDetail workouts={workouts} />
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}