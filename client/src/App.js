import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./components/Navigation";
import Foods from "./components/foods/Foods";
import ShoppingCart from "./components/cart/ShoppingCart";
import AdminLogin from "./components/admin/Login";
import Orders from "./components/admin/Orders";

function App() {
  const [cart, setCart] = useLocalStorage("cart", []);

  return (
    <BrowserRouter>
      <Navigation cart={cart} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Foods cart={cart} setCart={setCart} />}
        />
        <Route
          path="cart"
          element={<ShoppingCart cart={cart} setCart={setCart} />}
        />
        <Route path="admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="admin/orders" element={<Orders />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
