const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();

const {Admin, Course} = require("../db/index.js")



const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    type: String
})



// Admin Routes
router.post('/signup', async (req, res) => {
    try {
            // Implement admin signup logic
        const username = req.body.username;
        const password = req.body.password;
        // check if username/password combo exits in DB
        const existingAdmin = await Admin.findOne({username})
        if (existingAdmin) {
            res.status(400).send('Username already exists!')
        } else {
            await Admin.create( {username, password} );
            res.status(201).json({ message: 'Admin created successfully' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    
    try {
        const newCourse = await Course({
            title,
            description, 
            price,
            imageLink
        });

        res.json({
            message: 'Course created successfully', courseId: newCourse._id
        })
    } catch(err) {
        console.log(err.message)
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const allCourses = await Course.find({});
        res.status(200).json(allCourses);
    } catch(err) {
        console.log(err.message);
    }
});

module.exports = router;