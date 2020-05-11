const express = require("express");

const db = require("../accounts/account-router");

const server = express();

server.use(express.json());

server.use("/api/accounts", db);

server.get("/", (req, res) => {
    res.status(200).json("Server is running!")
})

module.exports = server;
