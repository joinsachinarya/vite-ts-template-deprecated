var form = document.getElementById("addform");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");


//form submit event
form.addEventListener("submit", addItem);
//remove event
itemList.addEventListener("click", removeItem);
//filter event 
filter.addEventListener("keyup", filterItems);
//edit event
itemList.addEventListener("click", editItem);

function saveItem(itemsInLS) {
    localStorage.setItem("itemsInLS", JSON.stringify(itemsInLS));
}

function createItem(itemNo, des) {
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(itemNo)); //add newItem text node into li

    var i = document.createElement("i");
    i.className = "d-inline ml-2";
    i.appendChild(document.createTextNode(des));

    //create delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm float-right delete";
    deleteBtn.appendChild(document.createTextNode("X"));
    li.appendChild(deleteBtn);

    //create edit button
    var editBtn = document.createElement("button");
    editBtn.className = "btn btn-sm float-right edit mr-2";
    editBtn.appendChild(document.createTextNode("Edit"));
    li.appendChild(editBtn);

    itemList.appendChild(li);
    li.appendChild(i);
}

//Add item function
function addItem(e) {
    e.preventDefault();

    var item = document.getElementById("item").value;
    var des = document.getElementById("des").value;

    var newItem = {
        itemNo: item,
        description: des,
    }
    createItem(item, des);

    var currItems = JSON.parse(localStorage.getItem("itemsInLS")) || [];
    currItems.push(newItem);
    console.log(currItems);
    saveItem(currItems);

    document.getElementById("item").value = "";
    document.getElementById("des").value = "";

}

//Remove item function
function removeItem(e) {
    if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure?")) {
            var li = e.target.parentElement;
            itemList.removeChild(li);
            saveItem(updatedItems);
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
    })
}

//editItem function
function editItem(e) {
    if (e.target.classList.contains("edit")) {
        console.log("Edit clicked");
    }
}