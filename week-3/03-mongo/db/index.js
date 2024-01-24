const mongoose = require('mongoose');

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING

// Connect to MongoDB
mongoose.connect(DB_CONNECTION_STRING);

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String, 
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        refs: true,
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    id: Number,
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

// async function doesAdminExist(userOrAdmin, username, password){
//     if (userOrAdmin == "user") {

//     }
// }

module.exports = {
    Admin,
    User,
    Course
}