const nodemailer = require('nodemailer');

module.exports = {
    sendmail : (subject, to, from= '"EZRide SG" <info@ezride.com>', html, text, files) => {
            return new Promise(function(resolve, reject) {
            nodemailer.
            createTestAccount((err, account) => {
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    service: 'gmail',
                    // port: 587,
                    port: 25,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: process.env.EMAIL_USER, // generated ethereal user
                        pass: process.env.EMAIL_PASSWORD // generated ethereal password
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                let mailOptions = {from,to,subject,html};
                // send mail with defined transport object
               transporter.sendMail(mailOptions, (error, info) => {
                    if (error)  {
                        reject(error);
                    }
                    // console.log(info);
                    resolve(info);
                });
              });
            });
    }
}
