require("dotenv").config();

require("./database/dbconnection")
const express = require("express");

const cors = require("cors");

const router = require("./routes/routes");

const server = express();

server.use(cors());

server.use(express.json());

server.use(router)
server.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => {
  console.log(`Successfully running the port ${PORT}`);
});
