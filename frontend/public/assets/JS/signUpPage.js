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
            url: 'http://localhost:3000/auth/register',
            type: 'POST',
            data: JSON.stringify(user),
            contentType: 'application/json',
            success: function(response) {
                if (response) {
                    var successMessage = document.createElement('div');
                    successMessage.textContent = 'Sign up successful!';
                    successMessage.classList.add('success-message');
                    document.body.appendChild(successMessage);

                  const userWithoutPassword = {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    orders: user.orders,
                    isAdmin: user.isAdmin
                  };

                  localStorage.setItem("user", JSON.stringify(userWithoutPassword));

                    setTimeout(function () {
                        window.location.href = '../index.html';
                    }, 5000);
                }
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
