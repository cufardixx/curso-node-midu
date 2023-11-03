const http = require("node:http"); // protocolo
const fs = require("node:fs");
const port = 1234;

const requesProcess = (req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.end("<h1>Lo que se ven en la img es este codigo<h1/>");
  } else if (req.url === "/img") {
    fs.readFile("gatolol.jpg", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("<h1>Imagen no encontrada error 500<h1/>");
        console.log(err);
      } else {
        res.setHeader("Content-Type", "image/png");
        res.end(data);
      }
    });
  }
};

const server = http.createServer(requesProcess);

server.listen(port, () => {
  console.log(`server listening on port http://localhost:${port}`);
});
