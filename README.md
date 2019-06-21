# kb-foodorder-v2

## About the Project
Food Order v2 is the updated version of the [Island Breeze food Order Application](https://kblenman.github.io/pages/FoodOrder/index.html). Both versions allow the user to add and remove items from their cart as well as change the quantity of each item in the cart. It calculates the cart total, displays it, and continually updates it as the user changes their selections.
	
	### Technology Used
	* CSS
	* Javascript
	* Materialize.css


## What Changed in Version 2?
Version 1 of the app was not user friendly for mobile devices. While it was responsive and changed based on screen size, the UI was not easy to use or visually appealing. Version 2 fixes this problem by hiding the cart and making it visible only by clicking the cart button. 

## Any Bugs to Fix?
	### General Bugs
		* Overflow-y not working properly in Microsoft Edge Browser.

	### Mobile Specific Bugs
		* Changing an item's quantity when there are multiple items in the cart causes item name text to be pushed out of its container.
		* Vertical align also causes item name text to be pushed.
			> These issues were not present in Version 1 and may be caused by Materialize's select and/or button modifications.

## Possible Future Improvements
	* Compress images
	* Have the menu populate by retrieving information via a database.
	* Add menu sections (soups, seafood, chicken, etc.)
	* Have the users order send to a database after clicking "check out"
