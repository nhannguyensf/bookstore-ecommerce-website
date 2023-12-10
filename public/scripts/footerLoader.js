// loads footer.html into element with ID 'footer-container'
fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    const headerContainer = document.getElementById("footer-container");
    headerContainer.innerHTML = data;
  })
  .catch((error) => console.error("Error loading footer:", error));
