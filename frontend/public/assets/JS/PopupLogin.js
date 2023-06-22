$(document).ready(function() {
    var popup = null;

    $("#login").click(function() {
        popup = window.open("", "Login Popup", "width=600,height=500");
        const popupContent = `
      <html>
        <head>
          <title>Login</title>
          <link rel="stylesheet" type="text/css" href="/frontend/public/assets/CSS/login.css">
          <style>
            body {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
            }

            .popup-container {
              width: 400px;
              height: 300px;
              background-color: #fff;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="popup-container">
            <h2 class="popup-title">Login</h2>
            <form id="login-form" class="popup-form" onsubmit="login(event)">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required>
              <br>
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required>
              <br>
              <button id="Enter" type="submit">Log in</button>
              <script>
              
              
</script>
            </form>
          </div>
        </body>
      </html>
    `;

        popup.document.write(popupContent);
        popup.document.close();

        $('#Enter').click(function(event) {
            event.preventDefault();

            var enteredEmail = popup.document.getElementById("email").value;
            var enteredPassword = popup.document.getElementById("password").value;

            fetch("./DB/UserSeed.json")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch user data.");
                    }
                    return response.json();
                })
                .then(userData => {
                    var loggedInUser = userData.find(user => user.email === enteredEmail && user.password === enteredPassword);

                    if (loggedInUser) {
                        alert("Login successful!");
                        popup.close();
                    } else {
                        alert("Login failed!");
                    }

                    popup.document.getElementById("email").value = "";
                    popup.document.getElementById("password").value = "";
                })
                .catch(error => {
                    alert("Error fetching user data: " + error.message);
                });
        });
    });
});
