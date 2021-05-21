#!/usr/bin/env node
const express = require("express");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
    .usage("Usage: $0 [options]")
    .help("h")
    .alias("j", "json")
    .boolean("j")
    .default("j", false)
    .describe("j", "Print request content in json format.")
    .alias("p", "port")
    .number("p")
    .default("p", 3000)
    .describe("p", "Port number")
    .alias("s", "status")
    .number("s")
    .default("s", 200)
    .describe("s", "Response status code").argv;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const outputAsJson = argv.json;
const responsStatusCode = argv.status;
const port = argv.port;

const handler = (req, res, _) => {
    const dump = {
        url: req.url,
        method: req.method,
        query: req.query,
        headers: req.headers,
        body: req.body,
    };
    console.log(outputAsJson ? JSON.stringify(dump) : dump);
    res.status(responsStatusCode).send("");
};

app.all("/*", handler);
app.all("/", handler);

console.log(`server started at http://localhost:${port}`);

app.listen(port);
