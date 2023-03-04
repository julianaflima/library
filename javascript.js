const cardContainer = document.querySelector(".card-container")
const addButton = document.querySelector("#add-btn")
let myLibrary = [];



function Book (title, author, pages, read) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
}


function addBookToLibrary(book) {
	myLibrary.push(book);
}


function createNewBook() {
	//Get value from inputs
	let title = document.querySelector("#title");
	let author = document.querySelector("#author")
	let pages = document.querySelector("#pages");
	let read = "";

	let readOptions = [...document.querySelectorAll(".read"), ];

	readOptions.forEach(option => {
		if (option.checked) {read = option.value}
	});

	//Create new object
	let newBook = new Book(title.value, author.value, pages.value, read);

	return newBook;
}


function readToggleBtn(book) {
	let readStatus = book.read === "yes" ? 
		"read" : "not-read";
	const readBtn = document.createElement("button");
	readBtn.className = readStatus;
	readBtn.textContent = readStatus === "read" ? "Read" : "Not Read";
	return readBtn;
}


function displayLibrary(myLibrary) {
	myLibrary.forEach(book => {
		// Create new card for each book
		let newCard = document.createElement("div");
		newCard.className = "card";

		for(let prop in book) {
			if (Object.prototype.hasOwnProperty.call(book, prop) && prop !== "read") {
				// Add info to new paragraph
				let newPara = document.createElement("p");
				newPara.textContent = book[prop];
				newCard.appendChild(newPara);
			}
		}

		//Add read toggle
		newCard.appendChild(readToggleBtn(book));

		// Add delete button
		const deleteBtn = document.createElement("button");
		deleteBtn.className = "delete";
		deleteBtn.appendChild(document.createTextNode("X"));
		newCard.appendChild(deleteBtn);

		cardContainer.appendChild(newCard);
	});
}


function addNewBook(newBook) {
	// Create new card	
	let newCard = document.createElement("div");
		newCard.className = "card";

	for(let prop in newBook) {
		if (Object.prototype.hasOwnProperty.call(newBook, prop) && prop !== "read") {
			// Add info to new paragraph
			let newPara = document.createElement("p");
			newPara.textContent = newBook[prop];
			newCard.appendChild(newPara);
		}
	}

	cardContainer.appendChild(newCard);

	//Add read toggle
	newCard.appendChild(readToggleBtn(newBook));

	// Add delete button
	const deleteBtn = document.createElement("button");
	deleteBtn.className = "delete";
	deleteBtn.appendChild(document.createTextNode("X"));
	newCard.appendChild(deleteBtn);
}


function addBookToCard(e) {
	// Prevent default behavior
	e.preventDefault();

	// Create new book with input
	let newBook = createNewBook();

	// Add to myLibrary array
	myLibrary.push(newBook);

	// Add to current table
	addNewBook(newBook);
}


function deleteButton(e) {
	if (e.target.className === "delete"){

		let index = Array.prototype.indexOf.call(this.children, e.target.parentNode);
    console.log(index);
		// delete book from array
		myLibrary.splice(index, 1);

		// delete book from display 
		e.target.parentNode.remove();

	}
}



addButton.addEventListener('click', addBookToCard);


cardContainer.addEventListener("click", deleteButton);





const book1 = new Book('dom casmurro', 'machado de assis', '55', 'yes');
const book2 = new Book("senhora", "José de Alencar", '350', 'no');

addBookToLibrary(book1);
addBookToLibrary(book2);

displayLibrary(myLibrary);




