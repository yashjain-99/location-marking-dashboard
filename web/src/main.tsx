import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import KeycloakProvider from "./contexts/KeycloakProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <KeycloakProvider>
        <App />
      </KeycloakProvider>
    </Provider>
  </StrictMode>
);
