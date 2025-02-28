import Keycloak from "keycloak-connect";
import session from "express-session";

const memoryStore = new session.MemoryStore();

const keycloak = new Keycloak(
  { store: memoryStore },
  {
    realm: "auth",
    authServerUrl: process.env.KEYCLOAK_URL, // Keycloak server URL
    clientId: "locationMarkingDashboard",
    "public-client": true,
    "confidential-port": 0,
  }
);

export default keycloak;
