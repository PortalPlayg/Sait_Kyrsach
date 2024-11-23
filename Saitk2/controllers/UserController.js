const APIErrors = require("../errors/APIErrors");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sequelize = require('../db');
const { Parent, Employee, Child, EmployeeRole } = require("../models/models");


const generateJwt = (id, email, role_id) => {
	return jwt.sign(
		{ id, email, role_id },
		process.env.SECRET_KEY,
		{ expiresIn: '24h' }
	)
}

class UserController {
	// url:/signup/
	async registration(req, res, next) {
		try {
			const { firstname, lastname, patronimyc, phoneNumber, email, password } = req.body

			if (!email || !password || !firstname || !lastname || !phoneNumber) {
				return next(APIErrors.badRequest('Введены не все данные'))
			}

			const candidate = await Parent.findOne({ where: { email } })
			if (candidate) {
				return next(APIErrors.badRequest('Пользователь с таким email уже существует'))
			}

			const hashPassword = await bcrypt.hash(password, 5)
			const user = await Parent.create({
				firstname: firstname,
				lastname: lastname,
				email: email,
				password: hashPassword,
				phoneNumber: phoneNumber,
				patronimyc: patronimyc,
				confirmed: false
			})
			const token = generateJwt(user.id, user.email, user.role_id !== undefined ? user.role_id : null)
			return res.json({ token })
		} catch (error) {
			return next(APIErrors.internalQuery("Ошибка при работе с БД"))
		}
	}

	// url: /signup/employee
	async registrationEmployee(req, res, next) {
		try {
			console.log("I Am herre")
			const { firstname, lastname, patronimyc, phoneNumber, email, password, role_id } = req.body
			console.log(req.body)
			if (!email || !password || !firstname || !lastname || !phoneNumber) {
				console.log("Not all")
				return next(APIErrors.badRequest('Введены не все данные'))
			}

			const candidate = await Employee.findOne({ where: { email } })
			console.log(JSON.stringify(candidate))
			if (candidate !== null) {
				return next(APIErrors.badRequest('Пользователь с таким email уже существует )))'))
			}
			const hashPassword = await bcrypt.hash(password, 5)
			const user = await Employee.create({
				firstname: firstname,
				lastname: lastname,
				patronimyc: patronimyc,
				email: email,
				password: hashPassword,
				phoneNumber: phoneNumber,
				role_id: role_id
			})
			return res.json({ message: "Успешно зарегистрирован " + JSON.stringify(user) })
		} catch (error) {
			return next(APIErrors.internalQuery("Ошибка при работе с БД"))
		}
	}

	async getEmployeeRoles(req, res, next) {
		try {
			return res.json(await EmployeeRole.findAll())
		} catch (error) {
			console.log(error.message)
		}
	}

	// url: /user/login
	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const parent = await Parent.findOne({ where: { email } });
			const user = parent || await Employee.findOne({ where: { email } });
			if (!user) {
				return res.status(404).json({ message: 'Пользователь с таким email не найден' });
			}
			if (!bcrypt.compareSync(password, user.password)) {
				return res.status(401).json({ message: 'Неверный пароль' });
			}
			const token = generateJwt(user.id, user.email, user.role_id !== undefined ? user.role_id : null)
			return res.json({ token })
		} catch (error) {
			console.log(error)
		}
	}

	async check(req, res) {
		const token = generateJwt(req.user.id, req.user.email, req.user.userRoleId)
		return res.json(token)
	}

	// url:/signup/confirm
	async confirmRegistration(req, res, next) {
		try {
			const { userId } = req.body
			const [updatedRowsCount, updatedRows] = await Parent.update(
				{ confirmed: true },
				{ where: { id: userId }, returning: true }
			);
			if (updatedRowsCount === 0) {
				return next(APIErrors.internalQuery('Родитель с указанным идентификатором не найден'));
			}
			res.json({ message: 'Подтверждение регистрации успешно обновлено', updatedRows });
		} catch (error) {
			console.error(error);
			return next(APIErrors.internalServerError('Произошла ошибка при обновлении подтверждения регистрации'));
		}
	}

	//url: /users/addChild
	async addChild(req, res, next) {
		try {
			const { firstname, lastname, patronimyc } = req.body;
			const parentId = req.user.id;
			console.log(req.user.id)
			const parent = await Parent.findByPk(parentId);
			if (!parent) {
				return next(APIErrors.notFound('Родитель не найден'));
			}
			const existingChild = await Child.findOne({
				where: {
					parent_id: parentId,
					firstname,
					lastname,
					patronimyc
				}
			});
			if (existingChild) {
				return next(APIErrors.badRequest('Такой ребенок уже добавлен'));
			}
			const child = await Child.create({
				firstname,
				lastname,
				patronimyc,
				parent_id: parentId
			});
			return res.status(201).json(child);
		} catch (error) {
			console.error(error);
			return next(APIErrors.internalQuery('Произошла ошибка при добавлении ребенка'));
		}
	}

	async getConfirmationUsers(req, res, next) {
		try {
			return res.json(await Parent.findAll({ where: { confirmed: false } }))
		} catch (error) {
			console.log(error)
			return next(APIErrors.internalQuery("Ошибка получения пользователей"))
		}
	}

	async getChildsByParent(req, res, next) {
		try {
			if (!req.user.role_id)
				return res.json(await Child.findAll({ where: { parent_id: req.user.id } }))
			else
				return res.json(await Child.findAll())
		} catch (error) {
			return next(APIErrors.internalQuery("Ошибка вышла"))
		}
	}
}

module.exports = new UserController()