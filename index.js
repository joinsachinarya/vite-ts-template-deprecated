document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem('items')) {
        var itemsArray = JSON.parse(localStorage.getItem('items'));
        itemsArray.forEach(function (item) {
            addItemToList(item.item, item.description);
        });
    }
});

var form = document.getElementById("addform");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");
var itemsArray = [];

//form submit event
form.addEventListener("submit", addItem);

//remove event
itemList.addEventListener("click", removeItem);

//filter event
filter.addEventListener("keyup", filterItems);

//edit event
itemList.addEventListener("click", editItem);

//Add item function
function addItem(e) {
    e.preventDefault();
    var newItem = document.getElementById("item").value;
    var newDes = document.getElementById("des").value;

    addItemToList(newItem, newDes);

    document.getElementById("item").value = "";
    document.getElementById("des").value = "";

    // Update and store the itemsArray in localStorage
    localStorage.setItem('items', JSON.stringify(itemsArray));
}

// Add item to the list and itemsArray
function addItemToList(newItem, newDes) {
    var itemObj = { item: newItem, description: newDes };
    itemsArray.push(itemObj);

    var li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(newItem));

    var i = document.createElement("i");
    i.className = "d-inline ml-2";
    i.appendChild(document.createTextNode(newDes));
    li.appendChild(i);

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm float-right delete";
    deleteBtn.appendChild(document.createTextNode("X"));
    li.appendChild(deleteBtn);

    var editBtn = document.createElement("button");
    editBtn.className = "btn btn-sm float-right edit mr-2";
    editBtn.appendChild(document.createTextNode("Edit"));
    li.appendChild(editBtn);

    itemList.appendChild(li);
}

//Remove item function
function removeItem(e) {
    if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure?")) {
            var li = e.target.parentElement;
            var index = Array.from(itemList.children).indexOf(li);

            if (index !== -1) {
                itemsArray.splice(index, 1);
                localStorage.setItem('items', JSON.stringify(itemsArray));
            }

            itemList.removeChild(li);
        }
    }
}

//filter item function
function filterItems(e) {
    var text = e.target.value.toLowerCase();
    var items = itemList.getElementsByTagName("li");
    var itemsArray = Array.from(items);

    var desS = itemList.getElementsByTagName("i");
    var desArray = Array.from(desS);

    itemsArray.forEach(function (it, idx) {
        var itName = it.firstChild.textContent;
        var desName = desArray[idx].firstChild.textContent;
        if (itName.toLocaleLowerCase().indexOf(text) !== -1 || desName.toLocaleLowerCase().indexOf(text) !== -1) {
            it.style.display = "block"
        } else {
            it.style.display = "none"
        }
    });
}

//editItem function
function editItem(e) {
    if (e.target.classList.contains("edit")) {
        var li = e.target.parentElement;
        var index = Array.from(itemList.children).indexOf(li);

        if (index !== -1) {
            var itemObj = itemsArray[index];
            var newItem = prompt("Edit Item Name:", itemObj.item);
            var newDes = prompt("Edit Description:", itemObj.description);

            if (newItem !== null && newItem.trim() !== "") {
                itemObj.item = newItem;
                itemObj.description = newDes;
                li.firstChild.textContent = newItem;
                li.getElementsByTagName("i")[0].textContent = newDes;

                localStorage.setItem('items', JSON.stringify(itemsArray));
            }
        }
    }
}
