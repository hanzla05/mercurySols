import express from 'express';
import './db.mjs'; // Ensure this file establishes the connection to MongoDB
import register from './Controller/register.mjs';
import login from './Controller/login.mjs';
import User from './models/user.mjs';
import getallUsers from './Controller/getallUsers.mjs';
import deleteuserbyid from './Controller/deleteuserbyid.mjs';

const app = express();

app.use(express.json());



app.post('/register', register);
app.post('/login', login);
app.get('/users',getallUsers);
app.delete('/users/:id',deleteuserbyid);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

