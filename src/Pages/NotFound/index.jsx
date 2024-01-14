import { Link } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";

export default function NotFound() {
  const { isLoggedIn } = useAuthContext();
  return (
    <div className="container">
      <div className="container-fluid">
        <h1>404 Page Not Found</h1>
        <h3>The page you are looking for is not found</h3>
        <p>
          Go back to login page{" "}
          {isLoggedIn ? (
            <Link to="/dashboard">Go To Dashboard</Link>
          ) : (
            <Link to="/">Login</Link>
          )}
        </p>
      </div>
    </div>
  );
}
