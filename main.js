const form = document.getElementById("form");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const booksList = document.getElementById("booksList");

let books = [];
let id = 0;

function addBook() {
  localStorage.setItem("books", JSON.stringify(books));
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
  createBook(book);
  clearingFields();
  addBook();
});

document.addEventListener("DOMContentLoaded", loadBooks());

booksList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) {
    const id = parseInt(event.target.getAttribute("data-id"), 10);
    removeBook(id);
  }
});
