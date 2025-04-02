const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const methodOverride = require("method-override");
const app = express();
const port = 3000;
app.use(methodOverride("_method"));
app.use(morgan("dev"));

const Book = require("./models/book.js");
app.use(express.urlencoded({ extended: false }));
mongoose.connect(process.env.MONGODB_URI);

app.get("/", async (req, res) => {
    res.render("home.ejs");
});

app.get('/library/new', (req, res) => {
    res.render('library/new.ejs');
});


app.post("/library", async (req,res) => {
    if(req.body.haveRead === "on") {
        req.body.haveRead = true;
    } else {
        req.body.haveRead = false;
    }
    await Book.create(req.body);
    res.redirect("/library");

    await Book.findByIdAndUpdate(req.params.bookId, req.body);
    res.redirect(`/library/${req.params.bookId}`);
});

app.get("/library", async (req,res) => {
    const alllibrary = await Book.find();
    res.render('library/library.ejs', {library: alllibrary});
});

app.get("/library/:bookId", async (req,res) => {
    const foundBook = await Book.findById(req.params.bookId);
    res.render("library/show.ejs", { book: foundBook });
});

app.delete("/library/:bookId", async (req, res) => {
    await Book.findByIdAndDelete(req.params.bookId);
    res.redirect("/library");
});

app.get("/library/:bookId/edit", async (req, res) => {
    const foundBook = await Book.findById(req.params.bookId);
    console.log(foundBook);
    res.send(`This is the edit route for ${foundBook.title}`);
  });

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

mongoose.connection.on('connected', () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`);
})