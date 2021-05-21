# Simplest mock server
A very simple mock HTTP server which only does the following: 

1. Receive request sent to any path and method
2. Print request body, header, url, query parameters, etc
3. Respond with a fixed status code

You can use this server when you just want to check what request your client sents.

## Install
**Prerequisites**: You must install Node.js and npm before installation.

You can install this project from npm.

```sh
npm install -g simplest-mock-server
```

## Usage
You can run a mock server with port number 3000 and a fixed response code `200` by the following command:

```sh
simplest-mock-server --port 3000 --status 200
```

To see other options, use `-h` option.

```sh
simplest-mock-server -h
```
