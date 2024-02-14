const jwt = require('jsonwebtoken');
const jwtPassword = process.env.jwtSecret;
const { User } = require('../db/index.js')

async function userMiddleware(req, res, next) {
    try{
        const receivedToken = req.headers.authorization;
        const tokenArray = receivedToken.split(" ");
        const userJwt = tokenArray[1];
        const jwtVerifyOutput = jwt.verify(userJwt, jwtPassword);
        const jwtUsername = jwtVerifyOutput.username;
        if (jwtUsername) {
            req.username = jwtUsername;
            next();
        } else {
            res.status(403).json({
                msg: "You are not authorised"
            })
        }
    } catch(error) {
        console.error(error.message)
        console.error(error);
        res.status(400).json({message: "Bad Request!"});
    }
}

module.exports = userMiddleware;