const Router = require('express')
const router = new Router()
const registrationRouter = require('./RegistationRouter')
const userController = require('../controllers/UserController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/auth',)
router.use('/signup', registrationRouter)
router.get('/employeeroles', checkRoleMiddleware(['admin']), userController.getEmployeeRoles)
router.post('/login', userController.login)
router.post('/addchild', authMiddleware, userController.addChild)
router.get('/getchilds', authMiddleware, userController.getChildsByParent)

module.exports = router