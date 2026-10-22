import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <h1>⚡ liftly</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {user ? (
            <>
              <nav className="nav-links">
                <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink>
                <NavLink to="/log" className={({ isActive }) => isActive ? 'active-link' : ''}>Log Workout</NavLink>
                <NavLink to="/history" className={({ isActive }) => isActive ? 'active-link' : ''}>History</NavLink>
              </nav>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  👤 <strong style={{ color: '#f8fafc' }}>{user}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="delete-btn"
                  title="Sign Out"
                  style={{ width: 'auto', padding: '0.3rem 0.6rem', fontSize: '0.75rem', fontWeight: 600 }}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <NavLink to="/login" className="glow-button" style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem', margin: 0, textDecoration: 'none' }}>
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}