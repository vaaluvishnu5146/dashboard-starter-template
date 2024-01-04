import { useState } from "react";
import "./App.css";
import Landing from "./Pages/Landing";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Settings from "./Pages/Settings";
import Products from "./Pages/Products";
import Insights from "./Pages/Insights";

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <Routes>
        <Route Component={Login} path="/" />
        <Route Component={Landing} path="/dashboard">
          <Route Component={Insights} index />
          <Route Component={Products} path="/dashboard/products" />
          <Route Component={Settings} path="/dashboard/settings" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
