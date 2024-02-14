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

async function getPublishedCourses() {
    console.log("here")
    const courses = await Course.find({});
    console.log("here2")
    let publishedCourses = courses.filter((element) => {
        return element.published == true
    });
    console.log(`here again ${typeof publishedCourses}`);
    return publishedCourses;
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
        res.status(500).json({message: 'Internal Server Error!'});
        console.log("console.error(err.message)");
        console.error(err.message);
        console.log("\nconsole.log(err.messsage): ");
        console.log(err.messsage)
        console.log("\nconsole.log(err):");
        console.log(err);
        console.log("\nconsole.error(err):");
        console.error(err);
    }
    
});

router.get('/courses', async (req, res) => {
    try {
        const publicCourses = await getPublishedCourses()
        res.status(200).json({publicCourses})
    } catch(err) {
        res.status(500).json({message:"Server Error!"});
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    let username = req.username;
    console.log(courseId);
    
    const publishedCourses = await getPublishedCourses();
    let courseExists = false;
    publishedCourses.forEach((element) => {
        if (element._id == courseId){
            courseExists = true;
            return;
        }
    })
    if (courseExists) {
        try {
            // :TODO: Check if user already has the course in the array of user.courses; if yes, throw an error
            const updateExecuted = await User.findOneAndUpdate({username}, {$push: {courses: courseId} });
            if (!updateExecuted) {
                throw new Error("User Not Found!");
            } else {
                res.status(200).json({message: `Course ${courseId} added under user ${username}`})
            }
        } catch(err) {
            res.status(400).json({message: `${err.message}`})
            console.log(err.message)
        }
    } else {
        res.status(400).json({message: "Course doesn't exist"})
    }
    
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const username = req.username;
    try {
        const user = await User.findOne({username}).populate('courses').exec();
        const purchasedCourses = user.courses;
        res.status(200).json({purchasedCourses})
    }catch(err) {
        console.log(err.message);
        res.status(500).json({message: "Server Error"});
    }
});

module.exports = router