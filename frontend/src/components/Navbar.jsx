import { Link } from "react-router-dom";
import { ShoppingCart, User, Search } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Logo */}
      <Link to="/" className="logo">
        ShopAI
      </Link>

      {/* Search */}
      <div className="search-box">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search products..."
        />
      </div>

      {/* Navigation */}
      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/cart">
          <ShoppingCart size={21} />
        </Link>

        <Link to="/login">
          <User size={21} />
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;