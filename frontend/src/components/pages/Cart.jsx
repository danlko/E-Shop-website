import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, updateQuantity } from "../../redux/actions";
import { useState } from "react";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.items);

  const [selected, setSelected] = useState(
    cartItems.reduce((acc, it) => ({ ...acc, [it.id]: true }), {})
  );

  const toggleSelect = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleQuantity = (id, q) => {
    if (q >= 1) dispatch(updateQuantity(id, q));
  };

  const totalAmount = cartItems
    .filter((i) => selected[i.id])
    .reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="container my-5" style={{ maxWidth: "900px" }}>
      <h2 className="text-center mb-4 fw-bold">Shopping Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="d-flex align-items-center justify-content-between p-3 mb-3 border rounded"
        >
          <div className="d-flex align-items-center gap-3">
            <input
              type="checkbox"
              checked={selected[item.id]}
              onChange={() => toggleSelect(item.id)}
              style={{ width: "20px", height: "20px" }}
            />

            <img
              src={item.image || "https://via.placeholder.com/80"}
              alt=""
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "6px",
                background: "#eee",
              }}
            />

            <div>
              <h6 className="mb-1">{item.name}</h6>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center border px-2 rounded">
              <button
                className="btn btn-light"
                onClick={() => handleQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                className="btn btn-light"
                onClick={() => handleQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <span className="fw-bold">${item.price * item.quantity}</span>
            <button
              className="btn btn-sm btn-outline-danger ms-2"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h4 className="text-end fw-bold me-2">Total amount: ${totalAmount}</h4>

      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-outline-dark"
          onClick={() => navigate("/catalog")}
        >
          Back to Catalog
        </button>

        <PrimaryButton
          text="Continue"
          onClick={() =>
            navigate("/checkout", { state: { totalAmount, selected } })
          }
          className="btn-dark px-4"
        />
      </div>
    </div>
  );
}

export default Cart;
