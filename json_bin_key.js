//Test if Key is running
console.log("JSON key is running😀");

const JSON_BIN_BASE_URL = "https://api.jsonbin.io/v3";
const JSON_BIN_ID = "69391b27ae596e708f8f9097";
const MASTER_KEY = "$2a$10$fd9mG4IjKfA93LTFEPh44utx./t7SR0oN94tYGWe/Yc7Qq33bjdPm";

async function loadData() {
    try {
        const config = {
            "headers": {
                "Content-Type": "application/json",
                "X-Master-Key": MASTER_KEY
            }
        }
        const response = await axios.get(`${JSON_BIN_BASE_URL}/b/${JSON_BIN_ID}/latest`, config);
        return response.data.record;

    } catch (e) {
        console.error("Error loading data:", e);
        //if there is any error of any kind return an []
        return [];
    }
}

async function saveData(books) {
    try {
        const config = {
            "headers": {
                "Content-Type": "application/json",
                "X-Master-Key": MASTER_KEY
            }
        }
        //axios.put has three parameters:
        //1. URL Endpoint
        //2. Data to send over
        //3. Configuration Options
        const response = await axios.put(`${JSON_BIN_BASE_URL}/b/${JSON_BIN_ID}`, books, config);
        return response.data;
    } catch (e) {
        console.error("Error saving data:", e);
        return {
            "error": e
        }
    }
}

function addBook(books, title, author, pages) {
    const newBook = {
        "id": Math.floor(Math.random() * 10000 + 1),
        "title": title,
        "author": author,
        "Pages": pages
    }
    books.push(newBook);
}