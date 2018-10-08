import io from 'socket.io-client';

let socket;

function openSocket(id){
  socket = io('http://localhost:8080/' + id);
 };

function sEmitNewUser(username) {
  socket.emit('new user', username);

};
function sEmitGetUsers() {
  socket.emit('get users');
};
function sEmitGetHistory() {
  socket.emit('get history');
};
function sOnUsers(cb){
  socket.on('users', cb)
};
function sOnStage(cb){
  socket.on('stage', cb);
};
function sOnVotes(cb){
  socket.on('votes', cb);
};
function sOnNewUser(cb){
  socket.on('new user', cb);
};
function sOnVote(cb){
  socket.on('vote', cb);
};
function sOnHistory(cb){
  socket.on('history', cb)
};
function sOnStory(cb){
  socket.on('story', cb)
};
function sOnUserDisconnected(cb){
  socket.on('user disconnected', cb);
}

export default socket;
export {
  openSocket, sEmitNewUser, sOnStage,
  sEmitGetUsers, sOnUsers, sOnVote,
  sOnNewUser, sOnVotes, sEmitGetHistory,
  sOnHistory, sOnStory, sOnUserDisconnected};
