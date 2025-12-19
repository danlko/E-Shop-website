import { useState } from "react";
import { useProducts } from "../ProductContext/ProductContext.jsx";
import HeroBanner from "../HeroBanner/HeroBanner";
import ProductCard from "../ProductCard/ProductCard";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

function Home() {
  const { products } = useProducts();
  const [showMore, setShowMore] = useState(false);

  const featuredProducts = products.slice(0, 3);

  return (
    <main className="flex-grow-1">
      <HeroBanner />
      <div className="container my-5">
        <h2 className="text-center mb-4">Featured Products</h2>

        <div className="row justify-content-center g-4">
          {featuredProducts.map(product => (
            <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                color={product.color}
                size={product.size}
                showButton={true}
              />
            </div>
          ))}
        </div>

        {showMore && (
          <div className="row mt-5 animate__animated animate__fadeIn">
            <div className="col-12 text-center">
              <div className="alert alert-info">
                <h4>1 + 1 = 4!</h4>
                <p>Order two original pairs with our loyalty card.</p>
                <p>Buy four for the price of two!</p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-5">
          <PrimaryButton
            text={showMore ? "Hide" : "Promotion!"}
            onClick={() => setShowMore(!showMore)}
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
