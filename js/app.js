import { LANGUAGES } from "./constants/languages.js";
import { LABELS } from "./constants/labels.js";
import { books } from "./constants/books.js";

document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const addBookForm = document.querySelector('[data-form]');
    const bookList = document.querySelector('[data-books]');
    const modal = document.querySelector('.modal');
    const openModalButton = document.getElementById('openModal');
    const closeModalOverlay = modal;

    // Initialization
    populateLanguageSelector();
    books.forEach((book, index) => {
        const bookCard = createBookCard(book, index);
        bookList.appendChild(bookCard);
    })

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

    // Functions
    function toggleModal() {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    }

    function createBookCard(book, index) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-book-index', index);

        addBookDetails(bookCard, book);
        addReadButton(bookCard, book.hasBeenRead);
        addDeleteButton(bookCard);

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

    function addDeleteButton(bookCard) {
        const deleteBookButton = document.createElement('button');
        deleteBookButton.classList.add("btn", "delete-book");
        deleteBookButton.setAttribute('type', 'button');
        deleteBookButton.innerText = LABELS.deleteBook;

        deleteBookButton.addEventListener('click', () => {
            const bookIndex = parseInt(bookCard.getAttribute('data-book-index'));
            removeBook(bookIndex);
            bookCard.remove();
        })

        bookCard.appendChild(deleteBookButton);
    }

    function addReadButton(bookCard, hasBeenRead) {
        const readButton = document.createElement('button');
        readButton.setAttribute('type', 'button');
        readButton.classList.add("btn");

        readButton.addEventListener('click', () => {
            const bookIndex = parseInt(bookCard.getAttribute('data-book-index'));
            let hasBeenRead = updateReadStatus(bookIndex);
            updateReadButtonStyle(readButton, hasBeenRead);
        })

        updateReadButtonStyle(readButton, hasBeenRead);

        bookCard.appendChild(readButton);
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

    function updateReadStatus(bookIndex) {
        const book = books[bookIndex];
        const hasBeenRead = book.hasBeenRead;
        book.hasBeenRead = !hasBeenRead;
        return book.hasBeenRead;
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

