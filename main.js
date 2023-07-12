const form = document.getElementById('form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const booksList = document.getElementById('booksList');

let books = [];
let id = 0;

//  Inner Html Generating Books

function createBook(book) {
  const newBook = document.createElement('li');
  newBook.innerHTML = `
    <div>${book.title}</div>
    <div>${book.author}</div>
    <button type="button" class="remove-btn" data-id="${book.id}">Remove</button>
    <hr>
  `;
  booksList.appendChild(newBook);
}
// Clearing Fields

function clearingFields() {
  titleInput.value = '';
  authorInput.value = '';
}

// Remove Book

function removeBook(id) {
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
  }
}

// Update Books

function updateBooks() {
  while (booksList.firstChild) {
    booksList.firstChild.remove();
  }
  books.forEach((book) => createBook(book));
}

// Store books

function addBook() {
  localStorage.setItem('Books', JSON.stringify(books));
}

// Load books

function loadCollection() {
  const storedBooks = JSON.parse(localStorage.getItem('Books'));
  if (storedBooks) {
    books = storedBooks;
    updateBooks();
  }
}

booksList.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-btn')) {
    const id = parseInt(event.target.getAttribute('data-id'), 10);
    removeBook(id);
    updateBooks();
    addBook();
  }
});

// Creating collection
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;

  if (title === '' || author === '') {
    alert('Please Add title and author');
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

loadCollection();
