//var socket = io.connect('http://localhost:3000', { 'forceNew': true });
var socket = io();

socket.on('messages', function(data) {
  console.log(data);
  render(data);
})

function render (data) {
  var html = data.map(function(elem, index) {
    return(`<div class="well well-sm">
      <strong>${elem.author}</strong>:
      <em>${elem.text}</em>
      </div>`);
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
  }

  function addMessage(e) {
    var atr = document.getElementById('username').value;
    var txt = document.getElementById('texto').value;

    if (atr == '' || txt == '' ) return false;

    var message = {
      author: atr,
      text: txt
    };
    document.getElementById("username").value="";
    document.getElementById("texto").value="";
    socket.emit('new-message', message);
    return false;
  }
