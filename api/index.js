import express from 'express';
import '../db.mjs'; // Ensure this file establishes the connection to MongoDB
import register from '../Controller/register.mjs';
import login from '../Controller/login.mjs';
import getallUsers from '../Controller/getallUsers.mjs';
import deleteuserbyid from '../Controller/deleteuserbyid.mjs';


const app = express();

app.use(express.json());

app.post('/register', register);
app.post('/login', login);
app.get('/users', getallUsers);
app.delete('/users/:id', deleteuserbyid);

export default app;
