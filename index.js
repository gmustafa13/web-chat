const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require('./dataBase');
const cors = require('cors')
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
const server = require('http').Server(app);
const io = require('socket.io')(server);
const passport = require("passport")
const flash = require('express-flash');
const session = require('express-session');
app.use(cors())
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}
const port = process.env.port || 3000;
const userController = require('./controller/userController');

const initializePassport = require('./passport.config');


/**
 * middle wear use
 */
app.use(express.urlencoded({
  extended: false
}))
app.use(bodyParser.json());
app.set('view-engine', 'ejs');
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
initializePassport(passport)

app.use(userController)







app.get('/', (req, res) => {
  res.render('massage.ejs')
})
app.get('/login', (req, res) => {
  res.render('login.ejs')
})
app.get('/signup', (req, res) => {
  res.render('signup.ejs')
})

io.sockets.on('connection', function (socket) {
  socket.on('username', function (username) {
    socket.username = username;
    io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
  });

  socket.on('disconnect', function (username) {
    io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
  })

  socket.on('chat_message', function (message) {
    io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
  });
  socket.on('private message', (from, msg) => {
    io.emit("private massage"+msg+ "sended by "+from)
    console.log('I received a private message by ', from, ' saying ', msg);
  });

});


// app.listen(port, () => {
//     console.log("listening on port "+port)
// })
server.listen(3000, function () {
  console.log('listening on *:3000');
});