let books = [
    {
        "id": 1,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "year": 1925
    },
    {
        "id": 2,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "year": 1960
    }
];

function addNewBook(books, title, author, year) {
    if (title.length > 0 && author.length > 0 && year > 0) {
        let newBook = {
            "id": Math.floor(Math.random() * 9999) + 1,
            "title": title,
            "author": author,
            "year": year
        };
        books.push(newBook);
    } else {
        throw "Invalid parameters";
    }
}

function updateBook(books, idToModify, newTitle, newAuthor, newYear) {
    // Create a new book that will replace the original one
    let modifiedBook = {
        "id": idToModify,
        "title": newTitle,
        "author": newAuthor,
        "year": newYear
    };
    
    // Find the index of the book which we want to replace
    let indexToModify = null;
    for (let i = 0; i < books.length; i++) {
        if (books[i].id == idToModify) {
            indexToModify = i;
            break;
        }
    }
    
    // If indexToModify is not null then we have found the index
    if (indexToModify != null) {
        books[indexToModify] = modifiedBook;
    }
}

function deleteBook(books, idToDelete) {
    // Find the index of the book which we want to delete
    let indexToDelete = null;
    for (let i = 0; i < books.length; i++) {
        if (books[i].id == idToDelete) {
            indexToDelete = i;
            break;
        }
    }
    
    if (indexToDelete != null) {
        books.splice(indexToDelete, 1);
    }
}