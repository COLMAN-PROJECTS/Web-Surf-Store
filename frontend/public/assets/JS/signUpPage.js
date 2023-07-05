$(document).ready(function() {
    $('#signup-form').submit(function(event) {
        event.preventDefault();

        const fullName = $('#fullName').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const address = $('#address').val();
        const phone = $('#phoneNumber').val();

        const user = {
            email,
            password,
            phone,
            fullName,
            address,
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
                    email: user.email,
                    phone: user.phone,
                    isAdmin: user.isAdmin,
                    fullName: user.fullName,
                    address: user.address,
                    orders: user.orders
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
