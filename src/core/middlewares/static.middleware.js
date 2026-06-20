import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticMiddleware = (app) => {
  app.use(express.static(path.join(__dirname, "../../public")));
};

export default staticMiddleware;
