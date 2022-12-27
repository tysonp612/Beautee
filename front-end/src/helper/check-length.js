import { toast } from "react-toastify";
export const checkLength = (type, data) => {
  if (type === "name") {
    return data.length > 2 && data.length < 32
      ? true
      : toast.error(
          "Credential length has to be between 2 characters and 32 characters"
        );
  } else if (type === "password") {
    return data.length > 6
      ? true
      : toast.error("Password length has to be larger than 6 characters");
  }
};
