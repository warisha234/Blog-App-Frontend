import { Link } from 'react-router-dom';
import { Bell, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="navbar">

      {/* LEFT SIDE (LOGO HO TO YAHAN ADD KAR SAKTI HO) */}
      <div className="nav-left">
        <Link to="/" className="logo">
         
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">

        <Link to="/blogs/create" className="write-btn">
          <Plus size={16} />
          Write
        </Link>

        <button className="notif-btn">
          <Bell size={17} />
          <span className="dot"></span>
        </button>

        {user ? (
          <Link to="/profile" className="profile">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <div className="avatar-fallback">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </Link>
        ) : (
          <Link to="/login" className="login">
            Sign in
          </Link>
        )}

      </div>

    </header>
  );
}