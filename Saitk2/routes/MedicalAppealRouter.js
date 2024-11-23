const Router = require('express')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const MedicalAppealController = require('../controllers/MedicalAppealController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.post('/create', authMiddleware, MedicalAppealController.register)
router.post('/getreport', checkRoleMiddleware(['admin', 'doctor']), MedicalAppealController.getReportByDate)
router.get('/getdisease', authMiddleware, MedicalAppealController.getDisease)

module.exports = router 