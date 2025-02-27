import { useEffect, useRef, useState } from "react";
import Keycloak from "keycloak-js";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/slices/userSlice";

const client = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
});

const useAuth = () => {
  const isRun = useRef(false);
  const dispatch = useAppDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const createUser = async (client: Keycloak) => {
    try {
      const userInfo = await client.loadUserInfo();
      const user = { ...userInfo, token: client.token, logout: client.logout };
      dispatch(setUser(user as User));
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
      })
      .catch((e) => console.error(e));
  }, []);

  return isLoggedIn;
};

export default useAuth;
