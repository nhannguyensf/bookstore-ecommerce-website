// designed to get the product type from the url and use it to query the database to populate the filter page

// Helper functions
function toTitleCase(input) {
  // Splitting the string into words
  const words = input.replace(/([A-Z])/g, ' $1').split(' ');

  // Capitalizing the first letter of each word and joining them back together
  const titleCase = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

  return titleCase.trim();
}


let params = (new URL(document.location)).searchParams;
let productType = params.get('type');

fetch('/filter/' + productType)
  .then(response => {
    if (response.ok)
      return response.json();
    else
      throw new Error('Product not found');
  })
  .then(data => {
    const productGrid = document.querySelector('.product-display-grid');
    productGrid.innerHTML = "";

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
    console.log("Error: ", error);
    // Handle errors here
  });

/*
          <div className="item-display">
            <img
              src="images/products/gameOfThrones.png"
              alt="Game of Thrones"
            />
            <h2>Game of Thrones</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Lorem ipsum dolor sit amet, Vivamus
              consectetur.
            </p>
            <h3>$xx.xx</h3>
          </div>
*/
