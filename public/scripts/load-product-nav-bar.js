// loads product-nav-bar.html into element with ID 'category-nav'
    fetch('product-nav-bar.html')
        .then(response => response.text())
        .then(data => {
            const headerContainer = document.getElementById('category-nav');
            headerContainer.innerHTML = data;
        })
        .catch(error => console.error('Error loading nav-ba:', error));
