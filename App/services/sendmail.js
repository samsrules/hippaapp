const nodemailer = require('nodemailer');

var FCM = require('fcm-node');
var serverKey = 'AAAALgE4Pu4:APA91bG7aGM3xFLqIetlsc-BOwx_vF91X8PA5rv4wgu0IFfVecr1CnxQaevFyX6tiPQ0usQmqJKQSpcnBOMuTUoujl-uV5a9gNetTlHa9rtNzFFLmknh6lC-ZyNL2xC9BJQ-NNABluED'; //put your server key here
var fcm = new FCM(serverKey);

module.exports = {
    sendmail : (subject, to, from= '"Hippa " <info@hippa.com>', html, text, files) => {
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
    },

    sendNotifications : (token, message, title, data) => {
        const fcm_token=token;
        const alert_message=message;
        var data=data;
        var title = title;
             let sendNotifcation = new Promise(function(resolve,reject){
                   
                    if(fcm_token && alert_message)
                    {
                        console.log(alert_message+'--'+title)
                        
                        var token=fcm_token;
                        var message = { 
                            to: token, 
                            notification: {
                                title: title, //title of notification 
                                body: alert_message, //content of the notification
                                sound: "default",
                                icon: "https://dev.rymindr.com/images/logo_signup.png" //default notification icon
                            },
                            data: data //payload you want to send with your notification
                        };
                        fcm.send(message, function(err, response)
                        {
                            if (err) {
                               // console.log("Notification not sent");
                                reject(err);
                               
                            } 
                                //console.log("Successfully sent with response: ", response);
                                resolve(response);
                                
                            
                        });
                    } else {
                        //console.log("Oops! Something went wrong. There was a problem with Hippa. Please try again");
                        //return res.status(400).json(response);
                    }
             })

             return sendNotifcation;
        
        
        
        },
}
