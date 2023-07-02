
function createPost(message) {
    ////remove the space from the pageToken , git is blocking the token if uploaded without them
    let pageAccessToken;
    const pageId = '105339992616345';

    $.ajax({
        url: 'http://localhost:3000/fb',
        type: 'GET',
        success: function(response) {
            pageAccessToken = String(response);
            console.log('pageAccessToken', pageAccessToken);
    $.ajax({

        url: `https://graph.facebook.com/v13.0/${pageId}/feed`,
        method: 'POST',
        data: {
            message: message,
            access_token: pageAccessToken
        },
        success: function(response) {
            console.log('Post created successfully', response);

        },
        error: function(error) {
            console.error('Error creating post:', error);
            console.log('Error creating post'+error.responseText);
        }
    });
        }
    })

}



