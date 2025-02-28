import { useEffect, useRef, useState } from "react";
import Keycloak from "keycloak-js";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/slices/userSlice";
import { useKeycloakContext } from "../contexts/KeycloakProvider";

const client = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
});

const useAuth = () => {
  const isRun = useRef(false);
  const dispatch = useAppDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setKeycloak } = useKeycloakContext();

  const createUser = async (client: Keycloak) => {
    try {
      const userInfo = await client.loadUserInfo();
      dispatch(setUser(userInfo as User));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;
    client
      .init({
        onLoad: "login-required",
      })
      .then((res) => {
        setIsLoggedIn(res);
        createUser(client);
        setKeycloak(client);
      })
      .catch((e) => console.error(e));
  }, []);

  return isLoggedIn;
};

export default useAuth;
