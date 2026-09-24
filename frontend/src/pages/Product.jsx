import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Product() {
  return (
    <main className="products-page">

      <div className="products-header">
        <div>
          <p className="section-label">
            SHOP
          </p>

          <h1>Explore Products</h1>

          <p>
            Find products that match your needs.
          </p>
        </div>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </main>
  );
}

export default Product;