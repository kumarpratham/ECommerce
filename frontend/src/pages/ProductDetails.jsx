import { useParams } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";

import products from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetails() {

  const { id } = useParams();

  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <main className="product-details">

      <div className="details-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="details-content">

        <p className="product-category">
          {product.category}
        </p>

        <h1>
          {product.name}
        </h1>

        <div className="details-rating">

          <Star
            size={18}
            fill="currentColor"
          />

          {product.rating}

        </div>

        <p className="details-price">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        <p className="details-description">
          {product.description}
        </p>

        <button
          className="add-cart-btn"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart size={20} />

          Add to Cart
        </button>

      </div>

    </main>
  );
}

export default ProductDetails;