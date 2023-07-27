const header = document.querySelector("#header-title");
const itemList = document.querySelector("#items");
const form = document.querySelector("#myForm")
const inputbox = document.querySelector(".form-control")
// const delBtn = document.querySelector(".del");
// const edtBtn = document.querySelector(".edt")

let newHeader = document.createElement("p");
newHeader.className = "newHeader";
newHeader.textContent = "Hello World"
header.appendChild(newHeader);


function addListItem(value) {
    if (value.trim() === "") {
        console.error("Please enter some value");
        return;
    }
    else {
        const newLi = document.createElement("li");
        newLi.classList.add("item", "card", "p-2");
        newLi.textContent = value;

        const deleteBtn = document.createElement("button")
        deleteBtn.classList.add("btn", "my-2", "del");
        deleteBtn.textContent = "Delete";
        newLi.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", function () {
            itemList.removeChild(newLi);
        })

        const editBtn = document.createElement("button")
        editBtn.classList.add("btn", "my-2", "edt");
        editBtn.textContent = "Edit"
        newLi.appendChild(editBtn);

        itemList.appendChild(newLi);
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    let inputValue = document.getElementById("inputbox").value;
    addListItem(inputValue);
    inputbox.value = "";
})