import { useState, useEffect, useCallback } from "react";
import usePrivateAxios from "./usePrivateAxios";
import { useAppDispatch } from "../redux/hooks";
import { setLocations } from "../redux/slices/locationsSlice";

export default function useFetchLocations(isLoggedIn: boolean) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const axios = usePrivateAxios();
  const dispatch = useAppDispatch();
  const API_URL = `${import.meta.env.VITE_API_DOMAIN}:${
    import.meta.env.VITE_API_PORT
  }/api/locations`;

  const fetchLocations = useCallback(async () => {
    if (isLoggedIn) {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Location[]>(API_URL);
        dispatch(setLocations(response.data as unknown as CurrLocation[]));
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
          console.error("Failed to fetch locations:", err);
        } else {
          console.error("An unknown error occurred:", err);
        }
      } finally {
        setLoading(false);
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchLocations();
  }, [isLoggedIn]);

  return { loading, error };
}
