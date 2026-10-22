import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please provide both username and password.');
      return;
    }

    // Client-side authentication check (no backend required)
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    onLogin(username.trim());
    navigate('/');
  };

  return (
    <div className="page-container" style={{ maxWidth: '420px', marginTop: '3rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Welcome to liftly</h2>
        <p style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          Enter your credentials to manage your training sessions.
        </p>

        {error && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#f43f5e',
            padding: '0.6rem 0.8rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="e.g. lifter123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="glow-button" style={{ marginTop: '0.5rem' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}