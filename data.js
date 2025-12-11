//To show in inspector that script is running
console.log("data.js is running");

// Initialize books array - will be loaded from JSONBin
let books = [];

// Load data from JSONBin when page loads
async function initializeData() {
    books = await loadData();
    if (!books || books.length === 0) {
        books = [];
    }
    renderBooks(books);
}

// Add a new book
function addNewBook(books, title, author, pages) {
    const newBook = {
        "id": Math.floor(Math.random() * 10000 + 1),
        "title": title,
        "author": author,
        "pages": pages
    };
    books.push(newBook);
    
    // Save to JSONBin
    saveData(books).then(() => {
        console.log("Book added and saved to JSONBin");
    });
}

// Update an existing book
function updateBook(books, bookId, title, author, pages) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === bookId) {
            books[i].title = title;
            books[i].author = author;
            books[i].pages = pages;
            
            // Save to JSONBin
            saveData(books).then(() => {
                console.log("Book updated and saved to JSONBin");
            });
            return;
        }
    }
}

// Delete a book
function deleteBook(books, bookId) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === bookId) {
            books.splice(i, 1);
            
            // Save to JSONBin
            saveData(books).then(() => {
                console.log("Book deleted and saved to JSONBin");
            });
            return;
        }
    }
}

// Call initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeData);
} else {
    initializeData();
}