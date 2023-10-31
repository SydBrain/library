document.addEventListener("DOMContentLoaded", () => {
    // Variables

    // DOM Elements
    const addBookForm = document.querySelector('[data-form]');

    addBookForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const bookData = [];

        for (let value of formData.values()) {
            bookData.push(value);
        }

        const newBook = addNewBook(...bookData);
        console.log(newBook);
    })
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
