import http from "node:http";
import { spawn } from "node:child_process";

const server = http.createServer((req, res) => {
  if (req.url === "/current-time") {
    const date = new Date();
    const currentTime = date.toISOString();

    const echo = spawn("echo", [currentTime]);

    echo.stdout.on("data", (data) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    });

    echo.stderr.on("data", (data) => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(`Error: ${data}`);
    });
  } else if (req.url === "/files") {
    const ls = spawn("ls", ["-la"]);

    ls.stdout.on("data", (data) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    });

    ls.stderr.on("data", (data) => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(`Error: ${data}`);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const port = 3000;

server.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});

// Test commands: node index.js