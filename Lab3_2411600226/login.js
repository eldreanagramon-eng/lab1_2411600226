console.log('login.js loaded successfully!');

document.addEventListener('DOMContentLoaded', function() {

    console.log('DOM fully loaded');

    // Check if already logged in
    if (localStorage.getItem('loggedInUser')) {
        console.log('User already logged in, redirecting...');
        window.location.href = 'dashboard.html';
        return;
    }

    // Get the login button
    const loginBtn = document.getElementById('loginBtn');
    console.log('Login button found:', loginBtn);

    if (!loginBtn) {
        console.error('ERROR: loginBtn not found! Check the button ID.');
        return;
    }

    // Add click event
    loginBtn.addEventListener('click', function() {
        console.log('Login button clicked!');

        // Get values
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        console.log('Username entered:', username);
        console.log('Password entered:', password);

        // Check credentials
        if (username === 'admin' && password === 'password123') {
            console.log('✅ LOGIN SUCCESSFUL!');
            localStorage.setItem('loggedInUser', username);
            localStorage.setItem('userName', 'Alex Johnson');
            window.location.href = 'dashboard.html';
        } else {
            console.log('❌ LOGIN FAILED!');
            const alert = document.getElementById('loginAlert');
            alert.classList.remove('d-none');
            setTimeout(function() {
                alert.classList.add('d-none');
            }, 3000);
            document.getElementById('password').value = '';
        }
    });

    // Allow Enter key to trigger login
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });

    document.getElementById('username').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });

});