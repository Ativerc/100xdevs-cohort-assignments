const { Router } = require("express");

const { Admin, Course } = require("../db/index.js")

const adminMiddleware = require("../middleware/admin");
const router = Router();

const jwt = require('jsonwebtoken');
const jwtPassword = 'somesecret2346'



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
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;