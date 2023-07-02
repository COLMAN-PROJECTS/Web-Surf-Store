
$(document).ready(function () {
  $("#login").click(function () {
    const popup = window.open("", "Login Popup", "width=600,height=500");
    const popupContent = `
      <html>
        <head>
          <title>Login</title>
          <link rel="stylesheet" type="text/css" href="/frontend/public/assets/CSS/login.css">
          <style class="body,popup-container" >
          </style>
        </head>
        <body class="body">
          <div class="popup-container">
            <h2 class="popup-title">Login</h2>
            <form id="login-form" class="popup-form">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required>
              <br>
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required>
              <div id="message-container" style="color: red"></div>
              <br>
              <button id="Enter" type="submit">Enter</button>
              <button class="buttons" id="signUpButton" type="submit" style="background-color: #3b86c4">Sign Up</button>
            </form>
          </div>
          <script src"bcrypt.js"></script>
        </body>
      </html>`;

    popup.document.write(popupContent);
    popup.document.close();

    $(popup.document).find('#Enter').click(function (event) {
      event.preventDefault();
      var enteredEmail = $(popup.document).find("#email").val();
      var enteredPassword = $(popup.document).find("#password").val();

      $.ajax({
        url: "http://localhost:3000/auth/loginReq",
        dataType: "json",
        type: "POST",
        data: {
          email: enteredEmail,
          password: enteredPassword
        },
        success: function (response) {

          var userData = response;

          console.log("userData: " + userData);

            var messageContainer = $(popup.document).find("#message-container");
            messageContainer.html("<p>Login successful!</p>");

            const userWithoutPassword = {
              _id: userData._id,
              fullName: userData.fullName,
              email: userData.email,
              phone: userData.phone,
              address: userData.address,
              orders: userData.orders,
              isAdmin: userData.isAdmin
            };

            localStorage.setItem("user", JSON.stringify(userWithoutPassword));
            console.log("user: " + localStorage.getItem("user"));
            btnOrganized();

            setTimeout(function () {
              popup.close();
            }, 2000);


          $(popup.document).find("#email").val("");
          $(popup.document).find("#password").val("");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error fetching user data: " + errorThrown);
          var messageContainer = $(popup.document).find("#message-container");
          messageContainer.html("<p>Login failed: Wrong email or password!</p>");
        }
      });
    });
    $(popup.document).find("#signUpButton").click(function (event) {
      event.preventDefault();
      popup.close();
      //go to diffrent html page
      window.location.href = "./public/signUpPage.html";
    })

    function btnOrganized() {
      let isLogin = localStorage.getItem('user') !== null;
      if (isLogin) {
        $('#login').hide();
        $('#logOut').show().click(function () {
          localStorage.removeItem('user');
          $('#login').show();
          $('#logOut').hide();
          $('#managerBtn').hide();
          $('#clientBtn').hide();
        });
        if (JSON.parse(localStorage.getItem('user')).isAdmin) {
          $('#managerBtn').show();
          $('#clientBtn').hide();
        } else {
          $('#managerBtn').hide();
          $('#clientBtn').show();
        }
      } else {
        $('#logOut').hide();
        $('#managerBtn').hide();
        $('#clientBtn').hide();
      }
    }
  });
});
