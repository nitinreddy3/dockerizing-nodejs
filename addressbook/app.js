import express from 'express';
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import debug from 'debug';
import http from 'http';
import { fileURLToPath } from 'url';
import indexRouter from './routes/index.js';
import personsRouter from './routes/persons.js';
import usersRouter from './routes/users.js';

const app = express();

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/persons', personsRouter);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
export default app;
