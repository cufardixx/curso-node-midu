const express = require("express");
const { log } = require("node:console");
const fs = require("node:fs");

const app = express();

const PORT = process.env.PORT ?? 1244;

app.use("/lol", (req, res, next) => {
  fs.readFile("gatolol.jpg", (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("<h1>Imagen no encontrada error 500<h1/>");
      console.log(err);
    } else {
      res.setHeader("Content-Type", "image/png");
      res.end(data);
      next();
    }
  });
});

app.use((req, res, next) => {
  //trackear la request a la DB
  //revisar si un usuario tiene cookies
  if (req.method !== "POST") return next();
  if (req.headers["content-type"] !== "application/json") return next();
  // solo llegan request que son POST y que tienen el header Content-Type: application/json

  let body = "";

  // escuchar el evento data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    //mutar la request y meter la informacion en el req.body
    req.body = data;
    next();
  });
});



app.get("/", (req, res) => {
  res.status(200).send('adadd');
});

app.get("/pokemon/ditto", (req, res) => {
  res.status(200).send("<h1>Primer enPoint");
});

app.post("/pokemon", (req, res) => {
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(404).send("<h1>Eroro 404<h1/>");
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
