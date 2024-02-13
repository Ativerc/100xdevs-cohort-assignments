const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index.js")

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    /*
    * Get username and password
    * Does this username already exist in the database? -> ERR
    * Doesn't exist? Save username and password and send bacj SUCCESS message
    */ 
    const username = req.body.username;
    const password = req.body.password;

    const userExists = await User.findOne({username}).exec();
    if (userExists) {
        res.status(400).json({message: "User Already Exists!"});
    } else {
        await User.create({username, password});
        res.status(200).json({message: 'User created successfully'});
    }
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router