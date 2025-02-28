import express from "express";
import cors from "cors";
import locationsRoutes from "./routes/locationsRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());

app.use("/api/locations", locationsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

export default app;
