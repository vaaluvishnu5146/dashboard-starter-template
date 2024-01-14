import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useJwt } from "react-jwt";

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
