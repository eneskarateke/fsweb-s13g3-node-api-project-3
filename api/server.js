const express = require("express");
const middleware = require("./middleware/middleware");
const server = express();
const usersRouter = require("./users/users-router");
// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın

server.use(express.json());

server.use("/api/users", usersRouter);

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir
server.use(middleware.logger);

server.get("/", (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

server.use("/api/users", usersRouter);

module.exports = server;
