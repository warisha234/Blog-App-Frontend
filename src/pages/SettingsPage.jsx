import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

export default function SettingsPage() {

  const navigate = useNavigate();

  // optional UI states
  const [loading, setLoading] = useState(false);

  // =========================
  // DELETE ACCOUNT
  // =========================
  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "⚠️ This action is permanent. Do you really want to delete your account?"
    );

    if (!confirmDelete) return;

    setLoading(true);

    // fake backend action
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      alert("Account deleted successfully");

      navigate("/");
    }, 1000);
  };

  // =========================
  // DEACTIVATE ACCOUNT
  // =========================
  const handleDeactivateAccount = () => {
    const confirmDeactivate = window.confirm(
      "Do you want to deactivate your account?"
    );

    if (!confirmDeactivate) return;

    setLoading(true);

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      alert("Account deactivated");

      navigate("/");
    }, 800);
  };

  return (
    <div className="settings-page">

      <div className="settings-container">

        {/* HEADER */}
        <div className="settings-header">
          <div>
            <h1>Settings</h1>
            <p>Manage your account safely or permanently remove it.</p>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="danger-zone">

          <h2>⚠️ Account Control</h2>

          <p>
            Once you delete your account, all your blogs, data and activity will be removed permanently.
          </p>

          <div className="danger-actions">

            <button 
              className="deactivate-btn"
              onClick={handleDeactivateAccount}
              disabled={loading}
            >
              Deactivate Account
            </button>

            <button 
              className="delete-btn"
              onClick={handleDeleteAccount}
              disabled={loading}
            >
              Delete Account
            </button>

          </div>

          {loading && <p className="loading-text">Processing...</p>}

        </div>

      </div>

    </div>
  );
}
