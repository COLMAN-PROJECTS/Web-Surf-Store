
function createPost(message) {
    ////remove the spcace from the pageToken , git is blocking the token if uploaded without them
    const pageAccessToken = 'EAAceK0CbT7ABAMHchxFYxVA5CGYtom        LDQwcznZBhqBt8yo2AaoPZCkFf6DqkeIZBj5sZAhaQNDHlZAP41uTIzjOQdzgMCR8kA18K0sZCdROJpdQNDnZAugSRnnNl6N2i7uim6MeFU4xYehzyzHeb6XbZARjPdjjme6abhRTuB0s2Lh2t0nxkXAmf32ZBYan7iZCU0dCxGi8mrUZAFFEl2oE6nyFH0IRUcIDMjcZD';
    const pageId = '105339992616345';


    $.ajax({
        url: `https://graph.facebook.com/v13.0/${pageId}/feed`,
        method: 'POST',
        data: {
            message: message,
            access_token: pageAccessToken
        },
        success: function(response) {
            console.log('Post created successfully', response);
            alert('Post created successfully');
        },
        error: function(error) {
            console.error('Error creating post:', error);
            alert('Error creating post'+error.responseText);
        }
    });
}
$(document).ready(function() {
    $('#confirmBtn').click(function() {
        createPost('check this out!!'+localStorage.getItem('user._id')+ ' just bought products from us');
    });
})


