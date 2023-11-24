// loads header.html into element with ID 'header-container'
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            const headerContainer = document.getElementById('header-container');
            headerContainer.innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
