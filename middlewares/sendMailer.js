const nodemailer = require('nodemailer');

const sendMail = async option => {
    const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS
        }
    })
    
    const mailOption = {
        from: process.env.MAIL,
        to: option.to,
        subject: 'استخاره',
        text: option.text
    }
    
    return new Promise ((resolve, reject) => {transporter.sendMail(mailOption, (error, info) => {
        if(error) {
            console.log(error);
            reject(false);
        } else {
            console.log('email send.');
            resolve(true);
        }
    })
})

}

module.exports = sendMail;