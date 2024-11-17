function login() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username);
        document.getElementById('loginStatus').innerText = `Logged in as ${username}`;
    }
}

function logout() {
    localStorage.removeItem('username');
    document.getElementById('loginStatus').innerText = 'Logged out';
}

function toggleMode() {
    let currentMode = localStorage.getItem('mode') || 'light';
    currentMode = currentMode === 'light' ? 'dark' : 'light';
    localStorage.setItem('mode', currentMode);
    applyMode(currentMode);
}

function applyMode(mode) {
    document.body.className = mode;
    document.querySelector('.header-section').className = `header-section ${mode}`;
    document.querySelector('footer').className = `footer ${mode}`;
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.remove('light', 'dark');
        navbar.classList.add(mode); 
    }

    document.querySelectorAll('.navbar a').forEach(navLink => {
        navLink.classList.remove('light', 'dark');
        navLink.classList.add(mode); 
    });

    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('light', 'dark'); 
        card.classList.add(mode); 
    });

    document.querySelectorAll('.list-group-item').forEach(item => {
        item.classList.remove('light', 'dark');
        item.classList.add(mode);
    });
}




window.onload = function() {
    const savedMode = localStorage.getItem('mode') || 'light';
    applyMode(savedMode);

    const storedUser = localStorage.getItem('username');
    if (storedUser) {
        document.getElementById('loginStatus').innerText = `Logged in as ${storedUser}`;
    }
}
