
function createPost(message) {
    ////remove the spcace from the pageToken , git is blocking the token if uploaded without them
    const pageAccessToken = 'EAAceK0CbT7ABALUod9K  vKu2cIbMAv0UrvIJKhS1dxIHGwpdanK8FFN1ODMXoQQS8IB7v4ZCflXDZAYiPgwf9cNAcUrafGQ1TE7l8Eog1LPuixbL5ZAClQNmZAhZCWKm6SWcMVZCHBlizdynElYtrSymDVJHHqwtIoEoUuinatswBIoPkS2yZC6NSvDZCTr13erj2rrsFPzeBKeZBblklZCZCTIq2NswjN3KmzUZD';
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


