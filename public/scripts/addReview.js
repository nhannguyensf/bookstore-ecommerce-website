document.addEventListener("DOMContentLoaded", function () {
    const reviewArea = document.getElementById("reviewArea");
    const textBox = document.getElementById("textBox");
    const subButton = document.getElementById("submitButton");
    const reviewSection = document.getElementById("reviewSection");

    function createReview(userID) {
        console.log("fired");
        var text = textBox.value;
        if (text.trim().length > 1) {
            var divEle = document.createElement("div");
            divEle.setAttribute("class", "product-review");

            var textEle = document.createElement("p");
            textEle.textContent = text.trim();

            var atag = document.createElement("a");
            var userlink = document.createElement("h4");
            atag.setAttribute("href", "login.html");
            userlink.innerHTML = userID;

            atag.appendChild(userlink);
            divEle.appendChild(textEle);
            divEle.insertBefore(atag, textEle);

            var lineBreakOne = document.createElement('br');
            reviewArea.parentNode.insertBefore(divEle, reviewArea.nextSibling);
            reviewArea.parentNode.insertBefore(lineBreakOne, divEle.nextSibling);
        }
    }

    subButton.addEventListener("click", function() {
        createReview('someUserID');
    });
})
