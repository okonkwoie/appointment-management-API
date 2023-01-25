const cron = require('node-cron')
const nodemailer = require('nodemailer');
const logger = require('../logger/logger');
require('dotenv').config()
const appointmentModel = require('../model/appointment')

function check24HoursAway(appointment){
    let currentTime = new Date();
    let appointmentTime = new Date(appointment.appointmentDate);
    let diff = (appointmentTime - currentTime) / 1000 / 60;  //  converting to minutes

    if (diff === 1440) {
        return true;
    } else {
        return false;
    }
}

// schedule task to run every day at 6pm 
cron.schedule('0 18 * * *', () => {
      appointmentModel.find({appointmentDate: { $gt: new Date() } }, (err, appointments) => {
          if(err) {
              console.log(err);
          } else {
              appointments.forEach(appointment => {
                  if(check24HoursAway(appointment)){
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'oijeoma11@gmail.com',
                            pass: process.env.GMAIL_PASS
                        }
                    });
                    let mailOptions = {
                        from: 'oijeoma11@gmail.com',
                        to: appointment.userEmail,
                        subject: 'Appointment Reminder',
                        text: `You have an appointment with us on ${appointment.appointmentDate}. Please be on time.`
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                  }
              })
          }
      })
   })

   module.exports = {
      check24HoursAway,
      cron
   }