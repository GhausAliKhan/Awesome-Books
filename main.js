const form = document.getElementById("form");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const booksList = document.getElementById("booksList");

let books = [];
let id = 0;

function addBook() {
  localStorage.setItem("books", JSON.stringify(books));
}
class Collection {
  static loadBooks() {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    if (storedBooks) {
      books = storedBooks;
      books.forEach((book) => Collection.createBook(book));
    }
  }

  static createBook(book) {
    const addNewBook = document.createElement("tr");
    addNewBook.innerHTML = `
      <td>"${book.title}" by ${book.author}
      <button type="button" class="remove-btn" data-id="${book.id}">Remove</button>
      </td>
    `;
    booksList.appendChild(addNewBook);
  }

  static clearingFields() {
    titleInput.value = "";
    authorInput.value = "";
  }

  static removeBook(id) {
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
      books.splice(index, 1);
      booksList.innerHTML = "";
      books.forEach((book) => Collection.createBook(book));
      addBook();
    }
  }
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;

  if (title === "" || author === "") {
    alert("Please Add title and author");
    return;
  }

  const book = {
    title,
    author,
    id: (id += 1),
  };
  books.push(book);
  Collection.createBook(book);
  Collection.clearingFields();
  addBook();
});

document.addEventListener("DOMContentLoaded", Collection.loadBooks);

booksList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) {
    const id = parseInt(event.target.getAttribute("data-id"), 10);
    Collection.removeBook(id);
  }
});
