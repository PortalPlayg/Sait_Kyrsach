const Router = require('express')
const router = new Router()

const userRouter = require('./UserRouter')
const shiftRouter = require('./ShiftRouter')
const medicalDataRouter = require('./MedicalDataRouter')
const medicalAppealRouter = require('./MedicalAppealRouter')

router.use('/medicalappeal', medicalAppealRouter)
router.use('/user', userRouter)
router.use('/shift', shiftRouter)
router.use('/medicaldata', medicalDataRouter)

module.exports = router 