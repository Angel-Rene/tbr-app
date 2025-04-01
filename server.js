const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const methodOverride = require("method-override");
const app = express();
const port = 5500;
app.use(methodOverride("_method"));
app.use(morgan("dev"));

const Book = require("./models/library.js");
app.use(express.urlencoded({ extended: false }));
mongoose.connect(process.env.MONGODB_URI);

app.get("/", async (req, res) => {
    res.render("home.ejs");
});

app.get

app.get('/books/new', (req, res) => {
    res.render('books/new.ejs');
});


app.post("/books", async (req,res) => {
    if(req.body.haveRead === "on") {
        req.body.haveRead = true;
    } else {
        req.body.haveRead = false;
    }
    await Book.create(req.body);
    res.redirect("/books");
});

app.get("/library", async (req,res) => {
    const allBooks = await Book.find();
    res.render('books/library.ejs', {library: allBooks});
});



app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

mongoose.connection.on('connected', () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`);
})