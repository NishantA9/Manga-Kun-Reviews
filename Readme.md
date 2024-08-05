Manga-Kun-Reviews
Manga-Kun-Reviews is a comprehensive book collection application built using Node.js, Express, and PostgreSQL. The application allows users to manage their book collection effectively, providing functionalities to add, view, edit, and delete books. Each book entry includes essential details like ISBN, author, title, description, rating, and the date it was read. The application also integrates with the Open Library API to fetch and display book covers.

Features
Add New Books: Users can add new books to their collection by providing details such as ISBN, author, title, description, rating, and read date.
View Books: The main page displays a list of all books in the collection, sortable by recency, rating, or author.
Edit Books: Users can edit the details of existing books.
Delete Books: Users can delete books from their collection.
Fetch Book Covers: Automatically fetches and displays book covers from the Open Library API based on ISBN.


Installation
Clone the repository to your local machine.

Navigate to the project directory. 
    cd Manga-Kun-Reviews

Install the project dependencies.
    npm install
    npm i nodemon

Set up the database by running the queries.sql file. You can use a PostgreSQL client like psql or a GUI tool like pgAdmin.

Create a .env file in the root of your project and add your database connection string.
    DATABASE_URL=your_database_connection_string

Running the Application: Start the Express server using Nodemon.

nodemon app.js

--------------

Made by Nishant Acharekar


