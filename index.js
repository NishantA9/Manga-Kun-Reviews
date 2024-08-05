// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books LEFT JOIN covers ON books.isbn = covers.isbn');
        res.render('index', { name: "FE's BOOK Collection", heading: "This is my Book Collection where...", bookList: result.rows });
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

app.post('/add', async (req, res) => {
    const { title, author, descriptions, rating, readOn, isbn } = req.body;

    if (!readOn) {
        return res.status(400).send("Read On date cannot be empty");
    }

    try {
        await pool.query('INSERT INTO books (title, author, descriptions, rating, read_on, isbn) VALUES ($1, $2, $3, $4, $5, $6)', [title, author, descriptions, rating, readOn, isbn]);

        try {
            const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
            await axios.get(coverUrl);
            await pool.query('INSERT INTO covers (imageurl, isbn) VALUES ($1, $2)', [coverUrl, isbn]);
        } catch (coverError) {
            console.error(coverError);
            await pool.query('INSERT INTO covers (imageurl, isbn) VALUES ($1, $2)', ["", isbn]);
        }

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

app.get('/add', (req, res) => {
    res.render('add', { title: "Add New Book" });
});

app.get('/sort', async (req, res) => {
    const { recency, rating, author } = req.query;
    let query = 'SELECT * FROM books LEFT JOIN covers ON books.isbn = covers.isbn';

    if (recency) {
        query += ' ORDER BY read_on DESC';
    } else if (rating) {
        query += ' ORDER BY rating DESC';
    } else if (author) {
        query += ' ORDER BY author ASC';
    }

    try {
        const result = await pool.query(query);
        res.render('index', { name: "Book Collection", heading: "Welcome to Your Book Collection", bookList: result.rows });
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

app.post("/edit", async (req, res) => {
    const {
        editedBookId,
        editedBookAuthor,
        editedBookTitle,
        editedBookDescriptions,
        editedBookRating,
        editedBookReadOn,
    } = req.body;

    try {
        await pool.query(
            "UPDATE books SET title = $1, author = $2, descriptions = $3, rating = $4, read_on = $5 WHERE book_id = $6",
            [
                editedBookTitle,
                editedBookAuthor,
                editedBookDescriptions,
                editedBookRating,
                editedBookReadOn,
                editedBookId,
            ]
        );
        res.redirect("/");
    } catch (error) {
        console.log(error);
        const result = await pool.query("SELECT * FROM books LEFT JOIN covers ON books.isbn = covers.isbn");
        res.render("index", { name: "Book Collection", heading: "Welcome to Your Book Collection", bookList: result.rows, error: "Check your values and retry" });
    }
});

app.post("/delete", async (req, res) => {
    const { bookId } = req.body;

    try {
        await pool.query("DELETE FROM books WHERE book_id = $1", [bookId]);
        res.redirect("/");
    } catch (error) {
        console.log(error);
        const result = await pool.query("SELECT * FROM books LEFT JOIN covers ON books.isbn = covers.isbn");
        res.render("index", { name: "Book Collection", heading: "Welcome to Your Book Collection", bookList: result.rows, error: "Failed to delete the book. Try again." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
