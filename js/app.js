import { BOOKS } from "./constants/books.js";
import { createBook } from "./book.js";
import { createBookManager } from "./book-manager.js";
import * as utilities from './utilities.js';
import {
    createBookCard,
    addBookDetails,
    createDeleteButton,
    createReadButton,
    updateReadButtonStyle
} from './ui-components.js';

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
        const bookCard = createBookCard(book, index, onDelete, onToggleRead);
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
        const bookIndex = books.length - 1;
        bookManager.addBook(newBook);

        const bookCard = createBookCard(newBook, bookIndex, onDelete, onToggleRead);
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

    // Functions

    function toggleModal() {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    }

    function onDelete(bookIndex) {
        console.log("ON DELETE CALLED");
        bookManager.removeBook(bookIndex);

        const bookCard = document.querySelector(`[data-book-index="${bookIndex}"]`);
        if (bookCard) {
            bookCard.remove();
        }

        updateBookIndices();
        refreshBookList();
    }

    function onToggleRead(bookIndex) {
        const book = bookManager.getBook(bookIndex);
        bookManager.toggleReadStatus(book, book.hasBeenRead);

        const bookCard = document.querySelector(`[data-book-index="${bookIndex}"]`);
        if (bookCard) {
            const readButton = bookCard.querySelector(".btn");
            if (readButton) {
                updateReadButtonStyle(readButton, book.hasBeenRead);
            }
        }
    }

    function refreshBookList() {
        while (bookList.firstChild) {
            bookList.removeChild(bookList.firstChild);
        }
        books.forEach((book, index) => {
            const bookCard = createBookCard(book, index, onDelete, onToggleRead);
            bookList.appendChild(bookCard);
        });
    }

    function updateBookIndices() {
        document.querySelectorAll('.book-card').forEach((card, index) => {
            card.setAttribute('data-book-index', index);
        });
    }

})

