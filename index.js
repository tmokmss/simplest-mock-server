#!/usr/bin/env node
const express = require("express");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
    .usage("Usage: $0 [options]")
    .help("h")
    .option("json", {
        alias: "j",
        type: "boolean",
        default: false,
        description: "Print request content in json format",
    })
    .option("port", {
        alias: "p",
        type: "number",
        default: 3000,
        description: "Port number",
    })
    .option("status", {
        alias: "s",
        type: "number",
        default: 200,
        description: "Response status code",
    })
    .option("host", {
        alias: "H",
        type: "string",
        default: "localhost",
        description: "server host address",
    }).argv;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const outputAsJson = argv.json;
const responsStatusCode = argv.status;
const port = argv.port;
const host = argv.host;

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

console.log(`server started at http://${host}:${port}`);

app.listen(port, host);
