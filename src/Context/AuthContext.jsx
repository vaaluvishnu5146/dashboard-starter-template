import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useJwt } from "react-jwt";
import { showToast } from "../Assets/toasts";

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  currentUser: null,
  setCurrentUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const { decodedToken, isExpired } = useJwt(
    sessionStorage.getItem("_tk") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (decodedToken && !isExpired) {
      setIsLoggedIn(true);
    }
  }, [decodedToken, isExpired]);

  useEffect(() => {
    if (decodedToken && !isExpired) {
      fetch(`http://localhost:3003/api/users/user/${decodedToken._id}`, {
        method: "GET"
      }).then((response) => response.json())
      .then((result) => {
        showToast(result.message)
        setCurrentUser(result.data)
      }).catch((error) => {
        showToast(error.message, "error")
      })
    }
  }, [decodedToken, isExpired]);

  const values = {
    isLoggedIn,
    setIsLoggedIn,
    setCurrentUser,
    currentUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
