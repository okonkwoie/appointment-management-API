const express = require('express')
const appointmentController = require('../controllers/appointment')
const appointmentvalidMW = require('../validation/appointment')
const jwtMiddleware = require('../jwt-middleware/jwt')


const appointmentRouter = express.Router()

// get all appointments
appointmentRouter.get('/', appointmentController.getAllAppointment)

// get an appointment by id
appointmentRouter.get('/:id', appointmentController.getAppointmentByID)

// create/book an appointment
appointmentRouter.post('/create', appointmentvalidMW, appointmentController.createAppointment)

// update/edit appointment
appointmentRouter.put('/update/:id', appointmentController.updateAppointment)

// delete appointment 
appointmentRouter.delete('/delete/:id', appointmentController.deleteAppointment)

// change appointment status
appointmentRouter.put('/status/:id', appointmentController.changeAppointmentStatus)

// allow user get his/her own appointments
appointmentRouter.get('/userAppointment', jwtMiddleware, appointmentController.getUserAppointments)




module.exports = appointmentRouter