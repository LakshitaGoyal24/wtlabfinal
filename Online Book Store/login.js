function validateLoginForm() {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            if (username === "" || password === "") {
                document.getElementById("error-message").style.display = "block";
                return false;
            }
            if (username === "user" && password === "password123") {
                alert("Login successful!");
            } else {
                document.getElementById("error-message").style.display = "block";
            }

            return false; 
        }

        function validateForgotPasswordForm() {
            const email = document.getElementById("email").value;
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return false;
            }
            if (email !== "user@example.com") {
                alert("Email address not associated with any account.");
                return false;
            }

            alert("Password reset link has been sent to your email.");
            return false; 
        }