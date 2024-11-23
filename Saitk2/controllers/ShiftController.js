const APIErrors = require("../errors/APIErrors");
const { Shift, Parent, Child, ChildShift, sequelize } = require("../models/models");

class ShiftController {
	async getShiftsForParents(req, res, next) {
		try {
			if (req.user.role_id === null) {
				const shifts = await Shift.findAll({ where: { registrationOpen: true } });
				return res.json(shifts);
			}
		} catch (error) {
			console.error(error);
			return next(APIErrors.internalServerError('Произошла ошибка при получении смен для родителей'));
		}
	}

	async getAllShiftsForAdmin(req, res, next) {
		try {
			const shifts = await Shift.findAll({ order: [['registrationOpen', 'DESC']] });
			return res.json(shifts);
		} catch (error) {
			console.error(error);
			return next(APIErrors.internalServerError('Произошла ошибка при получении всех смен для администраторов'));
		}
	}

	async create(req, res, next) {
		try {
			const { title, dateStart, dateFinish, registrationOpen } = req.body;
			const shift = await Shift.create({
				title,
				dateStart,
				dateFinish,
				registrationOpen
			});
			return res.status(201).json(shift);
		} catch (error) {
			console.log(error)
		}
	}

	async addChild(req, res, next) {
		try {
			const { childId } = req.body
			const shiftId = req.params.shiftId
			console.log("Добавляем " + childId + " смена " + shiftId)
			const parentId = req.user.id;
			const child = await Child.findOne({ where: { id: childId, parent_id: parentId } })
			if (!child) {
				return next(APIErrors.badRequest("Нет такого ребенка"));
			}
			const childShift = await ChildShift.create({
				childId,
				shiftId,
				confirmed: false
			})
			return res.status(201).json(childShift)
		} catch (error) {
			console.log(error)
		}
	}

	async canteenReport(req, res, next) {
		try {
			const query = `SELECT 
			COUNT(DISTINCT cs."childId") as total_childs, 
			COUNT(*) FILTER (WHERE md.disease_id = 2) as allergic_count, 
			STRING_AGG(md.title, ', ') FILTER (WHERE md.disease_id = 2) AS diseases_list 
		FROM child_shift cs
		JOIN shift sh ON sh.id = cs."shiftId"
		JOIN medical_data md ON md.child_id = cs."childId"
		WHERE CURRENT_DATE BETWEEN sh."dateStart" AND sh."dateFinish";`
			return res.json(await sequelize.query(query, {
				type: sequelize.QueryTypes.SELECT
			}))
		} catch (error) {
			console.log(error)
			return next(APIErrors.badRequest("Error"))
		}
	}

	async confirmChildShift(req, res, next) {
		try {
			const { childIds } = req.body;
			const updatedChildShifts = await ChildShift.update(
				{ confirmed: true },
				{ where: { childId: childIds, shiftId: req.params.shiftId } }
			);
			res.status(200).json({ message: 'Участие детей в смене успешно подтверждено' });
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
	async getChildsFromShift(req, res, next) {
		try {
			const { shiftId } = req.params;
			const shift = await Shift.findByPk(shiftId, {
				include: [Child] // Убедитесь, что модель Child правильно указана здесь
			});
			return res.json(shift);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
}

module.exports = new ShiftController()