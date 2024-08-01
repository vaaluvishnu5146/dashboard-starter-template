import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { showToast } from "../Assets/toasts";
import { useAuthContext } from "./AuthContext";

const BrandContext = createContext({
  brand: null
});

export const useBrandContext = () => useContext(BrandContext);

export default function BrandContextProvider({ children }) {
  const [brand, setBrand] = useState(null);
  const { currentUser = {} } = useAuthContext();


  useEffect(() => {
    if (currentUser) {
      fetch(`http://localhost:3003/brands/brand/${currentUser.brand}`, {
        method: "GET"
      }).then((response) => response.json())
      .then((result) => {
        showToast(result.message)
        setBrand(result.response)
      }).catch((error) => {
        showToast(error.message, "error")
      })
    }
  }, [currentUser]);

  const values = {
    brand
  };

  return <BrandContext.Provider value={values}>{children}</BrandContext.Provider>;
}

BrandContextProvider.propTypes = {
  children: PropTypes.node,
};
