$(document).ready(function () {


    // function addSenderMessage(message) {
    //     var senderMessage = $('<div class="media w-50 mb-3"><img src="avatar_usae7z.svg" alt="user" width="50" class="rounded-circle"><div class="media-body ml-3"><div class="bg-light rounded py-2 px-3 mb-2"><p class="text-small mb-0 text-muted">' + message + '</p></div><p class="small text-muted">' + getCurrentTime() + '</p></div></div>');
    //     $('#chat-box').append(senderMessage);
    // }
    //
    // function addReceiverMessage(message) {
    //     var receiverMessage = $('<div class="media w-50 ml-auto mb-3"><div class="media-body"><div class="bg-primary rounded py-2 px-3 mb-2"><p class="text-small mb-0 text-white">' + message + '</p></div><p class="small text-muted">' + getCurrentTime() + '</p></div></div>');
    //     $('#chat-box').append(receiverMessage);
    // }


    function getCurrentTime() {
        var currentDate = new Date();
        var hours = currentDate.getHours();
        var minutes = currentDate.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var currentTime = hours + ':' + minutes + ' ' + ampm;
        return currentTime;
    }


    $('#button-addon2').on('click', function () {
        var message = $('#messageInput').val();
        sendMessage(message);
    });



    function displayMessage(sender, content, timestamp) {
        var messageItem = `
      <a class="list-group-item list-group-item-action text-white rounded-0">
        <div class="media">
          <img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle">
          <div class="media-body ml-4">
            <div class="d-flex align-items-center justify-content-between mb-1">
              <h6 class="mb-0">${sender}</h6>
              <small class="small font-weight-bold">${timestamp}</small>
            </div>
            <p class="font-italic mb-0 text-small">${content}</p>
          </div>
        </div>
      </a>
    `;

        $(".list-group").append(messageItem);
    }


    function sendMessage() {
        var messageInput = $("#messageInput");
        var message = messageInput.val();
        messageInput.val("");


        var timestamp = new Date().toLocaleString();


        displayMessage("You", message, timestamp);

        // Simulate a response (replace this with your own logic)
        var response = "This is a sample response from the server.";
        var responseTimestamp = new Date().toLocaleString();

        setTimeout(function () {
            displayMessage("Bot", response, responseTimestamp);
        }, 2000);
    }


    $("form").submit(function (e) {
        e.preventDefault();
        sendMessage();
    });

});
