const Joi = require('joi');

const validateUser = (level) => {
    return (req, res, next) => {
        try {
            let schema;
            switch (level) {
                case 'signup': 
                    schema = Joi.object({
                        name: Joi.string().min(3).max(255).required(),
                        email: Joi.string().email().required(),
                        password: Joi.string().min(4).max(255).required(),
                        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
                    }).required();
                    break;

                case 'login':
                    schema = Joi.object({
                        email: Joi.string().email().required(),
                        password: Joi.string().min(4).max(255).required()
                    }).required();
                    break;

                case 'forgetPassword':
                    schema = Joi.object({
                        email: Joi.string().email().required(),
                    }).required();
                    break;

                case 'resetPassword':
                    schema = Joi.object({
                        password: Joi.string().min(4).max(255).required(),
                        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
                    }).required();
                    break;
            }
    
            const { error } = schema.validate(req.body, { allowUnknown: true, abortEarly: false });
            if(error) throw error;
            next()
        } catch (err) {
            let message = [];
            for(const error of err.details) {
                message.push(error.message)
            }
            return res.status(400).json({ success: false, message });
        }
    }
}

module.exports = {
    validateUser,
}