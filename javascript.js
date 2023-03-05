const cardContainer = document.querySelector(".card-container");
const addButton = document.querySelector("#add-btn");
let myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(book) {
	myLibrary.push(book);
}

function createNewBook() {
	//Get value from inputs
	let title = document.querySelector("#title");
	let author = document.querySelector("#author");
	let pages = document.querySelector("#pages");
	let read = "";
	let readOptions = [...document.querySelectorAll(".read-status")];

	readOptions.forEach((option) => {
		if (option.checked) {
			read = option.value;
		}
	});

	//Create new object
	let newBook = new Book(title.value, author.value, pages.value, read);

	return newBook;
}

function addReadBtn(book) {
	let readStatus = book.read === "yes" ? "read" : "not-read";
	const readBtn = document.createElement("button");
	readBtn.className = readStatus;
	readBtn.textContent = readStatus === "read" ? "Read" : "Not Read";
	return readBtn;
}

function addDeleteBtn() {
	const deleteBtn = document.createElement("button");
	deleteBtn.className = "delete";
	deleteBtn.appendChild(document.createTextNode("X"));

	return deleteBtn;
}

function addButtons(book) {
	let buttonZone = document.createElement("div");
	buttonZone.className = "button-zone"

	//Add read toggle
	buttonZone.appendChild(addReadBtn(book));

	// Add delete button
	buttonZone.appendChild(addDeleteBtn());

	return buttonZone;
}

function displayLibrary(myLibrary) {
	myLibrary.forEach((book) => {
		// Create new card for each book
		let newCard = document.createElement("div");
		newCard.className = "card";

		let cardInfo = document.createElement("div")
		cardInfo.className = "card-info";

		const label = ["Name:", "Author:", "Pages:"];
		let i = 0;

		for (let prop in book) {
			if (Object.prototype.hasOwnProperty.call(book, prop) && prop !== "read") {
				// Add info to new paragraph
				let newPara = document.createElement("p");
				newPara.textContent = `${label[i]} ${book[prop]}`;;
				cardInfo.appendChild(newPara);
				i++;
			}
		}

		newCard.appendChild(cardInfo);
		newCard.appendChild(addButtons(book));
		cardContainer.appendChild(newCard);
		
	});
}

function addNewBook(newBook) {
	// Create new card
	let newCard = document.createElement("div");
	newCard.className = "card";

	let cardInfo = document.createElement("div")
		cardInfo.className = "card-info";

	const label = ["Name:", "Author:", "Pages:"];
	let i = 0;

	for (let prop in newBook) {
		if (
			Object.prototype.hasOwnProperty.call(newBook, prop) &&
			prop !== "read"
		) {
			// Add info to new paragraph
			let newPara = document.createElement("p");
			newPara.textContent = `${label[i]} ${newBook[prop]}`;
			cardInfo.appendChild(newPara);
			i++;
		}
	}

	newCard.appendChild(cardInfo);
	newCard.appendChild(addButtons(newBook))
	cardContainer.appendChild(newCard);
}

function addBookToCard(e) {
	// Prevent default behavior
	e.preventDefault();

	if (document.querySelector("#title").value.length === 0 || document.querySelector("#author").value.length === 0) {
		alert("Please fill all the fields");
		return;
	}

	// Create new book with input
	let newBook = createNewBook();

	// Add to myLibrary array
	myLibrary.push(newBook);

	// Add to current table
	addNewBook(newBook);
}

function deleteBook(currentDiv, e) {
	let index = Array.prototype.indexOf.call(currentDiv, e.target.parentNode.parentNode);

	// delete book from array
	myLibrary.splice(index, 1);

	// delete book from display
	e.target.parentNode.parentNode.remove();
}

function processButton(e) {
	if (e.target.className === "delete") {
		let currentDiv = this.children;
		if (confirm("Are you sure you want to delete this book?") === true) {
			deleteBook(currentDiv, e);
		}
	}

	if (e.target.className === "read" || e.target.className === "not-read") {
		e.target.classList.toggle("read");
		e.target.classList.toggle("not-read");
		e.target.textContent =
			e.target.textContent === "Read" ? "Not Read" : "Read";
	}
}

addButton.addEventListener("click", addBookToCard);

cardContainer.addEventListener("click", processButton);

const book1 = new Book("dom casmurro", "machado de assis", "55", "yes");
const book2 = new Book("senhora", "José de Alencar", "350", "no");

addBookToLibrary(book1);
addBookToLibrary(book2);

displayLibrary(myLibrary);
