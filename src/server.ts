import express from "express";
import allRoutes from "./routes";
import morgan from "morgan";
import cors from "cors";
import chalk from "chalk";

// dotenv
import * as dotenv from "dotenv";
dotenv.config();

let PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

const server = express();

// middleware
server.use(morgan("tiny"));
server.use(cors());
server.use(express.json());

// routes
server.use("/api", allRoutes);

server
  .listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  })
  .on("error", (error: any) => {
    if (error.code === "EADDRINUSE") {
      console.log(chalk.red(`Port ${PORT} is already in use`));
      if (process.platform === "win32") {
        console.log(
          chalk.red(
            `Try ➤ "SET PORT=${
              PORT + 1
            } && npm run dev" to run the server on a different port`
          )
        );
      } else if (
        process.platform === "linux" ||
        process.platform === "darwin"
      ) {
        console.log(
          chalk.yellow(
            `Try ➤ "PORT=${
              PORT + 1
            } npm run dev" to run the server on a different port`
          )
        );
      } else {
        console.log("Try running the server on a different port");
      }
    }
    console.log("Exiting process...");
    process.exit(1);
  });
