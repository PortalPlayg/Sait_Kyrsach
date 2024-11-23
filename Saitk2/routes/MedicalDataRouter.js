const Router = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const MedicalDataController = require('../controllers/MedicalDataController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const router = new Router()

router.post('/add', authMiddleware, MedicalDataController.addMedicalData)
router.get('/:shiftId/fullreportbyshift', checkRoleMiddleware(['admin', 'doctor']), MedicalDataController.getFullReport)
router.get('/:shiftId/reportforcoocker', checkRoleMiddleware(['admin', 'coocker']), MedicalDataController.getReportForCoocker)
router.post('/getreportbychild', checkRoleMiddleware(['admin', 'docktor']), MedicalDataController.getReportByChild)

module.exports = router