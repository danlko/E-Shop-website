import { useParams, useNavigate } from "react-router-dom";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductById } from "../../api/products";
import { addToCart } from "../../redux/actions";
import Loader from "../Loader/Loader";

function ItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await getProductById(id);
        if (!mounted) return;
        setProduct(res);
        setSelectedSize(res.size || "");
        setSelectedColor(res.color || "");
        setQuantity(1);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleGoBack = () => navigate(-1);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl || product.image,
        quantity,
        selectedSize,
        selectedColor,
      })
    );

    alert("Product added to cart!");
  };

  if (isLoading)
    return (
      <div className="container mt-5">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="container mt-5">
        <h2>Error loading product</h2>
      </div>
    );
  if (!product)
    return (
      <div className="container mt-5">
        <h2>Product not found</h2>
      </div>
    );

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.imageUrl || product.image}
            alt={product.name}
            className="img-fluid rounded shadow-sm w-100"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </div>

        <div className="col-md-6">
          <div>
            <span className="badge bg-dark me-2">1 characteristic</span>
            <span className="badge bg-primary me-2">2 characteristic</span>
          </div>

          <h1 className="display-5 fw-bold mt-3">{product.name}</h1>

          <p className="lead mt-3">
            This is a great pair of shoes suitable for daily use.
          </p>

          <div className="row mt-4 gy-3">
            <div className="col-md-4">
              <label htmlFor="quantity-field" className="form-label fw-bold">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity-field"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="size-select" className="form-label fw-bold">
                Size:
              </label>
              <select
                id="size-select"
                className="form-select"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value={product.size}>{product.size}</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="color-select" className="form-label fw-bold">
                Color:
              </label>
              <select
                id="color-select"
                className="form-select"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value={product.color}>{product.color}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5 align-items-center">
        <div className="col-md-6">
          <h2 className="fw-bold">Price: ${product.price}</h2>
        </div>

        <div className="col-md-6 text-md-end">
          <PrimaryButton
            text="Go back"
            onClick={handleGoBack}
            className="btn-light btn-lg me-3 px-4"
          />
          <PrimaryButton
            text="Add to cart"
            onClick={handleAddToCart}
            className="btn-dark btn-lg px-5"
          />
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
