const jwt = require('jsonwebtoken');
const jwtPassword = process.env.jwtSecret;

function userMiddleware(req, res, next) {
    try{
        const receivedToken = req.headers.authorization;
        const tokenArray = receivedToken.split(" ");
        const userJwt = tokenArray[1];

        const jwtVerifyOutput = jwt.verify(userJwt, jwtPassword);
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

module.exports = userMiddleware;