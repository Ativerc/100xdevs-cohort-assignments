const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

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

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const purchasedCourse = req.params.courseId
    try {
        const purchasedCourseExists = await Course.findById(purchasedCourse);
        if (!purchasedCourseExists) {
            return res.status(404).send('Course doesn\'t exist!');
        }
        const user = await User.findOne({ username: req.headers.username });
        user.courses = purchasedCourseExists._id
        await user.save()
        res.json({ message: 'Course purchased successfully' })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Something went wrong!')
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const targetUsername = req.headers.username;
    try {
        const user = await User.findOne({
            username: targetUsername
        }).populate('courses').exec();
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json({
            courses: user.courses
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error Occured!');
    }
});

module.exports = router