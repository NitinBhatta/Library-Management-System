const form = document.getElementById("bookForm");
const tableBody = document.querySelector("#bookTable tbody");
const searchInput = document.getElementById("search");
const filterStatus = document.getElementById("filterStatus");

let books = JSON.parse(localStorage.getItem("books")) || [];

function saveToLocalStorage() {
  localStorage.setItem("books", JSON.stringify(books));
}

function generateID() {
  return Math.floor(Math.random() * 1000000);
}

function renderBooks() {
  tableBody.innerHTML = "";

  const searchTerm = searchInput.value.toLowerCase();
  const filter = filterStatus.value;

  books
    .filter(book => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm);

      const matchesFilter =
        filter === "all" ||
        (filter === "available" && book.status === "Available") ||
        (filter === "borrowed" && book.status === "Borrowed");

      return matchesSearch && matchesFilter;
    })
    .forEach((book, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${book.year}</td>
        <td class="status ${book.status.toLowerCase()}">${book.status}</td>
        <td>${book.borrower || "-"}</td>
        <td>${book.dueDate || "-"}</td>
        <td><button class="delete-btn" data-index="${index}">Delete</button></td>
      `;

      tableBody.appendChild(row);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = form.title.value.trim();
  const author = form.author.value.trim();
  const genre = form.genre.value.trim();
  const year = form.year.value;
  const borrower = form.borrower.value.trim();
  const dueDate = form.dueDate.value;

  if (!title || !author || !genre || !year) return;

  const status = borrower ? "Borrowed" : "Available";

  const book = {
    id: generateID(),
    title,
    author,
    genre,
    year,
    borrower: borrower || "",
    dueDate: dueDate || "",
    status,
  };

  books.push(book);
  saveToLocalStorage();
  renderBooks();
  form.reset();
});

tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    books.splice(index, 1);
    saveToLocalStorage();
    renderBooks();
  }
});

searchInput.addEventListener("input", renderBooks);
filterStatus.addEventListener("change", renderBooks);

renderBooks();
