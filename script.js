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





document.getElementById('searchButton').addEventListener('click', function() {
    const characteristic = document.getElementById('searchInput').value.trim().toLowerCase();
    if (characteristic === '') {
        alert('Please enter a characteristic to search for.');
        return;
    }

    // Fetch breeds from the API
    fetch('https://api.thecatapi.com/v1/breeds', {
        headers: {
            'x-api-key': 'live_adQyIckx7rn5a035zLj8hKeolELrWubK60jqAXW6Yv49tCfnPqOje50rTGr1R2gs'
        }
    })
    .then(response => response.json())
    .then(breeds => {
        // Filter breeds by characteristic
        const matchingBreeds = breeds.filter(breed => {
            if (breed.temperament) {
                const temperaments = breed.temperament.toLowerCase().split(',').map(t => t.trim());
                return temperaments.includes(characteristic);
            }
            return false;
        });

        if (matchingBreeds.length === 0) {
            alert('No breeds found with that characteristic.');
            return;
        }

        // Store results in local storage
        localStorage.setItem('searchResults', JSON.stringify(matchingBreeds));

        // Display results
        displaySearchResults(matchingBreeds);
    })
    .catch(error => {
        console.error('Error fetching breeds:', error);
    });
});

// Function to display search results
function displaySearchResults(breeds) {
    const searchResultsRow = document.getElementById('searchResultsRow');
    searchResultsRow.innerHTML = ''; // Clear previous results

    breeds.forEach(breed => {
        // Fetch image for the breed
        fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`, {
            headers: {
                'x-api-key': 'live_adQyIckx7rn5a035zLj8hKeolELrWubK60jqAXW6Yv49tCfnPqOje50rTGr1R2gs'
            }
        })
        .then(response => response.json())
        .then(images => {
            const imageUrl = images.length > 0 ? images[0].url : 'https://via.placeholder.com/200';

            // Create card element
            const colDiv = document.createElement('div');
            colDiv.classList.add('col-lg-4', 'col-md-6', 'mb-4');

            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const img = document.createElement('img');
            img.src = imageUrl;
            img.classList.add('card-img-top');
            img.alt = breed.name;

            const cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = breed.name;

            const cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.textContent = breed.temperament;

            cardBodyDiv.appendChild(cardTitle);
            cardBodyDiv.appendChild(cardText);

            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBodyDiv);

            colDiv.appendChild(cardDiv);

            searchResultsRow.appendChild(colDiv);
        })
        .catch(error => {
            console.error('Error fetching breed image:', error);
        });
    });
}

// On page load, check if there are search results in local storage
document.addEventListener('DOMContentLoaded', function() {
    const storedResults = localStorage.getItem('searchResults');
    if (storedResults) {
        const breeds = JSON.parse(storedResults);
        displaySearchResults(breeds);
    }
});

document.addEventListener('DOMContentLoaded', function() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const navLogin = document.getElementById('navLogin');
        const navSignup = document.getElementById('navSignup');
        const navLogout = document.getElementById('navLogout');

        if (isLoggedIn === 'true') {
            navLogin.style.display = 'none';
            navSignup.style.display = 'none';
            navLogout.style.display = 'block';
        } else {
            navLogin.style.display = 'block';
            navSignup.style.display = 'block';
            navLogout.style.display = 'none';
        }

        document.getElementById('logoutLink').addEventListener('click', function() {
            localStorage.setItem('isLoggedIn', 'false');
            alert('You have been logged out.');
            window.location.href = 'home.html';
        });
    });