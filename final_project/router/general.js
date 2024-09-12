const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let strBooks = JSON.stringify(books);

  if (strBooks.length > 2) {
    return res.status(300).json({message: strBooks});
  } else {
    return res.status(404).json({message: "empty list"})
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const { isbn } = req.params;

  if (books[isbn]) {
    return res.status(300).json({message: books[isbn]})
  } else {
    return res.status(404).json({message: "book not found!"})
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const { author } = req.params;
  const list = [];

  for (book in books) {
      if (books[book]['author'] == author) {
        list.push(books[book])
    }
  }
  
  if (list.length > 0) {
    return res.status(300).json({message: list});
  } else {
    return res.status(404).json({message: "author not found"})
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
