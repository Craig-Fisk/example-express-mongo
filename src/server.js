require("dotenv").config();

require("./db/connections");

const express = require("express");

const Book = require("./books/model");

const app = express();
app.use(express.json());
const port = 5001;

app.post("/books/addbook", async (request, response) => {
    const newBook = await Book.create({
        title: request.body.title,
        author: request.body.author,
        genre: request.body.genre,
    });

    const successResponse = {
        message: `Successfully added ${request.body.title}`,
        book: newBook,
    };

    response.send(successResponse);
});

app.get("/books/getallbooks", async (request, response) => {
    const allbooks = await Book.find({});

    const successResponse = {
        message: "Successfully collected all books",
        books: allbooks,
    };

    response.json(successResponse);
});

app.put("/books/updatebookauthor", async (request, response) => {
    const updatedBook = await Book.updateOne(
        {
            author: request.body.oldAuthor,
        },
        {
            author: request.body.newAuthor,
        }
    );

    const successResponse = {
        message: `Successfully replaced ${request.body.oldAuthor} with ${request.body.newAuthor} on ${updatedBook.modifiedCount} book`,
        updatedBook: updatedBook,
    };

    response.json(successResponse);
});

app.delete("/books/deletebook", async (request, response) => {
    const deletedBook = await Book.deleteOne({
        title: request.body.title,
    });

    const successResponse = {
        message: `Successfully deleted ${request.body.title}`,
        deletedBook: deletedBook,
    };

    response.json(successResponse);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
