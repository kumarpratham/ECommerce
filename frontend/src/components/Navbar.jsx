import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">
        ShopAI
      </Link>

      {/* Search */}
      <div className="search-box">
        <Search size={18} />

        <input type="text" placeholder="Search products..." />
      </div>

      {/* Navigation */}
      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/cart">
          <ShoppingCart size={18} />
          Cart
        </Link>

        {!loading && (
          <>
            {user ? (
              <>
                <span className="navbar-user">
                  <User size={18} />
                  Hi, {user.name}
                </span>

                <button onClick={handleLogout} className="logout-button">
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>

                <Link to="/register">Register</Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
