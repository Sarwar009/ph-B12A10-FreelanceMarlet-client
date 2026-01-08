import { useMemo } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider.jsx";

export default function useApi() {
  const { accessToken, getToken } = useAuth();

  return useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    });

    instance.interceptors.request.use(
      async (config) => {
        try {
          let token = accessToken;
          if (!token && getToken) token = await getToken(false);
          if (token) {
            config.headers = {
              ...(config.headers || {}),
              Authorization: `Bearer ${token}`,
            };
          }
        } catch (err) {
          // silently continue without token
          console.error("useApi token attach error:", err);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return instance;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, getToken]);
}