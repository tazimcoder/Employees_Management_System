import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext"; // CAPITAL C


export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.error("useAuth used outside AuthProvider");
    return null;
  }

  return context;
};
