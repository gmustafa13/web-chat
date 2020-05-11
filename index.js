const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require('./dataBase');
const http = require('http').Server(app);
const io = require('socket.io')(http);
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
const port = process.env.port || 3000;
const userController = require('./controller/userController');




/**
 * middle wear use
 */
app.use(express.urlencoded({
  extended: true
}))
app.use(bodyParser.json());
app.use(userController)
app.set('view-engine', 'ejs');






app.get('/', (req, res) => {
    res.render('massage.ejs')
  })
  app.get('/login', (req, res) => {
    res.render('login.ejs')
  })
  app.get('/signup', (req, res) => {
    res.render('signup.ejs')
  })

  io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});


// app.listen(port, () => {
//     console.log("listening on port "+port)
// })
const server = http.listen(3000, function() {
  console.log('listening on *:3000');
});