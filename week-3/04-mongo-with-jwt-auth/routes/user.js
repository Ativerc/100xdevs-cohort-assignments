const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index.js")

const jwt = require('jsonwebtoken');
const jwtPassword = process.env.jwtSecret;

function signJwt(username) {
    const payload = {username};
    return jwt.sign(payload, jwtPassword);
}

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    /*
    * Get username and password
    :TODO: Do zod validation on user input
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

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    /*
    * Get username and password
    :TODO:Do zod validation on input
    * Check if username, password combo present in user DB
    * If yes, pass a token as success
    * If no, return password-username combo false
    */
    const username = req.body.username;
    const password = req.body.password;

    try {
        const userExists = await User.findOne({username, password});
        if (userExists) {
            const jwtToken = signJwt(username);
            res.status(200).json({
                token: jwtToken
            })
        } else {
            res.status(403).json({message: "Forbidden! User doesn't exist!"})
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: 'Internal Server Error!'})
    }
    
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