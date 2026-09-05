import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="empty-state">
      <h2>404 - Page Not Found</h2>
      <p>Looks like you lifted too heavy and broke the URL.</p>
      <Link to="/" className="submit-btn" style={{ display: 'inline-block', width: 'auto', marginTop: '1rem' }}>
        Return Home
      </Link>
    </div>
  );
}