const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(401).json({ message: "Username or password is missing !" })
    }

    let findSameUsername = isValid(username);

    if (findSameUsername) {
        return res.status(401).json({ message: "User already exist!"})
    } else {
        users.push({ 'username': username, 'password': password })
        
        return res.status(300).json({ message: "You have been registered. Now you can login" });
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //Write your code here
    const getAllBooks = new Promise((resolve, reject) => {
        let strBooks = JSON.stringify(books);

        if (strBooks.length > 2) {
            resolve({ message: strBooks });
        } else {
            reject({ message: "empty list" })
        }
    })
    getAllBooks.then((succ) => {
        return res.status(200).json(succ)
    }) .catch((err) => {
        return res.status(404).json(err)
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    const { isbn } = req.params;
    
    const getBookByIsbn = new Promise((resolve, reject) => {
        if (books[isbn]) {
            resolve(books[isbn])
        } else {
            reject('book not found!')
        }
    })
    getBookByIsbn.then((succ) => {
        return res.status(300).json({ message: succ})
    }).catch(err => {
        return res.status(404).json({ message: err })
    })
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    const { author } = req.params;
    const list = [];

    const getBooksByAuthor = new Promise((resolve, reject) =>{
            for (book in books) {
                if (books[book]['author'] == author) {
                    list.push(books[book])
                }
            }
        if (list.length > 0) {
            resolve(list)
        } else {
            reject("author not found!")
        }
    })

    getBooksByAuthor.then((succ) => {
        return res.status(300).json({ message: succ });
    }) .catch((err) => {
        return res.status(404).json({ message: err })
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
    const { title } = req.params;
    const getBookByTitle = new Promise((resolve, reject) => {
        for (book in books) {
            if (books[book]['title'] == title) {
                resolve(books[book])
            }
        }
        reject("Book not found!")
    })
    getBookByTitle.then((succ) => {
        return res.status(300).json({ message: succ })
    }) .catch((err) => {
        return res.status(404).json({ message: err });
    })

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
    const { isbn } = req.params;

    if (books[isbn]) {
        return res.status(300).json({ message: books[isbn]['reviews'] })
    } else {
        return res.status(404).json({ message: "book not found!" });
    }
});

module.exports.general = public_users;
