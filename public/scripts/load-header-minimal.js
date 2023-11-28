// loads header.html into element with ID 'header-container'
fetch("header-minimal.html")
  .then((response) => response.text())
  .then((data) => {
    const headerContainer = document.getElementById("header-container-minimal");
    headerContainer.innerHTML = data;
  })
  .catch((error) => console.error("Error loading header:", error));

