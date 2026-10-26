import { calculateMuscleRecovery } from '../utils';

export default function RecoveryRadar({ workouts = [] }) {
  const recoveryData = calculateMuscleRecovery(workouts);

  return (
    <div className="glass-panel recovery-container">
      <div className="recovery-header">
        <div>
          <h3>Dynamic Muscle Readiness & Fatigue Decay</h3>
          <p className="recovery-subtitle">
            Scientific 48-hour recovery modeling based on training timestamps
          </p>
        </div>
        <span className="recovery-badge-tag">Offline Biometric Math</span>
      </div>

      <div className="recovery-grid">
        {recoveryData.map((item) => (
          <div key={item.muscle} className="recovery-card">
            <div className="recovery-card-top">
              <span className="muscle-name">{item.muscle}</span>
              <span className="readiness-score" style={{ color: item.color }}>
                {item.readiness}%
              </span>
            </div>

            {/* Visual Progress Track */}
            <div className="recovery-bar-track">
              <div
                className="recovery-bar-fill"
                style={{
                  width: `${item.readiness}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>

            {/* Time Tracking Information */}
            <div className="recovery-time-meta">
              {item.hoursElapsed === null ? (
                <span className="time-badge fresh">No logged fatigue</span>
              ) : (
                <>
                  <span className="time-text">
                    ⏱️ <strong>{item.hoursElapsed}h</strong> elapsed
                  </span>
                  <span className="time-text remaining" style={{ color: item.color }}>
                    {item.hoursRemaining > 0 ? `${item.hoursRemaining}h to 100%` : 'Ready'}
                  </span>
                </>
              )}
            </div>

            {/* Status & Clinical Advice */}
            <div className="recovery-status-row">
              <span className="status-pill" style={{ color: item.color, borderColor: item.color }}>
                {item.status}
              </span>
              <p className="recovery-recommendation">{item.recommendation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}