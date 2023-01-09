import express from "express";
import allRoutes from "./routes";
import morgan from "morgan";
import cors from "cors";

const app = express();

// middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// routes
app.use("/api", allRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
