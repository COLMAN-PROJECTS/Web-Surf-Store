
function createPost(message) {
    const pageAccessToken = 'EAAceK0CbT7ABADcHoG0pWrQCzCK5cdZAVQPaoSIM4impJGJMGKWVogbBKprumtN4TE1ZBZAD3HbjBVxMq2KoAC8EoUvJkthl0FwMZA9ZCyOcBf2m6S35OLanZCqeMrEaTw4I3qpLop9RusBVnuZBsdUxTNbGB0KT5B3v8W0EOoEIgQ5dlH5mFGlT4albj6STviFeuFYSzDGmBJza2ZBJeGiYEmDpPScZCVZCcZD';
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
        createPost('check this out!!'+localStorage.getItem('user')+ ' just bought products from us');
    });
})


