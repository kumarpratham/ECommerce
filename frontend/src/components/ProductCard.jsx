import { Link } from "react-router-dom";
import {
  Star,
  ShoppingCart
} from "lucide-react";

import { useCart } from "../context/CartContext";

function ProductCard({ product }) {

  const { addToCart } = useCart();

  return (
    <div className="product-card">

      <Link
        to={`/products/${product.id}`}
        className="product-image-container"
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </Link>

      <div className="product-info">

        <p className="product-category">
          {product.category}
        </p>

        <Link
          to={`/products/${product.id}`}
          className="product-name"
        >
          {product.name}
        </Link>

        <div className="product-rating">

          <Star
            size={16}
            fill="currentColor"
          />

          <span>
            {product.rating}
          </span>

        </div>

        <div className="product-bottom">

          <span className="product-price">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <button
            className="cart-btn"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;