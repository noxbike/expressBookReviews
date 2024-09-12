const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const secretkey = "noxbike_secret";

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    for (user in users) {
        if(users[user]['username'] == username){
            return true
        }
    }
    return false
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    for(user in users) {
        let thisUser = users[user]
        if (thisUser['username'] == username && thisUser['password'] == password) {
            return true
        }
    }
    return false
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const { username, password } = req.body;

  let auth = authenticatedUser(username, password);

  if (auth) {
    const token = jwt.sign({ username }, secretkey, { expiresIn: '1hr' })
    return res.status(300).json({ message: token })
  } else {
      return res.status(401).json({ message: "Username or password is incorrect !" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const token = req.headers['authorization'];
  const { isbn } = req.params;
  const { review } = req.body;
  
  if (!books[isbn]) {
    return res.status(404).json({ message: "book not found!" })
  }

  if (!token) {
    return res.status(401).json({ message: "You should login to write a review." })
  }
  
  jwt.verify(token, secretkey, (err, decoded) => {
    if (err) {
        return res.status(401).json({message: 'invalid token'})
    } else {
        let reviews = books[isbn]['reviews'];
        reviews[decoded.username] = review
        return res.status(300) .json({message: books[isbn]})
    }
  })
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
