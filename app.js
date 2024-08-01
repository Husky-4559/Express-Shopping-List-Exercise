// app.js
const express = require("express");
const items = require("./fakeDb");
const router = require("./routes/items");
const app = express();

app.use(express.json());
app.use("/items", router);

module.exports = app;
