import { LANGUAGES } from "./constants/languages.js";
import { LABELS } from "./constants/labels.js";

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

        const bookCard = createBookCard(newBook);
        bookList.appendChild(bookCard);

        addBookForm.reset();
    })

    // Functions
    function createBookCard(book) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-book-index', books.length - 1);

        addBookDetails(bookCard, book);
        addDeleteButton(bookCard);

        return bookCard;
    }

    function addBookDetails(bookCard, book) {
        Object.values(book).forEach(value => {
            const bookParagraph = document.createElement('p');
            bookParagraph.innerText = value;
            bookCard.appendChild(bookParagraph);
        });
    }

    function addDeleteButton(bookCard) {
        const deleteBookButton = document.createElement('button');
        deleteBookButton.classList.add('delete-book');
        deleteBookButton.setAttribute('type', 'button');
        deleteBookButton.innerText = LABELS.deleteBook;

        deleteBookButton.addEventListener('click', () => {
            const bookIndex = parseInt(deleteBookButton.getAttribute('data-book-index'));
            removeBook(bookIndex);
            bookCard.remove();
        })

        bookCard.appendChild(deleteBookButton);
    }

    function Book(title, author, published, language, hasBeenRead) {
        this.title = title;
        this.author = author;
        this.published = published;
        this.language = language;
        this.hasBeenRead = hasBeenRead;
    }

    function addNewBook(title, author, published, language, hasBeenRead) {
        return new Book(title, author, published, language, hasBeenRead);
    }

    function removeBook(bookIndex) {
        if (bookIndex >= 0 && bookIndex < books.length) {
            books.splice(bookIndex, 1);
            updateBookIndices();
        }
    }

    function updateBookIndices() {
        document.querySelectorAll('.book-card').forEach((card, index) => {
            card.setAttribute('data-book-index', index);
        });
    }

    function populateLanguageSelector() {
        const languageSelect = document.querySelector('[data-languages]');
        LANGUAGES.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang.name;
            option.textContent = lang.name;
            languageSelect.appendChild(option);
        });
    }
})

