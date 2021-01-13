

// let's go!
const cookieParser = require('cookie-parser')
require("dotenv").config({ path: "variables.env" });
const express = require("express");
const createServer = require("./createServer");
const cors = require("cors");
const db = require("./db");
const bodyParser = require("body-parser");
const bodyParserGql = require("body-parser-graphql");

const app = express();
app.use(cors());

const server = createServer();

// decode jwt 
server.express.use((req, res, next) => {
  // const {token} = req.cookies
  console.log(req.cookies);
  next() 
  
})
// server.express.use(express.json());
// server.express.use(express.urlencoded({ extended: false }));
server.express.use(bodyParser.json());
// server.express.post("/graphql", bodyParserGql.graphql);
server.express.post("/graphql", bodyParserGql.graphql);
server.express.use(cookieParser());
server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
      // allowedHeaders: [
      //   "Content-Type",
      //   "Content-Length",
      //   "Authorization",
      //   "Accept",
      //   "X-Requested-With",
      //   "x-access-token",
      // ],
    },
  },
  (deets) => {
    console.log(`server is now running on port ${deets.port}`);
  }
);
