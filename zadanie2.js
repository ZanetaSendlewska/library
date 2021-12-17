class Book {
  constructor(tittle, author, priority, category) {
    this.tittle = tittle;
    this.author = author;
    this.priority = priority;
    this.category = category;
  }
}

let fieldStates = [false, false];
const booksListName = "books";
const redColor = "red";
const whiteColor = "white";

function validateTitle() {
  const titleField = getTittleField();
  if (titleField.value.length >= 1) {
    titleField.style.background = whiteColor;
    fieldStates[0] = true;
  } else {
    fieldStates[0] = false;
    titleField.style.background = redColor;
  }
}

function validateAuthor() {
  const authorField = getAuthorField();
  if (authorField.value.length >= 3) {
    authorField.style.background = whiteColor;
    fieldStates[1] = true;
  } else {
    fieldStates[1] = false;
    authorField.style.background = redColor;
  }
}

function validate() {
  let form = document.getElementById("form");
  form.addEventListener("submit", handleForm);

  validateTitle();
  validateAuthor();
  for (let index = 0; index < fieldStates.length; index++) {
    if (fieldStates[index] == false) {
      return;
    }
  }

  addbook();
}

function addbook() {
  const table = getTable();
  const row = getRow(table);

  const field_priority = getPriorityField();
  const field_category = getCategoryField();

  const book = new Book(
    getTittleField().value,
    getAuthorField().value,
    field_priority.options[field_priority.selectedIndex].text,
    field_category.options[field_category.selectedIndex].text
  );
  add(row, book);

  getTittleField().value = "";
  getAuthorField().value = "";
  getPriorityField().value = 1;
  getCategoryField().value = 1;

  let bookList = getFromLocalStorage();
  bookList.push(book);

  addToLocalStorage(bookList);
}

function addToLocalStorage(list) {
  localStorage.setItem(booksListName, JSON.stringify(list));
}

function getFromLocalStorage() {
  if (booksListName in localStorage) {
    return JSON.parse(localStorage.getItem(booksListName));
  } else {
    return new Array();
  }
}

function loadFromLocalStorage() {
  getFromLocalStorage().forEach(addBookToTable);
}

function addBookToTable(book) {
  const table = getTable();
  const row = getRow(table);
  add(row, book);
}

function add(row, book) {
  const tittle = row.insertCell(0);
  tittle.innerHTML = book.tittle;
  const author = row.insertCell(1);
  author.innerHTML = book.author;
  const priority = row.insertCell(2);
  priority.innerHTML = book.priority;
  const category = row.insertCell(3);
  category.innerHTML = book.category;
}

function getTable() {
  return document.getElementById("Table").getElementsByTagName("tbody")[0];
}

function handleForm(event) {
  event.preventDefault();
}

function getTittleField() {
  return document.getElementById("field_title");
}

function getAuthorField() {
  return document.getElementById("field_author");
}

function getPriorityField() {
  return document.getElementById("field_priority");
}

function getCategoryField() {
  return document.getElementById("field_category");
}

function getRow(table) {
  return table.insertRow(table.rows.length);
}
