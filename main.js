const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const fastestCars = [
	'Bugatti Chiron Super Sport 300+',
	'Koenigsegg Agera RS',
	'Hennessey Venom GT',
	'Bugatti Veyron Super Sport',
	'Bugatti Chiron',
	'Koenigsegg Agera R',
	'SSC Ultimate Aerp',
	'Bugatti Veyron',
	'McLaren Speedtail',
	'Saleen S7',
];

// Store list items in an array
const listItems = [];

// Keep track of index
let dragStartIndex;

createList();

// Insert list items in the dom
function createList() {
	// Create item element ... copy all items
	[...fastestCars]
		// Map loops through an returns mixed array
		.map(a => ({ value: a, sort: Math.random() }))
		// Sort method using
		.sort((a, b) => a.sort - b.sort)
		// maping to get value from the object and return to array of strings
		.map(a => a.value)
		.forEach((car, index) => {
			const listItem = document.createElement('li');

			// Setting attribute using html5 attributes. Index that is passed in from an array
			listItem.setAttribute('data-index', index);
			// Starting from 1 instead of 0
			listItem.innerHTML = `
<span class="number">${index + 1}</span>
<div class="draggable" draggable="true"> 
        <p class="car-name">${car}</p>
        <i class="fa fa-arrows-alt"></i>
</div>
`;
			// Push into listItems array
			listItems.push(listItem);

			draggable_list.appendChild(listItem);
		});

	addEventListeners();
}

function dragStart() {
	// Get draggable item index, + makes it a number
	dragStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragEnter() {
	// On enter background changes
	this.classList.add('over');
}
function dragLeave() {
	// On leave background changes
	this.classList.remove('over');
}

// Prevent default is required as it is always firing off and does not allow to drop item
function dragOver(e) {
	e.preventDefault();
}

function dragDrop() {
	// Get items index number to be swapped
	const dragEndIndex = +this.getAttribute('data-index');
	swapItems(dragStartIndex, dragEndIndex);

	this.classList.remove('over');
}

// Function to get and swap items
function swapItems(fromIndex, toIndex) {
	const itemOne = listItems[fromIndex].querySelector('.draggable');
	const itemTwo = listItems[toIndex].querySelector('.draggable');

	listItems[fromIndex].appendChild(itemTwo);
	listItems[toIndex].appendChild(itemOne);
}

// Check order of list items when clicked
function checkOrder() {
	console.log(123);
	listItems.forEach((listItem, index) => {
		const carName = listItem.querySelector('.draggable').innerText.trim();
		// Matching to the main array (right order) and checking indexes
		if (carName !== fastestCars[index]) {
			listItem.classList.add('wrong');
		} else {
			listItem.classList.remove('wrong');
			listItem.classList.add('right');
		}
	});
}

function addEventListeners() {
	const draggables = document.querySelectorAll('.draggable');
	const dragListItems = document.querySelectorAll('.draggable-list li');

	// Add event listener on draggable items, fires off when we start dragging
	draggables.forEach(draggable => {
		draggable.addEventListener('dragstart', dragStart);
	});

	dragListItems.forEach(item => {
		item.addEventListener('dragover', dragOver);
		item.addEventListener('drop', dragDrop);
		item.addEventListener('dragenter', dragEnter);
		item.addEventListener('dragleave', dragLeave);
	});
}

check.addEventListener('click', checkOrder);
