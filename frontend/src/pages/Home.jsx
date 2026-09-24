import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">
          <p className="hero-tag">AI-Powered Shopping</p>

          <h1>
            Shop Smarter.
            <br />
            Shop with AI.
          </h1>

          <p className="hero-description">
            Discover products, compare options, and get personalized
            recommendations with our AI shopping assistant.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="primary-btn">
              Explore Products
            </Link>

            <button className="secondary-btn">
              Ask AI 🤖
            </button>
          </div>
        </div>

      </section>

      {/* Features */}
      <section className="features">

        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h3>AI Recommendations</h3>
          <p>
            Get product suggestions based on your needs and budget.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3>Fast Delivery</h3>
          <p>
            Get your products delivered quickly and safely.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure Payment</h3>
          <p>
            Secure and reliable checkout for every purchase.
          </p>
        </div>

      </section>

    </main>
  );
}

export default Home;