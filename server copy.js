const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const path = require("path");

// === Log File Setup ===
const logFile = path.join(__dirname, "server.log");
const logStream = fs.createWriteStream(logFile, { flags: "a" });

console.log = (...args) => {
  const msg = `[${new Date().toISOString()}] ${args.join(" ")}`;
  logStream.write(msg + "\n");
  process.stdout.write(msg + "\n"); // Optional: still output to Plesk's console if supported
};

console.error = (...args) => {
  const msg = `[${new Date().toISOString()}] ERROR: ${args.join(" ")}`;
  logStream.write(msg + "\n");
  process.stderr.write(msg + "\n");
};

// === Next.js Server Setup ===
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});