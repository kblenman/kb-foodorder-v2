// Initialize Materialize side navigation open/close
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
});

/* ---------------------------------------------------------------------- */

// Initialize cart show and hide cart buttons
const SHOWCART = document.getElementById("show-cart");
const HIDECART = document.getElementById("hide-cart");
const CART = document.getElementById("cart");

SHOWCART.addEventListener("click", ShowCart);
HIDECART.addEventListener("click", HideCart);

function ShowCart() {
	CART.style.display = "grid"; // It's a grid. Preserve it's structure!!!

	/* Remove alert */
	document.getElementById("alert").style.display = "none";
}

function HideCart() {
	CART.style.display = "none";
}



/* ---------------------------------------------------------------------- 
	Add/Remove Items 
   ---------------------------------------------------------------------- */

/* Add click event listener to all menu-item 'add to cart' buttons. */
buttonList = document.getElementsByClassName("addToCart");
for (var i = 0; i < buttonList.length; i++) {
	buttonList[i].addEventListener("click", AddToCart);
}

/* Initialize cart-items container */
let cartItemsContainer = document.getElementById("cartItemsContainer");

/* Create a list of the current items in the cart by extracting
   the item's name and adding it to a separate list */
let itemNameList = [];
let cartItems = document.getElementsByClassName("cartItem");

if(cartItems.length != 0) {
	for (var i = 0; i < cartItems.length; i++) {
		let itemName = cartItems[i].getAttribute("data-itemname");
		itemNameList.push(itemName);
	}
}


/* --------------------------------------------------------
	Add/Remove Items functions
   --------------------------------------------------------
*/

/* --- AddToCart Function --- */
function AddToCart(button) {
	/* Set the name and cost associated with the button pressed. */
	let itemName = button.target.getAttribute("data-itemname");
	let itemCost = Number(button.target.getAttribute("data-itemcost"));

	/* If the item doesnt already exist in the cart list, create 
	and append it */
	if (itemNameList.includes(itemName) != true) {
		let itemtoAdd = `
				<div class="cartItem"
				id="${itemName}"
				data-itemName="${itemName}"
				data-itemCost="${itemCost}">
					<p>${itemName}</p>
					<select name="quantity"
					class="browser-default">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
					<button class="deleteItem btn red waves-effect waves-light"
					data-linkedItem="${itemName}">
						Remove</button>
				</div>`;

		/* Append new item to cartItemsContainer. 

		   NOTE: use insertAdjacentHTML to preserve event listeners 
		   so that the quantity option stays selected as you keep 
		   adding items */
		cartItemsContainer.insertAdjacentHTML('beforeend', itemtoAdd);

		/* Update cartItems and itemNameList arrays */
		cartItems = document.getElementsByClassName("cartItem");
		itemNameList.push(itemName);

		/* Add a change event listener to quantity selector */
		let addedItemDiv = document.getElementById(itemName);
		let addedItemSelector = addedItemDiv.childNodes[3];
		addedItemSelector.addEventListener("change", UpdateTotals);

		/* Add a click event listener for the delete button */
		let deleteButton = addedItemDiv.childNodes[5];
		deleteButton.addEventListener("click", DeleteItem);

		/* Update totals */
		UpdateTotals();

		/* Display alert and remove it after 1 second */
		document.getElementById("alert").style.display = "block";
		// setTimeout(function(){document.getElementById("alert").style.display = "none"}, 1000);
	}
}
/* --- End of addToCart Function --- */

/* --- UpdateTotals Function --- */
function UpdateTotals() {
	let cartTotal = 0;

	/* Iterate through cartItems. Calculate itemcost times 
	   quantity selected then add it to cartTotal */
	for (var i = 0; i < cartItems.length; i++) {
		let itemCost = Number(cartItems[i].getAttribute("data-itemcost"));
		let itemQuantity = Number(cartItems[i].childNodes[3].value);

		let itemTotal = itemCost * itemQuantity;
		cartTotal += itemTotal;
	}

	/* Update total */
	document.getElementById("total").childNodes[0].nodeValue = `$ ${cartTotal.toFixed(2)}`;
}
/* --- End of UpdateTotals Function --- */

/* --- Delete Item Function --- */
function DeleteItem(button) {
	let linkedItemName = button.target.getAttribute("data-linkeditem");
	let itemCartDiv = document.getElementById(linkedItemName);
	itemCartDiv.outerHTML = "";

	/* Update itemNameList (remove from array) */
	removalIndex = itemNameList.indexOf(linkedItemName);
	itemNameList.splice(removalIndex, 1);

	/* Update total after delete */
	UpdateTotals();
}