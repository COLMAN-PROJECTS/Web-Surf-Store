const picker = new EmojiButton();
var socket = io();
const clientInput = $('#client-chat-input');
$(document).ready(() => {
  insertEmoji();
});

socket.on('connect', function () {
  console.log('Connected to the server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});

function insertEmoji() {
  picker.on('emoji', emoji => {
    $('#client-chat-input').val($('input').val() + emoji);
  });

  $('#emoji-btn').on('click', () => {
    picker.togglePicker($('#emoji-btn').get(0)); // Using .get(0) to get the raw DOM element
  });
}

$('#chat-btn').on('click', () => {
  $('#chat-pop-up').toggleClass('show');
})

function sendMessage(message) {
  if (message.trim() !== '') {
    socket.emit('message', message);
  }
}



$('#client-submit').on('click', () => {
  processUserInput();
});
clientInput.on('keyup', (event) => {
    if (event.which === 13) {
        processUserInput();
    }
});


function processUserInput() {
  let userInput = clientInput.val();
  addMessage('out-msg', userInput);
  sendMessage(userInput);
  clientInput.val('');
}


socket.on('message', function (msg) {
  addMessage('income-msg',msg);
});


function addMessage(from,message) {
  let msgClass = from === 'income-msg' ? 'msg' : 'my-msg';
  let avatarUrl = from === 'income-msg' ? 'https://api.dicebear.com/6.x/thumbs/svg' : 'https://api.dicebear.com/6.x/adventurer/svg';
  let messageToChat =
    `<div class="${from}">
    <h6 class="time-msg">${getCurrentTime()}</h6>
    <span class="${msgClass}">${message}</span>
    <img src="${avatarUrl}" class="avatar">
    </div>`;
  $('.chat-area').append(messageToChat);
}
function getCurrentTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var time = hours + ':' + minutes + ' ' + ampm;

  var month = now.toLocaleString('default', {month: 'short'});
  var day = now.getDate();
  var year = now.getFullYear();

  var formattedDate = month + ' ' + day + ', ' + year;
  var dateTime = time + ' | ' + formattedDate;

  return dateTime;
}
