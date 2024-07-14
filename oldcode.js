import express from "express";

const app = express();

// controller function

// It takes two parameters, request and response
// request contains all the information about the request
// response contains all the information about the response
function controller (req, res) {
    res.send("Hello World!");
}

function hello (req,res){
    res.send('Hellow World')
}

// route
// pass the controller function as a callback to the route
app.get("/", controller); // attached controller function to the route
app.get("/hello", hello); // attached controller function to the route

// app.get("/users", (req, res) => {
//     const sort = req.query.sort;
//     const limit = req.query.limit;
//     const name = req.query.name;
//     console.log(sort, limit, name); // desc 10 John
//     console.log(req.query); // { sort: 'desc', limit: '10', name: 'John' }
//     // ...
// });

app.get("/users", (req, res) => {
    const authorization = req.headers.authorization;
    console.log(authorization,'auth')
    // ...
});

app.use(express.json());

let books = []

app.post("/book", (req, res) => {
    const book = req.body;

    // Here I am getting the last book's id and adding 1 to it, if there is no book then I am assigning 1 to the ID
    book.id = books.length ? books[books.length - 1].id + 1: 1;

    // Output the book to the console for debugging
    console.log(book);

    // books.push(book) will insert the book object to the books array at the end of the array
    books.push(book);

    res.send("Book is added to the database");
});

app.listen(3000 ,function(){
    console.log('App is listening to port 3000')
});


app.get("/book", (req, res) => {
    res.json(books);
});


app.get("/book/:id", (req, res) => {
    // Reading ID from the URL, + is used to convert string to number
    const id = +req.params.id;

    // Searching books for the id
    const book = books.find((book) => book.id === id);

    // Checking if the book is present
    if (book) {
        // Sending the book as a response with status code 200
        res.status(200).json(book);
    } else {
        // Sending error message with status code 404
        res.status(404).send("Book not found");
    }
});



app.delete("/book/:id", (req, res) => {
    // Reading id from the URL
    const id = +req.params.id;

    // array.filter() method returns a new array with all the elements that pass the test implemented by the provided function
    books = books.filter((i) => i.id !== id);

    res.send("Book is deleted");
});





app.patch("/book/:id", (req, res) => {
    // Reading id from the URL
    const id = +req.params.id;
    const book = req.body;
    book.id = id;

    // Search books for the id and update it with properties in the request
    for (let i = 0; i < books.length; i++) {
        if (book[i].id === id) {
            // Here I am using the spread operator (`...`) to take all the properties
            // from the previous book and add the new properties to it
            books[i] = { ...book[i], ...book };
        }
    }

    res.send("Book is update");
});
