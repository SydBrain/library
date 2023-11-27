export function createBookManager(initialBooks) {
    books = initialBooks;

    function getAllBooks() {
        return books;
    }

    function getBook(bookIndex) {
        return books[bookIndex];
    }

    function addBook(newBook) {
        books.push(newBook);
    }

    function removeBook(bookIndex) {
        if (bookIndex >= 0 && bookIndex < this.books.length) {
            books.splice(bookIndex, 1);
        }
    }

    function toggleReadStatus(book, currentStatus) {
        book.hasBeenRead = !currentStatus;
    }

    return {
        books,
        getAllBooks,
        getBook,
        addBook,
        removeBook,
        toggleReadStatus
    }
}