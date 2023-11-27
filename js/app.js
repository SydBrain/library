import { LABELS } from "./constants/labels.js";
import { BOOKS } from "./constants/books.js";
import { createBook } from "./book.js";
import { createBookManager } from "./book-manager.js";
import * as utilities from './utilities.js';

document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const addBookForm = document.querySelector('[data-form]');
    const bookList = document.querySelector('[data-books]');
    const modal = document.querySelector('.modal');
    const openModalButton = document.getElementById('openModal');
    const closeModalOverlay = modal;

    // Initialization
    const bookManager = createBookManager(BOOKS);
    const books = bookManager.getAllBooks();

    utilities.populateLanguageSelector();
    books.forEach((book, index) => {
        const bookCard = createBookCard(book, index);
        bookList.appendChild(bookCard);
    })

    // Event Listeners
    addBookForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!utilities.validateYear()) {
            event.preventDefault();
            alert('Please enter a valid year.');
            return;
        }
        const formData = new FormData(event.target);
        const bookData = [];

        for (let [key, value] of formData.entries()) {
            if (key === 'read') {
                value = value === "true";
            }
            bookData.push(value);
        }

        const newBook = createBook(...bookData);
        bookManager.addBook(newBook);

        const bookCard = createBookCard(newBook, books.length - 1);
        bookList.appendChild(bookCard);

        addBookForm.reset();
        toggleModal();
    })

    openModalButton.addEventListener('click', () => {
        toggleModal();
    });

    closeModalOverlay.addEventListener('click', (event) => {
        if (event.target === modal) {
            toggleModal();
        }
    });


    function toggleModal() {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    }

    function createBookCard(book, index) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-book-index', index);

        addBookDetails(bookCard, book);
        const readButton = createReadButton(bookCard, book.hasBeenRead);
        const deleteButton = createDeleteButton(bookCard);

        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('btn-group');

        buttonGroup.appendChild(readButton);
        buttonGroup.appendChild(deleteButton);

        bookCard.appendChild(buttonGroup);

        return bookCard;
    }

    function addBookDetails(bookCard, book) {
        // Title
        const bookTitle = document.createElement('h3');
        bookTitle.classList.add('book-title');
        bookTitle.innerText = book.title;
        bookCard.appendChild(bookTitle);

        // Author
        const authorAndPublished = document.createElement('p');
        authorAndPublished.innerText = `${book.author} | ${book.published}`;
        bookCard.appendChild(authorAndPublished);

        Object.keys(book).forEach(key => {

            if (!["title", "author", "published", "hasBeenRead"].includes(key)) {
                const bookParagraphElement = document.createElement('p');
                bookParagraphElement.innerText = book[key];
                bookCard.appendChild(bookParagraphElement);
            }
        })

    }

    function createDeleteButton(bookCard) {
        const deleteBookButton = document.createElement('button');
        deleteBookButton.classList.add("btn", "delete-book");
        deleteBookButton.setAttribute('type', 'button');
        deleteBookButton.innerText = LABELS.deleteBook;

        deleteBookButton.addEventListener('click', () => {
            const bookIndex = parseInt(bookCard.getAttribute('data-book-index'));
            bookManager.removeBook(bookIndex);
            bookCard.remove();
            utilities.updateBookIndices();
        })

        return deleteBookButton;
    }

    function createReadButton(bookCard, hasBeenRead) {
        const readButton = document.createElement('button');
        readButton.setAttribute('type', 'button');
        readButton.classList.add("btn");

        readButton.addEventListener('click', () => {
            const bookIndex = parseInt(bookCard.getAttribute('data-book-index'));
            const book = bookManager.getBook(bookIndex);
            bookManager.toggleReadStatus(book, book.hasBeenRead);
            updateReadButtonStyle(readButton, book.hasBeenRead);
        })

        updateReadButtonStyle(readButton, hasBeenRead);

        return readButton;
    }

    function updateReadButtonStyle(readButton, hasBeenRead) {
        switch (hasBeenRead) {
            case true:
                readButton.classList.add("read");
                readButton.classList.remove("not-read");
                readButton.innerText = LABELS.read;
                break;

            case false:
                readButton.classList.add("not-read")
                readButton.classList.remove("read");
                readButton.innerText = LABELS.notRead
                break;
        }
    }

})

