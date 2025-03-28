const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const app = express;
mongoose.connect(process.env.MONGODB_URI);
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(morgan("dev"));


app.get("/", async (req,res) => {
    res.render("home.ejs");
});

app.get

app.get('/books/new', (req,res) => {
    res.render('books/new.ejs');
});

app.post("/library", async (req,res) => {
    if(req.body.haveRead === "on") {
        req.body.haveRead = true;
    } else {
        req.body.haveRead = false;
    }
    await Book.create(req.body);
    res.redirect("/library");
});



app.listen(3000, () => {
    console.log('listening on port 3000')
});
mongoose.connection.on('connected', () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`);
})