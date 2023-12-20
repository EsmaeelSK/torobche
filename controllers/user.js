const User = require('../models/user');
const bcrypt = require('bcryptjs');

const login = async (req, res, next) => {
    try{
        let accessToken;
        const { email, password } = req.query;
        const user = await User.findOne({ email });
        if(!user) {
            const newUser = await User.create({ email, password });
 
            accessToken = jwt.sign({user: { id: newUser.id, email }}, process.env.JWT_SECRET);
            const refreshToken = jwt.sign({ accessToken }, process.env.JWT_SECRET);
            return res.status(426).json({ accessToken, refreshToken });
        }
        else {
            if(!await bcrypt.compare(password, user.password)) throw new Error('این بده که رمز اشتباهی میزنی.');
            
            const { id, name } = user;
            accessToken = jwt.sign({user: { id, name, email }}, process.env.JWT_SECRET);

        }
        
        const refreshToken = jwt.sign({ accessToken }, process.env.JWT_SECRET);
        
        return res.status(200).json({success: true, accessToken, refreshToken});
    } catch (err) {
        next(err);
    }
    
}

// const forgotPassword = async (req, res, next) => {
//     try{
//         const { email } = req.query;
//         const user = await User.findOne({ email });
//         if(!user) throw new Error('با این ایمیل ثبت نام نکردی.');

//         const token = bcrypt.hash(req.query, 10);
//         user.token = token;
//         const url = `/api/user/pass/${token}`;
//         // send email
        
//         await user.save();
//         return res.status(200).json();
        
//     } catch (err) {
//         next(err);
//     }

// }

const updateUser = async (req, res, next) => {
    try {
        const { name } = req.body;
        await User.findByIdAndUpdate(req.query.userId, { name });
        return res.status(200);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    login,
    updateUser
}

