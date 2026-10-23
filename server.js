const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");

server.use(jsonServer.defaults()); // CORS is included
server.use(router);

server.listen(process.env.PORT || 4000, () => console.log("running"));
