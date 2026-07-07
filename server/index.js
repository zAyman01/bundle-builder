import express from "express";
import cors from "cors";
import { readFileSync } from "fs";
import { createServer } from "http";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(__dirname, "data.json"), "utf-8"));

const app = express();
app.use(cors());

app.get("/api/bundle", (_req, res) => {
  res.json(data);
});

const PORT = process.env.PORT ?? 3001;
createServer(app).listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
