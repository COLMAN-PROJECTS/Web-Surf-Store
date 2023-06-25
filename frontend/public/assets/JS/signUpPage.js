$(document).ready(function() {
    $('#signup-form').submit(function(event) {
        event.preventDefault();

        const fullName = $('#fullName').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const address = $('#address').val();
        const phoneNumber = $('#phoneNumber').val();

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
                var successMessage = document.createElement('div');
                successMessage.textContent = 'Sign up successful!';
                successMessage.classList.add('success-message');
                document.body.appendChild(successMessage);

                setTimeout(function() {
                    window.location.href = '../index.html';
                }, 5000);
            },
            error: function(error) {
                var successMessage = document.createElement('div');
                successMessage.textContent = 'Sign up failed. Please try again.';
                successMessage.classList.add('success-message');
                document.body.appendChild(successMessage);
            }
        });
    });
});
