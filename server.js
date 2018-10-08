const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const port = 8080;

let sessions = [];

app.get('/start/:username', (req, res) => {
  const id = sessions.length;
  const username = req.params.username;
  const namespace = io.of('/'+ id);
  
  namespace.on('connection', (socket) => {
    let userid = sessions[id].users.length;
    console.log(sessions.length);
    socket.on('new user', (username) => {
      sessions[id].users.push(username);
      namespace.emit('new user', username);
      socket.emit('stage', sessions[id].stage);
    });

    socket.on('get users', () => {
      socket.emit('users', sessions[id].users)
    }); 

    socket.on('get votes', () => {
      socket.emit('votes', sessions[id].stories[0].votes);
    });

    socket.on('vote', vote => {
      sessions[id].stories[0].votes.set(vote.username, vote.mark);

      if(sessions[id.stories[0].votes.size == sessions[id].users.length])
        namespace.emit('last vote');

      namespace.emit('vote', vote);
    });

    socket.on('new story', text => {
      session[id].stories.unshift({text: text, votes: new Map});
      namespace.emit('new story', text);
    });
    socket.on('disconnect', function () {
      console.log('disconnect');
      namespace.emit('user disconnected', sessions[id].users[userid]);
      sessions[id].users.splice(userid, 1);
    });
  });

  let session = {
    creator: username,
    users: [],
    stories: [],
    namespace: namespace,
    stage: 1
  };
  sessions[id] = session;
  res.send('' + id);
});



// START LISTENING

server.listen(port, () => `Server running on port ${port}`);


// SOCKET CONNECTION HANDLERS

