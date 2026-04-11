import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header() {
  const cartItems = useSelector((state) => state.items);
  const cartCount = cartItems.length;
  const [userEmail, setUserEmail] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : null
  );
  const navigate = useNavigate();

  useEffect(() => {
    function onAuthChanged() {
      setUserEmail(localStorage.getItem("userEmail"));
    }

    window.addEventListener("authChanged", onAuthChanged);
    return () => window.removeEventListener("authChanged", onAuthChanged);
  }, []);

  function handleSignOut() {
    localStorage.removeItem("userEmail");
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  }

  return (
    <header className="border-bottom bg-light">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container justify-content">
          <a
            className="navbar-brand d-flex align-items-center fw-bold"
            href="/"
          >
            <img
              src="https://www.svgrepo.com/show/21889/trainers.svg"
              alt="Logo"
              width="40"
              height="40"
              className="me-2"
            />
          </a>

          <div className="d-flex justify-content-center flex-grow-1">
            <Navigation isAuth={!!userEmail} />
          </div>

          <div className="ms-auto d-flex align-items-center gap-2">
            {cartCount > 0 && (
              <div>
                <span className="badge bg-danger">Cart: {cartCount}</span>
              </div>
            )}

            {userEmail ? (
              <>
                <span className="text-muted">{userEmail}</span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </>
            ) : null}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
