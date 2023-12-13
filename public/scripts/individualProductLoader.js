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
fetch(`/product/${encodeURIComponent(productName)}`)
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
    const priceDiv = document.createElement('div');
    priceDiv.className = "item-price";
    const buttonDiv = document.createElement('div');
    buttonDiv.className = "button-layout";
    const fieldSetDiv = document.createElement('fieldset');
    fieldSetDiv.className = "fieldset-border";

    priceDiv.appendChild(buttonDiv);

    product.forEach((prodItem) => {
      const inputDiv = document.createElement('div');
      const inputEl = document.createElement('input');
      const labelEl = document.createElement('label');
      const spanEl = document.createElement('span');

      inputEl.setAttribute("type", "radio");
      inputEl.setAttribute("id", prodItem.type);
      inputEl.setAttribute("value", prodItem.type.charAt(0).toUpperCase() + prodItem.type.slice(1));
      inputEl.setAttribute("name", "format");
      inputEl.setAttribute("data-price", prodItem.price);

      labelEl.setAttribute("for", prodItem.type);
      labelEl.innerText = `${prodItem.type.charAt(0).toUpperCase() + prodItem.type.slice(1)} $${prodItem.price}`;

      spanEl.className = "price-display";
      spanEl.id = `${prodItem.type}-price`;

      inputDiv.appendChild(inputEl);
      inputDiv.appendChild(labelEl);
      inputDiv.appendChild(spanEl);

      fieldSetDiv.appendChild(inputDiv);
    });

    buttonDiv.appendChild(fieldSetDiv);
    priceDiv.appendChild(buttonDiv);
    productDetailsDiv.appendChild(priceDiv);

    productContainer.appendChild(productDetailsDiv);
    mainContainer.appendChild(productContainer);
    productDisplay.appendChild(mainContainer);

// Create the add to cart button and append to product-details
    const itemCartDiv = document.createElement('div');
    itemCartDiv.className = "item-cart";
    itemCartDiv.innerHTML = `<button type="button" id="addToCartButton">Add to Cart</button>`;
    productDetailsDiv.appendChild(itemCartDiv);


    var addToCartButton = document.getElementById("addToCartButton");
    var itemName = document.querySelector(".item-name h1").textContent;

    addToCartButton.addEventListener("click", function () {

      console.log('Button clicked!'); // Just for debugging


      // Find the selected format
      var selectedFormat = document.querySelector('input[name="format"]:checked');
      if (!selectedFormat) {
        console.error('No format selected'); // debug log
        alert("Please select a format.");
        return;
      }

      var format = selectedFormat.value;
      if (!format) {
        console.error('No format value found'); // debug log
        return;
      }

      var price = selectedFormat.getAttribute("data-price");
      if (!price) {
        console.error('No price value found'); // debug log
        return;
      }

      // Create an object for the cart item
      var cartItem = {
        name: itemName,
        format: format,
        price: price,
      };

      console.log(cartItem);   // This will log the cart item being added for debugging purposes

      // Add the item to the cart (local storage)
      addToCart(cartItem);
      // After adding to cart, ask the user if they want to go to the cart page
      var userChoice = confirm(
        "You've added an item to your cart. Would you like to view your cart now?"
      );

      console.log(userChoice);  // This will log the user's choice


      if (userChoice) {
        // If user clicks 'OK', redirect to the cart page
        window.location.href = "cart.html";
      }
      // If user clicks 'Cancel', they stay on the current page
    });

    function addToCart(item) {
      // Retrieve existing cart from local storage
      var cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Add new item
      cart.push(item);

      // Save back to local storage
      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Item added to cart!");
    }


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
  .catch(function () {
    console.log("Fetch error: Could not load product details");
    productDisplay.textContent = "Could not load product details. Please try again later.";
  });
