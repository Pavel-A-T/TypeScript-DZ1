let books: Array<Book> = [];

[1, 2, 3].map(el => {
    const newBook: Book = {
        title:`book N${el}`,
        description: `desc book ${el}`,
        favorite:"",
        fileCover:"",
        fileName:"",
        id:""
    }
    books.push(newBook);
});

//createBook(book){} - создание книги
function createBook(book:Book):Book{
    books.push(book);
    return book;
}

//getBook(id){} - получение книги по id
function getBook(id:string):Book{
    const index = books.findIndex(el => el.id === id);
    if (index !== -1) {
        return  books[index];
    } else {
        return null;
    }
}

// 3. getBooks(){} - получение всех книг
function getBooks():string{
   return JSON.stringify(books);
}

// 4. updateBook(book:Book){} - обновление книги
function updateBook(book:Book):boolean{
    const index = books.findIndex(el => el.id === book.id);
    if (index !== -1) {
        books[index] = book;
        return true;
    }
    return false;
}

// 5. deleteBook(id){}
function deleteBook(id:string):boolean{
    const index = books.findIndex(el => el.id === id);
    if (index !== -1) {
        books.splice(index, 1);
        return true;
    }
    return false;
 }
