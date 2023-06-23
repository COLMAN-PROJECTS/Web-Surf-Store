$(document).ready(function() {
    $('#signup-form').submit(function(event) {
        event.preventDefault(); // Prevent page reload

        // Get form data
        const fullName = $('#fullName').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const address = $('#address').val();
        const phoneNumber = $('#phoneNumber').val();

        // Create user object
        const user = {
            fullName,
            email,
            password,
            address,
            phoneNumber
        };

        $.ajax({
            url: '/createUser',
            type: 'POST',
            data: user,
            success: function(response) {
                alert('Sign up successful!');

                window.location.href = '../index.html';
            },
            error: function(error) {
                alert('Sign up failed. Please try again.');
            }
        });
    });
});
