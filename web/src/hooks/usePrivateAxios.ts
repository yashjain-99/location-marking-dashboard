import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { useKeycloakContext } from "../contexts/KeycloakProvider";

const usePrivateAxios = (): AxiosInstance => {
  const axiosInstance = axios.create();
  const { keyCloak: keycloak } = useKeycloakContext();

  if (!keycloak) {
    return axiosInstance;
  }

  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (keycloak.token) {
        try {
          // Attempt to update the token if it's about to expire
          await keycloak.updateToken(5);
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${keycloak.token}`;
        } catch (error) {
          console.error("Failed to update token:", error);
        }
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default usePrivateAxios;
