import {
  createContext,
  ReactNode,
  useContext,
  useState,
  ReactElement,
} from "react";
import Keycloak from "keycloak-js";

interface KeycloakContextType {
  keyCloak: undefined | Keycloak;
  setKeycloak: (keyCloak: Keycloak) => void;
}

const KeycloakContext = createContext<KeycloakContextType | undefined>(
  undefined
);

const KeycloakProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [keyCloak, setKeycloak] = useState<Keycloak | undefined>(undefined);

  return (
    <KeycloakContext.Provider value={{ keyCloak, setKeycloak }}>
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloakContext = (): KeycloakContextType => {
  const context = useContext(KeycloakContext);

  if (!context) {
    throw new Error(
      "useKeycloakContext must be used within a KeycloakProvider"
    );
  }

  return context;
};

export default KeycloakProvider;
