const http = require('http');
const app = require('./app');

const port = 3000;

const server = http.createServer(app);

console.log(process.env.DB_NAME)

server.listen(port);