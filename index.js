let header = document.getElementById("header-title");
let newHeader = document.createElement("p");
newHeader.className = "newHeader";
newHeader.textContent = "Hello World"
header.appendChild(newHeader);




let form = document.getElementById("myForm")
form.addEventListener("submit", function (event) {
    event.preventDefault()
    let inputValue = document.getElementById("inputbox").value;

    let itemList = document.getElementById("items");
    let newLi = document.createElement("li");
    newLi.classList = "item card p-2";
    newLi.textContent = inputValue
    itemList.appendChild(newLi);

    console.log(inputValue)
})