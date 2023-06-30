$(document).ready(function() {
  $('#chatIcon').click(function() {
    $.ajax({
      url: 'http://localhost:3000/chat',
      method: 'POST',
      success: function(response) {
        console.log('Chat started successfully');
      },
      error: function(xhr, status, error) {
        console.log('Error starting chat:', error);
        alert('Error starting chat:'+ error);
      }
    });
  });
});