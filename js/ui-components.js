import { LABELS } from "./constants/labels.js";

export function createBookCard(book, index, onDelete, onToggleRead) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-book-index', index);

    addBookDetails(bookCard, book);
    const readButton = createReadButton(onToggleRead, book.hasBeenRead, index);
    const deleteButton = createDeleteButton(onDelete, index);

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('btn-group');
    buttonGroup.appendChild(readButton);

    buttonGroup.appendChild(deleteButton);
    bookCard.appendChild(buttonGroup);

    return bookCard;
}

export function addBookDetails(bookCard, book) {

    const bookTitle = document.createElement('h3');
    bookTitle.classList.add('book-title');
    bookTitle.innerText = book.title;
    bookCard.appendChild(bookTitle);


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

export function createDeleteButton(onDelete, bookIndex) {
    const deleteBookButton = document.createElement('button');
    deleteBookButton.classList.add("btn", "delete-button");
    deleteBookButton.setAttribute('type', 'button');
    deleteBookButton.innerText = LABELS.deleteBook;
    deleteBookButton.addEventListener('click', () => onDelete(bookIndex));
    return deleteBookButton;
}

export function createReadButton(onToggleRead, hasBeenRead, bookIndex) {
    const readButton = document.createElement('button');
    readButton.setAttribute('type', 'button');
    readButton.classList.add("btn");
    readButton.addEventListener('click', () => onToggleRead(bookIndex));
    updateReadButtonStyle(readButton, hasBeenRead);
    return readButton;
}


export function updateReadButtonStyle(readButton, hasBeenRead) {
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