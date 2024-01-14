import { Bounce, toast } from "react-toastify";

export const showToast = (message, type = "success") => {
  const toastType = toast[type];
  if (toastType) {
    toastType(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }
};
