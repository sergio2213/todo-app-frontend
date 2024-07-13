import { useContext } from "react";
import { AuthContext, AuthContextData } from "../auth/AuthProvider";

export const useAuth = () => useContext<null | AuthContextData>(AuthContext)