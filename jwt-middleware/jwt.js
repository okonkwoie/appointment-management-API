const jwt = require('jsonwebtoken');
require('dotenv').config()

async function jwtMiddleware(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded =  await jwt.verify(token, process.env.secret_key);
        req.user = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).send({ 
            message: 'Unauthorized' 
        });
    }
}

module.exports = jwtMiddleware