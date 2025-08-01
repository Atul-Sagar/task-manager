const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')){

            try{

                token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                // Attach user info (without password) to request object
                req.user = await User.findById(decoded.userId).select('-password');
                next();

            }catch(err){
                return res.status(401).json({ message: 'Invalid or expired token' })
            }
    }else{
        return res.status(401).json({ message: 'No token provided' })
    }

}

module.exports = {
    protect
}