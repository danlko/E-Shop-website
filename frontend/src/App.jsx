import { Routes, Route } from "react-router-dom";
import { ProductsProvider } from "./components/ProductContext/ProductContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/pages/Home";
import CatalogPage from "./components/pages/CatalogPage";
import ItemPage from "./components/pages/ItemPage";
import Cart from "./components/pages/Cart";
import Checkout from "./components/pages/Checkout";
import Success from "./components/pages/Success";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <ProductsProvider>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/catalog"
            element={
              <ProtectedRoute>
                <CatalogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/item/:id"
            element={
              <ProtectedRoute>
                <ItemPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </ProductsProvider>
  );
}

export default App;
