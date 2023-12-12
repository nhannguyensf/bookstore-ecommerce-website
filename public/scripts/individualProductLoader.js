// designed to pull product id which is passed in url
// use id to query database
// populate components of the page using the query data

// Helper functions
function toTitleCase(input) {
  // Splitting the string into words
  const words = input.replace(/([A-Z])/g, ' $1').split(' ');

  // Capitalizing the first letter of each word and joining them back together
  const titleCase = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

  return titleCase.trim();
}

function capitalizeFirstLetter(str) {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const productDisplay = document.getElementById('product-display');
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('productName');

// Fetch product details from the server.
fetch(`/api/product/${encodeURIComponent(productName)}`)
  .then(response => {
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    return response.json();
  })
  .then(product => {
    productDisplay.innerHTML = '';

// create main container
    const mainContainer = document.createElement('div');
    mainContainer.className = 'main-container'

// create the product-container
    const productContainer = document.createElement('div');
    productContainer.className = 'product-container';

// create the product-image div
    let productImageDiv = document.createElement('div');
    productImageDiv.className = "item-picture";
    productImageDiv.innerHTML = `<img class="product-image" src="images/products/${product[0].imgName}.png" />`;

// Append the product-image to product-container
    productContainer.appendChild(productImageDiv);

// create the product-details div
    const productDetailsDiv = document.createElement('div');
    productDetailsDiv.className = "product-details";

// Create the product name div and append to product-details
    const productNameDiv = document.createElement('div');
    productNameDiv.className = "item-name";
    productNameDiv.innerHTML = `<h1>${toTitleCase(product[0].name)}</h1>`;
    productDetailsDiv.appendChild(productNameDiv);

// Process product type and price
    product.forEach((prodItem) => {
      const priceDiv = document.createElement('div');
      priceDiv.className = "item-price";
      priceDiv.innerHTML = `<div class="button-layout">
                    <fieldset class="fieldset-border">
                      <div>
                        <input type="radio" id="${prodItem.type}" value=""${prodItem.type.charAt(0).toUpperCase() + prodItem.type.slice(1)}"" name="format" data-price="${prodItem.price}" />
                        <label for="${prodItem.type}">"${prodItem.type.charAt(0).toUpperCase() + prodItem.type.slice(1)}"</label>
                        <span class="price-display" id="${prodItem.type}-price"></span>
                      </div>
                    </fieldset>
                  </div>`;
      productDetailsDiv.appendChild(priceDiv);
    });

// Create the add to cart button and append to product-details
    const itemCartDiv = document.createElement('div');
    itemCartDiv.className = "item-cart";
    itemCartDiv.innerHTML = `<button type="button" id="addToCartButton">Add to Cart</button>`;
    productDetailsDiv.appendChild(itemCartDiv);

// Append product-details to product-container
    productContainer.appendChild(productDetailsDiv);

// Append product-container to main container
    mainContainer.appendChild(productContainer);

// Append Product description section
    const productDescSection = document.createElement('div');
    productDescSection.className = 'product-description page-format';
    productDescSection.innerHTML = `
    <h2 class="center">Product Overview</h2>
    <div>
      <p><u>Book Description</u></p>
      <p id='book-description'>${product[0].description}</p>
    </div>
    <br />
    <p>ISBN: 923014828832</p>
    <p>Author: ${product[0].creator}</p>`;

// Append productDescSection to main container
    mainContainer.appendChild(productDescSection);

// Append the main container to product-display
    productDisplay.appendChild(mainContainer);
  })
  // ...catch errors.
  .catch(function() {
    console.log("Fetch error: Could not load product details");
    productDisplay.textContent = "Could not load product details. Please try again later.";
  });


/*
<div class="product-container page-format">
  <div class="item-picture">
    <img
      class="product-image"
      src="images/products/[product.imgName].png"
    />
  </div>
  <div class="item-name">
    <h1>[product.name]</h1>
  </div>
  // START iterate through each item and get product.type and product.price, then do the following
  <div class="item-price">
    <div class="button-layout">
      <fieldset class="fieldset-border">
        <div>
          <input
            type="radio"
            id="[product.type]"
            value="[product.type]"
            name="format"
            data-price="[product.price]"
          />
          <label for="[product.type">[product.type]</label>
          <span class="price-display" id="[product.type]-price"></span>
        </div>
      </fieldset>
    </div>
  </div>
  // END need for iteration
  
  <div class="item-cart">
    <button type="button" id="addToCartButton">Add to Cart</button>
  </div>
</div>
<div class="Product-Description page-format">
  <h2 class="center">Product Overview</h2>
  <div>
    <p><u>Book Description</u></p>
    <p id=book-description>
      [populate with data.description]
    </p>
  </div>

  <br />
  <p>ISBN: 923014828832</p>
  <p>Author: [product.creator]</p>
</div>
*/
