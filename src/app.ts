import { Socket } from "socket.io";

import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import { Server as SocketServer } from "socket.io";

import config from "./config";
import routes from "./routes/v0";
import httpStatus from "http-status";

const app = express();
const server = http.createServer(app);

export const init = async () => {
  // cors
  app.use(cors(config.cors));
  const io = new SocketServer(server, {
    cors: config.cors,
  });

  io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    // Example: Broadcast a message to all connected clients
    // including the sender.
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  mongoose.connect(config.db);

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB at", config.db);
  });

  app.get("/", (_, res) => {
    res.send("Hello World!");
  });

  app.use("/v0", routes);

  app.use((_, res) => {
    res.status(httpStatus.NOT_FOUND).send("Not found");
  });

  app.listen(config.port, () => {
    console.log("Server is listening on port 3000");
  });

  server.listen(config.port, () => {
    console.log("Socket server is listening on port 3000");
  });
};
