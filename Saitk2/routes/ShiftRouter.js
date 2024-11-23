const Router = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const ShiftController = require('../controllers/ShiftController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const router = new Router()


function checkUserType(req, res, next) {
	if (req.user.role_id === null) {
		return ShiftController.getShiftsForParents(req, res, next);
	} else {
		return ShiftController.getAllShiftsForAdmin(req, res, next);
	}
}

router.get('/', authMiddleware, checkUserType)
router.post('/', checkRoleMiddleware(['admin']), ShiftController.create)
router.get('/:shiftId/childs', checkRoleMiddleware(['admin']), ShiftController.getChildsFromShift)
router.post('/:shiftId/addchild', authMiddleware, ShiftController.addChild)
router.patch('/:shiftId/addchild', checkRoleMiddleware(['admin']), ShiftController.confirmChildShift)
router.get('/canteen-report', authMiddleware, ShiftController.canteenReport)

module.exports = router