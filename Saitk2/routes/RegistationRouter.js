const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')


router.post('/', userController.registration)
router.post('/employee', checkRoleMiddleware(['admin']), userController.registrationEmployee)
router.post('/confirm', checkRoleMiddleware(['admin']), userController.confirmRegistration)
router.get('/confirm', checkRoleMiddleware(["admin"]), userController.getConfirmationUsers)

module.exports = router