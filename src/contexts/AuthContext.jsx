import { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Keep simple re-export (no duplicate named exports)
export { default } from "./AuthProvider.jsx";
