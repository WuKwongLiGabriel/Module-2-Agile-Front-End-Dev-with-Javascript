console.log("script running");
// DOMContentLoaded is an event that triggers automatically when
// all the DOM elements have been created
document.addEventListener("DOMContentLoaded", function() {
    renderBooks(books);
    
    // Add Book button event
    let addBookBtn = document.querySelector("#add-book-btn");
    addBookBtn.addEventListener("click", function() {
        let formTitle = document.querySelector("#form-title");
        formTitle.textContent = "Add Book";
        document.querySelector("#book-id").value = '';
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#pages").value = '';
        
        let formOverlay = document.querySelector("#book-form-overlay");
        formOverlay.classList.add('visible');
    });
    
    // Close form button event
    let closeFormBtn = document.querySelector("#close-form-btn");
    closeFormBtn.addEventListener('click', function() {
        let formOverlay = document.querySelector("#book-form-overlay");
        formOverlay.classList.remove("visible");
    });

    // Close form when clicking outside
    let formOverlay = document.querySelector("#book-form-overlay");
    formOverlay.addEventListener("click", function(e) {
        if (e.target === formOverlay) {
            formOverlay.classList.remove("visible");
        }
    });

    // Handle form submission
    let bookForm = document.querySelector("#book-form");
    bookForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        let bookId = document.querySelector("#book-id").value;
        let title = document.querySelector("#title").value;
        let author = document.querySelector("#author").value;
        let pages = parseInt(document.querySelector("#pages").value);
        
        if (bookId) {
            // Update existing book
            updateBook(books, parseInt(bookId), title, author, pages);
        } else {
            // Add new book
            addNewBook(books, title, author, pages);
        }
        
        // Refresh the book list
        renderBooks(books);
        
        // Close the form
        formOverlay.classList.remove("visible");
    });
});

// Render all books to the DOM
function renderBooks(books) {
    let bookList = document.querySelector("#book-list");
    
    // Remove all existing children first
    bookList.innerHTML = '';
    
    // Check if books array is empty
    if (books.length === 0) {
        let emptyMessage = document.createElement("p");
        emptyMessage.style.padding = "20px";
        emptyMessage.style.textAlign = "center";
        emptyMessage.style.color = "black";
        emptyMessage.textContent = "No books found. Add your first book!";
        bookList.appendChild(emptyMessage);
        return;
    }
    
    // Loop through all books and create DOM elements
    for (let book of books) {
        let bookItem = document.createElement("div");
        bookItem.className = "book-item";
        
        bookItem.innerHTML = `
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-details">${book.author} - ${book.pages} pages</p>
            </div>
            <div class="book-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        
        // Add edit button event listener
        let editBtn = bookItem.querySelector(".edit-btn");
        editBtn.addEventListener("click", function() {
            // Use closure to remember the value of book
            let formTitle = document.querySelector('#form-title');
            formTitle.textContent = "Edit Book";
            document.querySelector("#book-id").value = book.id;
            document.querySelector("#title").value = book.title;
            document.querySelector("#author").value = book.author;
            document.querySelector("#pages").value = book.pages;
            
            let formOverlay = document.querySelector("#book-form-overlay");
            formOverlay.classList.add("visible");
        });
        
        // Add delete button event listener
        let deleteBtn = bookItem.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", function() {
            // Use closure to remember the value of book
            let confirmDelete = confirm("Are you sure you want to delete this book?");
            if (confirmDelete) {
                deleteBook(books, book.id);
                renderBooks(books);
            }
        });
        
        bookList.appendChild(bookItem);
    }
}