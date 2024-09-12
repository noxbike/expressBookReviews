const express = require('express');
const bodyparser = require('body-parser')
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const key = "my_secret_key";
const app = express();

app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}))

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
    res.header('Access-Control-allow-Origin', '*/*');
    res.header('Access-Control-Expose-Headers', 'Authorization');
    res.header('Access-Control-AllowHeaders', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    next()
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
