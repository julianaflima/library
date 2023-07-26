class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
		this.identifier = Book.#counter++;
	}

	static #counter = 0;

	updateReadStatus() {
		const newStatus = this.read === "yes" ? "no" : "yes";
		this.read = newStatus;
		document.querySelectorAll(".card").forEach((e) => e.remove());
		myLibraryClass.displayLibrary();
	}
}

class Library {
	constructor() {
		this.array = [];
	}

	// Add book to the array -> ADD CONTENT
	addBookToArray(book) {
		this.array.push(book);
	}

	// Remove book from the array using identifier
	deleteBookFromArray(identifier) {
		let index = this.array.findIndex((item) => item.identifier === identifier);
		this.array.splice(index, 1);
	}

	displayLibrary() {
		// Create new cards for each book and display them
		document.querySelectorAll(".card").forEach((e) => e.remove());
		this.array.forEach((book) => {
			const newCardForNewBook = new Card();
			newCardForNewBook.createCard(book);
		});
	}

	init() {
		//Add book to array with browser
		const addNewBookButton = document.querySelector("#add-btn");
		addNewBookButton.addEventListener("click", (e) => {
			// Prevent default behavior
			e.preventDefault();

			// Doesn't allow submission if title or author fields are empty
			let title = document.querySelector("#title").value;
			let author = document.querySelector("#author").value;

			if (title.length === 0 || author.length === 0) {
				alert("Please fill all the fields");
				return;
			}

			let pages = document.querySelector("#pages").value;
			let read = "";
			let readOptions = [...document.querySelectorAll(".read-status")];
			readOptions.forEach((option) => {
				if (option.checked) {
					read = option.value;
				}
			});

			const newBook = new Book(title, author, pages, read);
			myLibraryClass.addBookToArray(newBook);

			const newCardForNewBook = new Card();
			newCardForNewBook.createCard(newBook);
		});
	}
}

class Card {
	// no Constructor
	#addReadBtn(newbook) {
		const readBtn = document.createElement("button");
		readBtn.addEventListener("click", (e) => {
			const identifier =
				+e.target.parentNode.parentNode.getAttribute("identifier");
			//Find book in the array with the identifier to switch read status
			let index = myLibraryClass.array.findIndex(
				(item) => item.identifier === identifier
			);
			const book = myLibraryClass.array[index];
			book.updateReadStatus();
		});
		readBtn.className = newbook.read === "yes" ? "read" : "not-read";
		readBtn.textContent = newbook.read === "yes" ? "Read" : "Not Read";
		return readBtn;
	}

	#addDeleteBtn() {
		const deleteBtn = document.createElement("button");
		deleteBtn.addEventListener("click", (e) => {
			if (confirm("Are you sure you want to delete this book?") === true) {
				// Delete book with the targeted identifier from array and then from the page
				const identifier =
					+e.target.parentNode.parentNode.getAttribute("identifier");
				myLibraryClass.deleteBookFromArray(identifier);
				document.querySelector(`[identifier="${identifier}"]`).remove();
			}
		});

		deleteBtn.className = "delete";
		deleteBtn.appendChild(document.createTextNode("X"));

		return deleteBtn;
	}

	#addButtons(newBook) {
		let buttonZone = document.createElement("div");
		buttonZone.className = "button-zone";

		//Add read toggle
		buttonZone.appendChild(this.#addReadBtn(newBook));

		// Add delete button
		buttonZone.appendChild(this.#addDeleteBtn());

		return buttonZone;
	}

	createCard(newBook) {
		const cardInfo = document.createElement("div");
		cardInfo.className = "card-info";

		// Get properties from book to add to card
		const label = ["Title:", "Author:", "Pages:"];
		let i = 0;
		for (let prop in newBook) {
			if (prop !== "identifier" && prop !== "read" && prop !== "cardName") {
				// Add info to new paragraph
				let newPara = document.createElement("p");
				newPara.textContent = `${label[i]} ${newBook[prop]}`;
				cardInfo.appendChild(newPara);
				i++;
			}
		}
		const newCard = document.createElement("div");
		newCard.className = "card";
		newCard.setAttribute("identifier", newBook.identifier);
		newCard.appendChild(cardInfo);
		newCard.appendChild(this.#addButtons(newBook));
		const cardContainer = document.querySelector(".card-container");
		cardContainer.appendChild(newCard);
	}
}

// Create library
const myLibraryClass = new Library();

myLibraryClass.init();
