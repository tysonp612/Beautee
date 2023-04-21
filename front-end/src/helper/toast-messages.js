import { toast } from "react-toastify";

export const toastMessage = (type, message) => {
  if (type === "s") {
    toast.success(`${message}`);
  } else if (type === "e") {
    toast.error(`${message}`);
  }
};
