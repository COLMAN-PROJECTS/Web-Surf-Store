var socket = io();
socket.on('connect', function () {
    console.log('Connected to the server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from the server');
});

    function addReceiverMessage(message) {
        var receiverMessage = `<div class="media w-50 mb-3"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle">
        <div class="media-body ml-3">
            <div class="bg-light rounded py-2 px-3 mb-2">
                <p class="text-small mb-0 text-muted">${message}</p>
            </div>
            <p class="small text-muted">${getCurrentTime()}</p>
        </div>
    </div>`;

        $('#chat-box').append(receiverMessage);
    }


    function addSenderMessage(message) {
        var senderMessage = `<div class="media w-50 ml-auto mb-3">
        <div class="media-body">
            <div class="bg-primary rounded py-2 px-3 mb-2">
                <p class="text-small mb-0 text-white">${message}</p>
            </div>
            <p class="small text-muted">${getCurrentTime()}</p>
        </div>
    </div>`;

        $('#chat-box').append(senderMessage);
    }

    function sendMessage(message) {
        if (message.trim() !== '') {
            addSenderMessage(message);
            socket.emit('message', message);
        }
    }


    $('#messageForm').submit(function (e) {
        e.preventDefault();
        var message = $('#messageInput').val();
        sendMessage(message);
        $('#messageInput').val('');
    });

    socket.on('message', function (msg) {
        addReceiverMessage(msg);

    });

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


