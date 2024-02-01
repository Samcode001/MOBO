import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import OrderConfirmed from "./pages/OrderConfirmed.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CheckOutPage from "./pages/CheckOutPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { useEffect } from "react";
import useHandleUser from "./hooks/handleUser.js";
import NotFound from "./components/NotFound.jsx";

function App() {

  
  return (
    <>
      <RecoilRoot>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckOutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/paymentsuccess"
              element={
                <OrderConfirmed />
                // <ProtectedRoute>
                // </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Router>
      </RecoilRoot>
    </>
  );
}

export default App;
