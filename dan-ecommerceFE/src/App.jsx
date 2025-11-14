// import { useState } from 'react'
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import ProductDetail from './pages/product_detail_page/ProductDetail';
import CollectionsPage from './pages/collections_page/CollectionsPage';
import CartHome from './pages/cart/CartHome';
import LoginAndSignup from './pages/loginandsignup/LoginAndSignup';
import AboutHome from './pages/about/AboutHome';
import { useSelector } from "react-redux";
import ProfileAndAddress from './pages/profile_and_address_page/ProfileAndAddress';
import Admin from './Admin/pages/Admin';
import AdminLogin from './Admin/pages/Login';
import BlogPage from './pages/blogPage/blogPage';
import SupportPage from './pages/SupportPage/SupportPage';
import CheckoutSuccess from './components/paymentStatus/CheckoutSuccess';
import OrdersPage from './pages/orders/Orders';


function App() {
  // const [count, setCount] = useState(0)
    const { username, accessToken, isLoggedIn } = useSelector((state) => state.auth);
   console.log(username, accessToken, isLoggedIn , "99999999999999999999999999999");

  const token = localStorage.getItem("accessToken");

  return (
    <Router>
      <Routes>
        {token ? (
          <>
            <Route path="*" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/cart" element={<CartHome />} />
            <Route path="/address" element={<ProfileAndAddress />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/orders" element={<OrdersPage />} />
          </>
        ) :
          (
            <>
              <Route path="*" element={<LoginAndSignup />} />
              <Route path="/login" element={<LoginAndSignup />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<Admin />} />
            </>
          )
        }
      </Routes>
    </Router>

  )
}

export default App
