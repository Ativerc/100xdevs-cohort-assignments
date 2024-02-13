const { Router } = require("express");

const { Admin, Course } = require("../db/index.js")

const adminMiddleware = require("../middleware/admin");
const router = Router();

const jwt = require('jsonwebtoken');
const jwtPassword = process.env.jwtSecret;



function signJwt(username) {
    const payload = {
        username
    }
    return jwt.sign(payload, jwtPassword);
}
// Admin Routes
router.post('/signup', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const existingAdmin = await Admin.findOne({username}).exec();
        if (existingAdmin) {
            res.status(400).send("Admin already exists!")
        } else {
            await Admin.create( {username, password} );
            res.status(201).json({ message: 'Admin created successfully' })
        }
    } catch(error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



router.post('/signin', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const existingAdmin = await Admin.findOne({username}).exec();
        if (existingAdmin) {
            const passwordMatch = () => {
                return existingAdmin.password == password;
            }
            if (passwordMatch) {
                console.log("send success status")
                // get token
                const jwtToken = signJwt(username)
                // :TODO: Save JWT Token in DB
                res.status(200).json({
                    token: jwtToken
                })
            } else {
                res.status(403).send("Forbidden! User Password Combination Ivalid.")
            }
        } else {
            res.status(403).send("Forbidden. User Doesn't exist")
        }
    } catch(error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // :TODO: Put zod validation here
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const published = req.body.published;
    
    try {
        await Course.create({
            title,
            description,
            price,
            imageLink,
            published
        })
    } catch(error) {
        console.error(error);
    }
    res.status(200).send(`${title} Success Course Created`)
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const allCourses = await Course.find({}).exec();

    res.status(200).json({allCourses});
});

module.exports = router;