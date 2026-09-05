import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <h1>⚡ FitTrack</h1>
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink>
          <NavLink to="/log" className={({ isActive }) => isActive ? 'active-link' : ''}>Log Workout</NavLink>
          <NavLink to="/history" className={({ isActive }) => isActive ? 'active-link' : ''}>History</NavLink>
        </nav>
      </div>
    </header>
  );
}