const express = require('express');
const cors = require('cors');
const formData = require("express-form-data");

let books: Array<Book> = [];

const stor = {
   books
};

//. createBook(book){} - создание книги
// 2. getBook(id){} - получение книги по id
// 3. getBooks(){} - получение всех книг
// 4. updateBook(id){} - обновление книги
// 5. deleteBook(id){}

[1, 2, 3].map(el => {
    const newBook: Book = {
        title:`book N${el}`,
        description: `desc book ${el}`,
        favorite:"",
        fileCover:"",
        fileName:"",
        id:""
    }
    stor.books.push(newBook);
});


const app = express();
app.use(formData.parse());
app.use(cors());

app.get('/api/books', (req:Request, res:Response) => {
    const {books} = stor;
    res.json(books);
});

app.get('/api/books/:id', (req:Request, res:Response) => {
    const {books} = stor;
    const {id} = req.params;
    const index = books.findIndex(el => el.id === id);

    if (index !== -1) {
        res.json(books[index]);
    } else {
        res.status(404);
        res.json(`Book id=${id} not found`);
    }
});

app.post('/api/books', (req:Request, res:Response) => {
    const {title, description, favorite,
        fileCover, fileName} = req.body;
    const {books} = stor;
    const book = new Book(title, description, favorite, fileCover, fileName);
    books.push(book);
    res.status(201);
    res.json(book);
});


app.put('/api/books/:id', (req:Request, res:Response) => {
    const {books} = stor;
    const {id} = req.params;
    const index = books.findIndex(el => el.id === id);

    if (index !== -1) {
        let book = books[index];
        const {title, description, favorite,
            fileCover, fileName} = req.body;
        book = {
            ...books[index],
            title,
            description,
            favorite,
            fileCover,
            fileName
        };
        res.json(book);
    } else {
        res.status(404);
        res.json(`Book id=${id} not found`);
    }

});

app.delete('/api/books/:id', (req:Request, res:Response) => {
    const {books} = stor;
    const {id} = req.params;
    const index = books.findIndex(el => el.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        res.json('ok');
    } else {
        res.status(404);
        res.json(`Book id=${id} not found`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
