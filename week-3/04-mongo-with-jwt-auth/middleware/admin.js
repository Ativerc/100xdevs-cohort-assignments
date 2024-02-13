const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret


// Middleware for handling auth
function adminMiddleware(req, res, next) {
    try {
        const receivedToken = req.headers.authorization;
        const tokenArray = receivedToken.split(" ");
        const actualJwtToken = tokenArray[1];

        const jwtVerifyOutput = jwt.verify(actualJwtToken, jwtSecret);
        if (jwtVerifyOutput.username) {
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    } catch(error) {
        console.error(error.message)
        console.error(error);
    }
}

module.exports = adminMiddleware;