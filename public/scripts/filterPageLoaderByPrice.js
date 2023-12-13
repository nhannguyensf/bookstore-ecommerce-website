// Helper functions
function toTitleCase(input) {
  // Splitting the string into words
  const words = input.replace(/([A-Z])/g, ' $1').split(' ');

  // Capitalizing the first letter of each word and joining them back together
  const titleCase = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

  return titleCase.trim();
}

// Function to handle filter link click
function handleFilterLinkClick(event) {
  event.preventDefault(); // Prevent default navigation behavior

  const productPrice = parseFloat(this.getAttribute('data-price'));
  console.log(productPrice);

  fetch('/filter/price/' + productPrice)
    .then(response => {
      if (response.ok)
        return response.json();
      else
        throw new Error('Product not found');
    })
    .then(data => {
      const productGrid = document.querySelector('.product-display-grid');
      productGrid.innerHTML = '';

      data.forEach(product => {
        const itemDisplay = document.createElement('div');
        itemDisplay.classList.add('item-display');

        const link = document.createElement('a');
        link.href = `product-page.html?productName=${encodeURIComponent(product.name)}`;

        const img = document.createElement('img');
        img.src = `images/products/${product.imgName}.png`;
        img.alt = product.name;

        const h2 = document.createElement('h2');
        h2.textContent = toTitleCase(product.name);
        link.appendChild(img);
        link.appendChild(h2);

        const p = document.createElement('p');
        p.textContent = product.description;

        const h3 = document.createElement('h3');
        h3.textContent = `$${product.price}`;

        itemDisplay.append(link, p, h3);

        productGrid.appendChild(itemDisplay);
      });
    })
    .catch((error) => {
      console.log('Error: ', error);
      const errorElement = document.createElement('p');
      errorElement.textContent = 'An error occurred while fetching data. Please try again later.';
      document.body.appendChild(errorElement);
    });
}

// Get all filter links and attach onclick event listeners
document.addEventListener('DOMContentLoaded', () => {
  const filterLinks = document.querySelectorAll('.filter-link');
  filterLinks.forEach(filterLink => {
    filterLink.addEventListener('click', handleFilterLinkClick);
  });
});
