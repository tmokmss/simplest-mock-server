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
    .option("echo", {
        alias: "e",
        type: "boolean",
        default: false,
        description: "Echo back request body in the response body",
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
const echo = argv.echo;
const responseStatusCode = argv.status;
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
    if (echo) {
        res.status(responseStatusCode).json(dump);
    } else {
        res.status(responseStatusCode).send("");
    }
};

app.all("/*", handler);
app.all("/", handler);

const server = app.listen(port, host, () => {
    console.log(`server started at http://${host}:${port}`);
});

const shutdown = () => {
    server.close(() => {
        console.log("server stopped");
    });
};

process.on("SIGHUP", shutdown);
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
