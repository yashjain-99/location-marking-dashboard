import express from "express";
import cors from "cors";
import session from "express-session";
import keycloak from "./keycloak/index.js";
import locationsRoutes from "./routes/locationsRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());

app.use(
  session({
    secret: "3f40be7161e66997b28b67535a537c39778e77fc8477f3909f0b80bf49f6a726",
    resave: false,
    saveUninitialized: true,
    store: keycloak.memoryStore,
  })
);

app.use(keycloak.middleware());

app.use("/api/locations", locationsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

export default app;
