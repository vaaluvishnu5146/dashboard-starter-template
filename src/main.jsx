import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./Context/AuthContext.jsx";
import BrandContextProvider from "./Context/BrandContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <AuthContextProvider>
      <BrandContextProvider>
        <App />
      </BrandContextProvider>
    </AuthContextProvider>
  </Router>
);
