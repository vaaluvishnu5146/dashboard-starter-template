import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import { showToast } from "../../Assets/toasts";

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigator = useNavigate();
  const { setIsLoggedIn = () => {} } = useAuthContext();

  function handleSignIn(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.length > 0 && password.length > 0) {
      fetch("http://localhost:3000/api/auth/admin/signin", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
          
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.success && result.token) {
            sessionStorage.setItem("_tk", result.token);
            setIsLoggedIn(true);
            navigator("/dashboard");
          } else {
            showToast(result.message, "error");
          }
        })
        .catch((error) => {
          showToast(error, "error");
        });
    } else {
      showToast("Email or Password is required", "warning");
    }
  }

  return (
    <div
      className="container"
      style={{
        height: "100vh",
      }}
    >
      <div
        className="container-fluid"
        style={{
          height: "100%",
        }}
      >
        <div
          className="row"
          style={{
            height: "100%",
          }}
        >
          <div
            className="col-6"
            style={{
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage:
                'url("https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?size=626&ext=jpg")',
            }}
          ></div>
          <div className="col-6 d-flex align-items-center justify-content-center">
            <div className="card" style={{ width: "400px" }}>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    ref={passwordRef}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="*********"
                  />
                </div>
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{ width: "100%" }}
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
