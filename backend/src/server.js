const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const server = express();

mongoose.connect(
  "mongodb+srv://cassiel123:cassiel123@mernstack1-lh5nf.mongodb.net/week08?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(5000);
