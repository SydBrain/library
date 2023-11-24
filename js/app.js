import { LANGUAGES } from "./constants/languages.js";

document.addEventListener("DOMContentLoaded", () => {
    // Initialization
    populateLanguageSelector();

    // Variables
    let books = [];

    // DOM Elements
    const addBookForm = document.querySelector('[data-form]');
    const bookList = document.querySelector('[data-books]');

    // Event Listeners
    addBookForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const bookData = [];

        for (let value of formData.values()) {
            bookData.push(value);
        }

        const newBook = addNewBook(...bookData);
        books.push(newBook);

        createBookCard(newBook);

        addBookForm.reset();
    })

    // Functions
    function createBookCard(book) {
        let bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        let bookIndex = books.length - 1;
        bookCard.setAttribute('data-book-index', bookIndex);

        bookList.appendChild(bookCard);

        Object.values(book).forEach(value => {
            let bookParagraph = document.createElement('p');
            bookCard.appendChild(bookParagraph);
            bookParagraph.innerText = value;
        })
    }
})

function Book(title, author, published, language, hasBeenRead) {
    this.title = title;
    this.author = author;
    this.published = published;
    this.language = language;
    this.hasBeenRead = hasBeenRead;
}

function addNewBook(title, author, published, language, hasBeenRead) {
    return new Book(title, author, published, language, hasBeenRead)
}

function removeBook(books, bookIndex) {
    books.splice(bookIndex, 1);
}

function populateLanguageSelector() {
    const languageSelect = document.querySelector('[data-languages]');
    LANGUAGES.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.code;
        option.textContent = lang.name;
        languageSelect.appendChild(option);
    });
}

