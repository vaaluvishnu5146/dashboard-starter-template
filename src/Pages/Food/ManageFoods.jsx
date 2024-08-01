import { useEffect, useState } from "react"
import { showToast } from "../../Assets/toasts";
import { useAuthContext } from "../../Context/AuthContext";

export default function ManageFoods() {
    const [products, setProducts] = useState([])
    const { currentUser = {} } = useAuthContext();

    useEffect(() => {
        if (currentUser) {
            fetch(`http://localhost:3003/products/${currentUser.brand}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: sessionStorage.getItem("_tk"),
                }
            })
            .then((response) => response.json())
            .then((result) => {
                showToast(result.message)
                setProducts(result.response)
            })
            .catch((error) => {
                showToast(error.message, "error")
            })
        }
    }, [currentUser]);

  return (
    <div className="container">
    <table className="table">
    <thead>
        <tr>
        <th scope="col">S.NO</th>
        <th scope="col">Food Name</th>
        <th scope="col">Food Price</th>
        <th scope="col">Food Available</th>
        <th scope="col">Brand Id</th>
        </tr>
    </thead>
    <tbody>
        {
            products?.map((product, index) => {
                return (
                    <tr key={`${product.name}-${index}`}>
                        <th scope="row">{index + 1}</th>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.isAvailable ? "Available" : "Not Available"}</td>
                        <td>{product.brand}</td>
                    </tr>
                );
            })
        }
    </tbody>
    </table>
    </div>
  )
}
