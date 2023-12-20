const jwt = require('jsonwebtoken');

const authenticated = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if(!authHeader) {
            const error = new Error('توکن ندادی که بخوام ببینم احراز هویت شدی یا نه.');
            error.statusCode = 401;
            throw error;
        }
        
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) throw new Error('توکن دست کاری شده میدی بم.');

        req.user = decodedToken.user;
        next();
        
    } catch (err) {
        return res.status(err.statusCode || 400).json({
            success: false,
            message: err.message || 'یه جا یه مشکلی هست.'
        }) 
    }
}

module.exports = {
    authenticated,
};