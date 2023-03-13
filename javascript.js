const cardContainer = document.querySelector(".card-container");
const addButton = document.querySelector("#add-btn");
const addNewBookButton = document.querySelector("#add-btn");

class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
		this.identifier = Book.#counter++;
	}

	static #counter = 0;

	addReadBtn() {
		let readStatus = this.read === "yes" ? "read" : "not-read";
		const readBtn = document.createElement("button");
		readBtn.className = readStatus;
		readBtn.textContent = this.read === "yes" ? "Read" : "Not Read";
		return readBtn;
	}

	addDeleteBtn() {
		const deleteBtn = document.createElement("button");
		deleteBtn.className = "delete";
		deleteBtn.appendChild(document.createTextNode("X"));

		return deleteBtn;
	}

	addButtons() {
		let buttonZone = document.createElement("div");
		buttonZone.className = "button-zone";

		// //Add read toggle
		buttonZone.appendChild(this.addReadBtn());

		// // Add delete button
		buttonZone.appendChild(this.addDeleteBtn());

		return buttonZone;
	}

	createCard() {
		let newCard = document.createElement("div");
			newCard.className = "card";
			newCard.setAttribute("identifier", this.identifier);

			let cardInfo = document.createElement("div");
			cardInfo.className = "card-info";

			const label = ["Title:", "Author:", "Pages:"];
			let i = 0;

			for (let prop in this) {
				if (prop !== "identifier" && prop !== "read") {
					// Add info to new paragraph
					let newPara = document.createElement("p");
					newPara.textContent = `${label[i]} ${this[prop]}`;
					cardInfo.appendChild(newPara);
					i++;
				}
			}
			newCard.appendChild(cardInfo);
			newCard.appendChild(this.addButtons());
			return newCard;
	}
}

class Library {
	constructor() {
		this.array = [];
	}

	// Add book to the array -> ADD CONTENT
	addBookToArray(book) {
		this.array.push(book);
		this.displayLibrary();
	}

	// Remove book from the array using identifier -> REMOVE CONTENT
	deleteBookFromArray(identifier) {
		let index = this.array.findIndex(
			(item) => item.identifier === identifier
		);
		this.array.splice(index, 1);

		//Remove from page
		document.querySelector(`[identifier="${identifier}"]`).remove();
	}

	

	displayLibrary() {
		// this.array.forEach((book) => {
		for (let book of this.array) {
			const identifier = document.querySelector(
				`[identifier="${book.identifier}"]`
			);
			// Skip books already in display
			if (identifier) {
				continue;
			}
			const newCard = book.createCard();
			const cardContainer = document.querySelector(".card-container");
			cardContainer.appendChild(newCard);
		}
	}
}

function myFunction(e) {
	// Prevent default behavior
	e.preventDefault();


	// Doesn't allow submission if title or author fields are empty
	let title = document.querySelector("#title");
	let author = document.querySelector("#author");

	if (title.value.length === 0 || author.value.length === 0) {
		alert("Please fill all the fields");
		return;
	}

	let pages = document.querySelector("#pages");
	let read = "";
	let readOptions = [...document.querySelectorAll(".read-status")];

	readOptions.forEach((option) => {
		if (option.checked) {
			read = option.value;
		}
	});

	const newBook = new Book(title.value, author.value, pages.value, read);
	myLibraryClass.addBookToArray(newBook);
}

function processButton(e) {
	if (e.target.className === "delete") {
		let currentDiv = this.children;
		if (confirm("Are you sure you want to delete this book?") === true) {
			// myLibraryClass.deleteBookFromArray();
			const identifier = +e.target.parentNode.parentNode.getAttribute("identifier");
			myLibraryClass.deleteBookFromArray(identifier);
		}
	}

	if (e.target.className === "read" || e.target.className === "not-read") {
		e.target.classList.toggle("read");
		e.target.classList.toggle("not-read");
		e.target.textContent =
			e.target.textContent === "Read" ? "Not Read" : "Read";
	}
}

//Add book to array with browser
addNewBookButton.addEventListener("click", myFunction);

// Event Listeners for buttons in card
cardContainer.addEventListener("click", processButton);

const myLibraryClass = new Library();

const book1 = new Book("dom casmurro", "machado de assis", "55", "yes");
const book2 = new Book("senhora", "José de Alencar", "350", "no");

const book3 = new Book("about ice", "author whoworteit", "400", "no");

myLibraryClass.addBookToArray(book1);
myLibraryClass.addBookToArray(book2);
myLibraryClass.addBookToArray(book3);

myLibraryClass.displayLibrary();

