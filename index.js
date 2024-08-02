import express from 'express';
import './db.mjs'; // Ensure this file establishes the connection to MongoDB
import register from './Controller/register.mjs';
import login from './Controller/login.mjs';
import User from './models/user.mjs';
import getallUsers from './Controller/getallUsers.mjs';
import Person from './models/Person.js';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

app.use(express.json());



app.post('/register', register);
app.post('/login', login);
app.get('/users',getallUsers);
app.get('/users/:id',getallUsers);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




// for (let i = 0; i < numbers.length; i++) {
//     console.log(numbers[i]);
// }


// const person = {
//     name: "Rizwan Ashiq",
//     age: 30,
//     isPakistani: true,
//     education: ["BS Information Technology", "MS Computer Science"],
//     dob: {
//         day: 10,
//         month: 7,
//         year: 1996,
//     },
// };

// delete person.age
// console.log(person)