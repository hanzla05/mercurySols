import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: String,
    age: Number,
    email: String,
    // Add other fields as necessary
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
