const appointmentModel = require('../model/appointment')

// get all appointments
function getAllAppointment(req, res){
    const page = req.query.page || 1
    const pageLimit = req.query.pageLimit || 20
    const skip = ((page - 1) * pageLimit)

    appointmentModel.find()
    .skip(skip)
    .pageLimit(pageLimit)
    .then((appointments) => {
        res.status(200).send({
            data: appointments,
            meta: {
                page: page,
                pageLimit: pageLimit
            }
        })
    })
    .catch((error) => {
        console.log(error);
        res.status(404).send({
            message: 'Cannot get all appointments'
        })
    })
}

function getAppointmentByID(req, res){
    const appointmentID = req.body.id  

    appointmentModel.find(appointmentID)
    .then((appointment) => {
        res.status(200).send(appointment)
    })
    .catch((error) => {
        console.log(error)
        res.status(404).send({
            message: 'Error, cannot get appointment'
        })
    })
}

function createAppointment(req, res){
    const appointment = req.body

    appointmentModel.create(appointment)
    .then((appointment) => {
        res.status(200).send(appointment)
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send({
            message: 'Error, cannot book appointment'
        })
    })
}

function updateAppointment(req, res){
    const appointmentID = req.body.id
    const appointment = req.body

    appointmentModel.findByIdAndUpdate(appointmentID, appointment, {new: true})
    .then((newAppointment) => {
        res.status(200).send(newAppointment)
    })
    .catch((error) => {
        console.log(error)
        res.status(404).send({
            message: 'Error, cannot not edit appointment'
        })
    })
}

function deleteAppointment(req, res){
    const appointmentID = req.body.id

     appointmentModel.findByIdAndDelete(appointmentID)
     .then(() => {
        res.status(200).send({
            message: 'appointment deleted successfully'
        })
     })
     .catch((error) => {
        console.log(error)
        res.status(404).send({
            message: 'Error! appointment could not be deleted'
        })
     })
}

function changeAppointmentStatus(req, res){
    const appointmentID = req.body.id
    const newStatus = req.body 

    appointmentModel.findByIdAndUpdate(appointmentID, { status: newStatus }, {new: true})
    .then((newStatus) => {
        res.status(200).send(newStatus)
    })
    .catch((error) => {
        console.log(error)
        res.status(404).send({
            message: 'Error, cannot update appointment status'
        })
    })
}

function getUserAppointments(req, res){
    appointmentModel.find({ userID: req.user })
    .then((appointments) => {
        res.status(200).send(appointments)
    })
    .catch((error) => {
        console.log(error)
        res.status(404).send({
            message: `Error, cannot get user's appointments`
        })
    })
}




module.exports = {
    getAllAppointment,
    getAppointmentByID,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    changeAppointmentStatus,
    getUserAppointments
}