// designed to populate the featured items section on the homepage with items from the `Products` table
// that are marked as true (1).

// Helper function
function toTitleCase(input) {
  // Splitting the string into words
  const words = input.replace(/([A-Z])/g, ' $1').split(' ');

  // Capitalizing the first letter of each word and joining them back together
  const titleCase = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

  return titleCase.trim();
}

// Featured Products Banner
const header = document.createElement('h1');
header.classList.add('banner');
header.innerText = 'Featured Products';


// Create Grid Display
// Create product-display-grid div
const productDisplayDivGrid = document.createElement('div');
productDisplayDivGrid.className = "product-display-grid";


// Fetch featured products
fetch('/api/featuredProducts')
  .then(response => response.json())
  .then(data => {
    const featuredDiv = document.querySelector('.featured-product-section'); // Fetching div via class instead of id

    featuredDiv.appendChild(header);
    featuredDiv.appendChild(productDisplayDivGrid)
    data.forEach(product => {

      // Create new elements
      const productDiv = document.createElement('div');
      productDiv.className = "featured-item";

      const productLink = document.createElement('a');
      productLink.href = "product-page.html"; // adjust this as necessary

      const productImg = document.createElement('img');
      productImg.src = `images/products/${product.imgName}.png`; // adjust this as necessary
      productImg.alt = product.name;

      const productCreator = document.createElement('h2');
      productCreator.innerText = product.creator;

      const productName = document.createElement('h3');
      productName.innerText = toTitleCase(product.name)


      // Append everything to productDiv
      productLink.appendChild(productImg);
      productLink.appendChild(productCreator);
      productLink.appendChild(productName);
      productDiv.appendChild(productLink);

      // Append productDiv to featuredDiv
      productDisplayDivGrid.appendChild(productDiv);
    });
  })
  .catch(error => console.error('Error:', error));

featuredDiv.appendChild(productDisplayDiv);

/*
<h1 className="banner">Featured Products</h1>
<div className="product-display-grid">

// for each product:
  <div className="featured-item">
    <a href="product-page.html">
      <img
        src="images/products/critiqueOfPureReason.jpg"
        alt="Critique of Pure Reason"
      />
      <h2>Immanuel Kant</h2>
      <h3>Critique of Pure Reason</h3>
    </a>
  </div>
*/
