import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Landing from "./Pages/Landing";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Settings from "./Pages/Settings";
import Products from "./Pages/Products";
import Insights from "./Pages/Insights";
import Discounts from "./Pages/Discounts";
import ManageProducts from "./Pages/Products/ManageProducts";
import ManageDiscounts from "./Pages/Discounts/ManageDiscounts";
import { useAuthContext } from "./Context/AuthContext";
import NotFound from "./Pages/NotFound";

function App() {
  const { isLoggedIn } = useAuthContext();
  return (
    <div>
      <ToastContainer />
      <Routes>
        {!isLoggedIn && <Route Component={Login} path="/" />}
        {isLoggedIn && (
          <Route Component={Landing} path="/dashboard">
            <Route Component={Insights} index />
            <Route Component={Products} path="/dashboard/products/create" />
            <Route Component={ManageProducts} path="/dashboard/products/" />
            <Route Component={Discounts} path="/dashboard/offers/create" />
            <Route Component={ManageDiscounts} path="/dashboard/offers/" />
            <Route Component={Settings} path="/dashboard/settings" />
          </Route>
        )}
        <Route Component={NotFound} path="*" />
      </Routes>
    </div>
  );
}

export default App;
