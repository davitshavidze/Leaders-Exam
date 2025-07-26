// Api არ გვაქ გავლილი ბოლომდე და srry, ასე გამოვძვრები xD

const books = [
  { id: 1, title: "Hogwarts", author: "Genaddy" },
  { id: 2, title: "Hello me", author: "Hello kitty" },
  { id: 3, title: "Knights", author: "Joe mama" },
  { id: 4, title: "Forever me", author: "Shmipanzini Bananini" },
  { id: 5, title: "Get out", author: "Gabrieli" },
  { id: 6, title: "Love Kvara", author: "Mevludi" },
  { id: 7, title: "Love Me", author: "Dato" },
  { id: 8, title: "Kvara dagvinde xD", author: "Lika" },
  { id: 9, title: "Shavi qva", author: "Nika" },
  { id: 10, title: "Present for blood", author: "Giga" },
];

const form = document.getElementById("form-container");
const library = document.getElementById("library");
const mess = document.getElementById("message");
const bookList = document.getElementById("books-list");
const favList = document.getElementById("favourite-list");

function registration() {
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!email || !pass) {
    alert("Fill al the blanks");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find((user) => user.email === email)) {
    alert("User already exist");
    return;
  }

  users.push({ email, pass });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Congrats, you registered!");
  return;
}

let favorites = JSON.parse(localStorage.getItem("favorites")) || []

function login() {
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find((user) => user.email === email && user.pass === pass);

  if (user) {
    localStorage.setItem("users", email);
    alert("Loggined Succesfully!")
  } else {
    alert("Invalid password or email!");
  }
}

function displayBook() {
  bookList.innerHTML = "";

  books.forEach((el) => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <h3>${el.title}</h3>
      <p>Author: ${el.author}<p>
      <button onclick="addToFav(${el.id})" id="addFavBtn">Add to favorite</button>
    `;

    bookList.appendChild(card);
  });
}

function displayFav(id) {
  favList.innerHTML = "";
  if (favList.length === 0) {
    favList.innerHTML = `<p style="text-align: center;">No Favourite Books</p>`;
    return
  }

  favorites.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <button onclick="remFromFav(${book.id})" id="addFavBtn" style="margin-bottom: 10px;">Remove from Favorites</button>
    
    `
    favList.appendChild(card)
  })
}

function addToFav(id) {
  const book = books.find((b) => b.id === id);
 
  if(!favorites.find(b => b.id === id)){
    favorites.push(book)
    localStorage.setItem("favorites", JSON.stringify(favorites))
    books.pop(book)
    displayFav()
    displayBook()
  }
}


function remFromFav(id){
  favorites = favorites.filter(b => b.id !== id)
  localStorage.setItem("favorites", JSON.stringify(favorites))
  displayFav()
}

displayBook()
displayFav()
