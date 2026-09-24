import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="empty-cart">
        <div>
          <h1>Your Cart is Empty 🛒</h1>

          <p>
            Looks like you haven't added anything yet.
          </p>

          <Link
            to="/products"
            className="continue-shopping-btn"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">

      <div className="cart-header">
        <p className="section-label">SHOPPING CART</p>

        <h1>Your Cart</h1>

        <p>
          {cart.length} product{cart.length !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      <div className="cart-layout">

        {/* Cart Items */}

        <div className="cart-items">

          {cart.map((item) => (
            <div
              className="cart-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-info">

                <p className="product-category">
                  {item.category}
                </p>

                <h2>{item.name}</h2>

                <p className="cart-item-price">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>

                {/* Quantity */}

                <div className="quantity-control">

                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    <Minus size={16} />
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    <Plus size={16} />
                  </button>

                </div>

              </div>

              {/* Item Total */}

              <div className="cart-item-right">

                <strong>
                  ₹{(
                    item.price * item.quantity
                  ).toLocaleString("en-IN")}
                </strong>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* Order Summary */}

        <div className="order-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>

            <span>
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>

            <span>FREE</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>

            <span>
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>

          <button className="checkout-btn">
            Proceed to Checkout
          </button>

          <Link
            to="/products"
            className="continue-shopping"
          >
            ← Continue Shopping
          </Link>

        </div>

      </div>

    </main>
  );
}

export default Cart;