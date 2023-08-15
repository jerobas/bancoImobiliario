import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // serve up production asset
app.use(express.static(path.join(__dirname, "dist"))); // let the react app to handle any unknown routes // serve up the index.html if express does'nt recognize the route

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
}); // if not in production use the port 5000

const PORT = 5000;
console.log("server started on port:", PORT);
app.listen(PORT);
