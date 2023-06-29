//appid:  2003495953321904
//appSecret: 166297ff0f1d95b983c6ee154e8ef808
//user accsses token:  EAAceK0CbT7ABAJVQ6IZAAFnRbia2I6MC48RLP1A9UNiWFYaZArbIWMX6OkOZBvn3xObWN3JTROuqUifAn0LdSLgIWqaxEMfdxcnuRVlO300HbjYC76dc1xISNHOKIGQGvr7HwqeE0sm0IBbiKGZAMUz2vOe9MafH7kQYtK4ZB2G2R1TKFvZCzktlzZBj8TeyUFydwSZBKllOPAZDZD
//page access token:   EAAceK0CbT7ABAHYNSTGOzQEinSc0F6XScODZAv4jZCGZAMmkGhfZBhCiLDZCSfudyvT2MB34FiI3c4lkpE92xnam3ksc2ifrraiirwI9MzP3ZBK13eJfbvEwyvooOHnae9TK44k0qJ2SgfaMYUUQ4iDWu5NrKtAliGWHy5uBboyaUfOWwVObOVovuZBruIRb4dJiTrshLBZBvQZDZD
// "name": "Surfing Shop Colman ",
//     "page id": "105339992616345",
//     "tasks": [
//   "ADVERTISE",
//   "ANALYZE",
//   "CREATE_CONTENT",
//   "MESSAGING",
//   "MODERATE",
//   "MANAGE"
// ]


const pageAccessToken = 'EAAceK0CbT7ABAHYNSTGOzQEinSc0F6XScODZAv4jZCGZAMmkGhfZBhCiLDZCSfudyvT2MB34FiI3c4lkpE92xnam3ksc2ifrraiirwI9MzP3ZBK13eJfbvEwyvooOHnae9TK44k0qJ2SgfaMYUUQ4iDWu5NrKtAliGWHy5uBboyaUfOWwVObOVovuZBruIRb4dJiTrshLBZBvQZDZD';

function createPost(message) {
    const pageId = '105339992616345';

    $.ajax({
        url: `https://graph.facebook.com/v13.0/${pageId}/feed`,
        method: 'POST',
        data: {
            message: message,
            access_token: pageAccessToken
        },
        success: function(response) {
            console.log('Post created successfully:', response);
            alert('Post created successfull');
        },
        error: function(error) {
            console.error('Error creating post:', error);

            alert('Error creating post');
        }
    });
}
$(document).ready(function() {
    $('#postButton').click(function() {
        createPost('Check out our new items at the best offer section.');
    });
})

