$(document).ready(function() {
    $("#login").click(function() {
        const popup = window.open("", "Login Popup", "width=600,height=500");
        const popupContent = `
      <html>
        <head>
          <title>Login</title>
          <link rel="stylesheet" type="text/css" href="/frontend/public/assets/CSS/login.css">
          <style class="body,popup-container" >
          </style>
        </head>
        <body>
          <div class="popup-container">
            <h2 class="popup-title">Login</h2>
            <form id="login-form" class="popup-form">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required>
              <br>
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required>
              <br>
              <button id="Enter" type="submit">Enter</button>
              <button class="buttons" id="signUpButton" type="submit" style="background-color: #3b86c4">Sign Up</button>
            </form>
          </div>
        </body>
      </html>`;

        popup.document.write(popupContent);
        popup.document.close();

        $(popup.document).find("#Enter").click(function(event) {
            event.preventDefault();
            var enteredEmail = $(popup.document).find("#email").val();
            var enteredPassword = $(popup.document).find("#password").val();

            $.ajax({
                url: "./DB/UserSeed.json",
                dataType: "json",
                type: "POST",
                data: {
                    email: enteredEmail,
                    password: enteredPassword
                },
                success: function(userData) {
                    var loggedInUser = userData.find(user => user.email === enteredEmail
                                                    && user.password === enteredPassword);

                    if (loggedInUser) {
                        alert("Login successful!");
                        popup.close();
                    } else {
                        popup.alert("Login failed! Wrong password or email!");
                    }

                    $(popup.document).find("#email").val("");
                    $(popup.document).find("#password").val("");
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Error fetching user data: " + errorThrown);
                }
            });
        });
        $(popup.document).find("#signUpButton").click(function(event) {
            event.preventDefault();
            popup.close();
            //go to diffrent html page
            window.location.href = "./public/signUpPage.html";
        })
    });
});
