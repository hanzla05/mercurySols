


// import express from "express";

// const app = express();

// // Configuring middlewares
// app.use(express.json());

// // We will keep data here
// let students = [];
// let teachers = [];
// let courses = [];

// // CRUD operations for students 

// app.get("/students", (req, res) => {
//     res.send(students);
// });

// let studentIdCounter = 1;
// app.post("/students", (req, res) => {
//     const newStudent = { ...req.body, id: studentIdCounter++ };
//     students.push(newStudent);
//     res.send(students);
// });


// app.put("/students/:id", (req, res) => {
//     const id = req.params.id;
//     const student = students.find((student) => student.id == id);
//     student.name = req.body.name;
//     res.send(student);
// });

// app.delete("/students/:id", (req, res) => {
//     const id = req.params.id;
//     students = students.filter((student) => student.id != id);
//     res.send(students);
// });

// // CRUD operations for teachers

// app.get("/teachers", (req, res) => {
//     res.send(teachers);
// });

// let teachercounter = 1

// app.post("/teachers", (req, res) => {

//     const newteacher = {...req.body,id:teachercounter++}
//     teachers.push(newteacher);
//     res.send(teachers);
// });

// app.put("/teachers/:id", (req, res) => {
//     const id = req.params.id;
//     const teacher = teachers.find((teacher) => teacher.id == id);
//     teacher.name = req.body.name;
//     res.send(teacher);
// });

// app.delete("/teachers/:id", (req, res) => {
//     const id = req.params.id;
//     teachers = teachers.filter((teacher) => teacher.id != id);
//     res.send(teachers);
// });

// // CRUD operations for courses

// app.get("/courses", (req, res) => {
//     res.send(courses);
// });

// app.post("/courses", (req, res) => {
//     courses.push(req.body);
//     res.send(courses);
// });

// app.put("/courses/:id", (req, res) => {
//     const id = req.params.id;
//     const course = courses.find((course) => course.id == id);
//     course.name = req.body.name;
//     res.send(course);
// });

// app.delete("/courses/:id", (req, res) => {
//     const id = req.params.id;
//     courses = courses.filter((course) => course.id != id);
//     res.send(courses);
// });

// app.listen(3000);


import express from 'express';
import Student from './models/students.mjs';
import './db.mjs'; // Ensure this file establishes the connection to MongoDB
import Counter from './models/Counter.mjs';
import User from './models/user.mjs';
import bcrypt from 'bcrypt';
import register from './Controller/register.mjs';

const app = express();

app.use(express.json());

const getNextSequenceValue = async (sequenceName) => {
    const counter = await Counter.findByIdAndUpdate(
        sequenceName,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return counter.seq;
};

app.post('/students', async (req, res) => {
    try {
        const studentId = await getNextSequenceValue('studentId');
        const newStudent = new Student({ ...req.body, id: studentId });
        await newStudent.save();
        res.status(201).send(newStudent);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).send(students);
    } catch (error) {
        res.status(400).send(error);
    }
});


// app.delete('/students/:id', async (req, res) => {
//     try {
//         const student = await Student.findByIdAndDelete(req.params.id);
//         if (!student) {
//             return res.status(404).send('Student not found');
//         }
//         res.status(200).send(`Student with ID ${req.params.id} deleted`);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

app.delete('/students/:id', async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({ id: req.params.id });
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.status(200).send(`Student with ID ${req.params.id} deleted`);
    } catch (error) {
        res.status(400).send(error);
    }
});


// app.post('/register', async (req, res) => {
//     try {
//         const { name, email, phone, password } = req.body;
//         const newUser = new User({ name, email, phone, password });
//         await newUser.save();
//         res.status(201).send(newUser);
//     } catch (error) {
//         if (error.code === 11000) {
//             // Handle duplicate email error
//             return res.status(400).send('Email already in use');
//         }
//         res.status(400).send(error);
//     }
// });

app.post('/register', register);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

