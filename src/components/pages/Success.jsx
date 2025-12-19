import { useNavigate, useLocation } from "react-router-dom";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const { total, email } = location.state || {};
  return (
    <div className="container text-center my-5" style={{ maxWidth: "900px" }}>
      <div
        style={{
          width: "140px",
          height: "140px",
          margin: "0 auto",
          borderRadius: "50%",
          backgroundColor: "#4CAF50",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "80px", color: "white" }}>✓</span>
      </div>

      <h2 className="fw-bold mt-4">Success!</h2>
      <p>Your order was sent to processing!</p>
      {email && (
        <p>
          Receipt will be sent to: <strong>{email}</strong>
        </p>
      )}
      {typeof total !== "undefined" && (
        <p>
          Order total:{" "}
          <strong>
            ${Number(total).toFixed ? Number(total).toFixed(2) : total}
          </strong>
        </p>
      )}

      <PrimaryButton
        text="Go Back to Catalog"
        className="btn-dark mt-4 px-5"
        onClick={() => navigate("/catalog")}
      />
    </div>
  );
}

export default Success;
