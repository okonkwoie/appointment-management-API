const Joi = require('joi')

const appointmentSchema = Joi.object({
    userId: Joi.string()
               .required(),
    service: Joi.string()
               .required(),
    date: Joi.date()
               .required(),
    time: Joi.string()
               .required(),
    location: Joi.string()
               .required(),
    status: Joi.string()
})


async function appointmentvalidMW(res, req, next){
    const appointmentPayload = req.body

    try {
        await appointmentSchema.validateAsync(appointmentPayload)
        next()
    } catch (error) {
        res.status(404).send({
            message: 'Validation failed'
        })
    }
    
}

module.exports = appointmentvalidMW
