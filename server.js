/*require('dotenv').config()
const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const session = require('express-session')
const { createServer } = require('node:http');
const { join } = require(`node:path`);
const { Server } = require(`socket.io`)

const indexRouter = require('./routes/index')

const port = process.env.PORT || 3000

const app = express()
//app.use(express.json())
const server = createServer(app);
const io = new Server(server);

nunjucks.configure('views', {
  autoescape: true,
  express: app,
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.use(
session({
    secret: "väldigttrevligt",
    resave: false,
    saveUninitialized: true,
    cookie: {sameSite: true},
  })
)

app.use((req, res, next) => {
  res.locals.url = req.originalUrl
  next()
})

app.use('/', indexRouter)
*/
require('dotenv').config()
const express = require('express');
const { createServer } = require('node:http');
const { join } = require(`node:path`);
const { Server } = require(`socket.io`)
const session = require(`express-session`);
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks')

const indexRouter = require('./routes/index')

const port = process.env.PORT || 3000

const app = express();
app.use(express.json())
const server = createServer(app);
const io = new Server(server);

nunjucks.configure('views', {
  autoescape: true,
  express: app,
})

app.use(
  session({
      secret: "väldigttrevligt",
      resave: false,
      saveUninitialized: true,
      cookie: {sameSite: true},
    })
  )

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));



io.on('connection', (socket) => {

    socket.on('chat message', (msg) => {
      
      console.log('message: ' + msg);
    });
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });

  });


  app.use((req, res, next) => {
    res.locals.url = req.originalUrl
    next()
  })
  

  app.use('/', indexRouter)

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});