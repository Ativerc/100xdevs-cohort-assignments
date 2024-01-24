const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        // Check if username exists in DB
        const existingUser = await User.findOne({username});
        if (existingUser) {
            res.status(400).send('User already exists!');
        } else {
            await User.create({
                username,
                password
            });
            res.status(201).json({
                message: "User created successfully"
            })
        }

    } catch(err) {
        console.error(error);
        res.status(500).send('Internal Server Error')
    }
});

router.get('/courses', userMiddleware, async (req, res) => {
    try {
        const allCourses = await Course.find({});
        res.status(200).json(allCourses);
    } catch (err) {
        console.error(err.message);
    }
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router