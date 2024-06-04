const express = require("express");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser");
const booksController = require("./controllers/booksController");

const app = express();
const port = process.env.PORT || 3000;

const staticMiddleware = express.static("public"); // Path to the public folder

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(staticMiddleware); // Mounting staticMiddleware

app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById);
app.post("/books", validateBook, booksController.createBook);

app.listen(port, async () => {
  try {
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit with code 1 indicating an error
  }

  console.log(`Server listening on port ${port}`);
});

process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  await sql.close();
  console.log("Database connection closed");
  process.exit(0); // Exit with code 0 indicating successful shutdown
});

//validation
const validateBook = require("./middlewares/validateBook");

app.post("/books", validateBook, booksController.createBook); // POST for creating books (can handle JSON data)
app.put("/books/:id", booksController.updateBook); // PUT for updating books
app.delete("/books/:id", booksController.deleteBook); // DELETE for deleting books
