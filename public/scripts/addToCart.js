document.addEventListener("DOMContentLoaded", function () {
  // Function to update price display
  function updatePriceDisplay() {
    // Find all radio buttons
    var radioButtons = document.querySelectorAll(
      'input[type=radio][name="format"]'
    );

    radioButtons.forEach(function (radio) {
      // Get the corresponding price display span
      var priceDisplay = document.getElementById(radio.id + "-price");

      // Set the text of the span to the data-price value
      priceDisplay.textContent = "$" + radio.getAttribute("data-price");
    });
  }

  // Call the function to update price display
  updatePriceDisplay();
});


document.addEventListener("DOMContentLoaded", function () {
  var cartItemsContainer = document.getElementById("cartItemsContainer");
  var cartTotalElement = document.getElementById("cartTotal");
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  var total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach(function (item, index) {
      var itemElement = document.createElement("div");
      itemElement.className = "cart-item";
      itemElement.innerHTML = `
          <span class="item-name">${item.name} (${item.format})</span>
          <span class="item-price">$${item.price}</span>
          <button onclick="removeItemFromCart(${index})">Remove</button>
        `;
      cartItemsContainer.appendChild(itemElement);
      total += parseFloat(item.price);
    });
    cartTotalElement.innerHTML = `Total: $${total.toFixed(2)}`;
  }
});

function removeItemFromCart(index) {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload(); // Reload the page to update the cart display
}
