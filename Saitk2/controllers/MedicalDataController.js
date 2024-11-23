const APIErrors = require("../errors/APIErrors");
const { sequelize, Child, DiseaseTypes, MedicalData, Shift } = require("../models/models");

class MedicalDataController {
	async addMedicalData(req, res, next) {
		try {
			const { childId, title, description, diseaseTypeId } = req.body;
			console.log(req.body)
			if (!childId || !title || !diseaseTypeId) {
				return next(APIErrors.badRequest('Не все данные заполнены'));
			}
			const child = await Child.findOne({ where: { id: childId, parent_id: req.user.id } });
			if (!child) {
				return next(APIErrors.badRequest('Ребенок не найден'));
			}
			const diseaseType = await DiseaseTypes.findByPk(diseaseTypeId);
			if (!diseaseType) {
				return next(APIErrors.badRequest('Тип болезни не найден'));
			}
			const medicalData = await MedicalData.create({
				title,
				description,
				child_id: childId,
				disease_id: diseaseTypeId
			});
			return res.status(201).json(medicalData);
		} catch (error) {
			console.log(error)
			return next(APIErrors.internalQuery('Произошла ошибка при добавлении медицинских данных'));
		}
	}

	async getFullReport(req, res, next) {
		try {
			const report = await sequelize.query(`
					SELECT dt.title AS disease_type_title, COUNT(md.child_id) AS child_count, s.title AS shift_title
					FROM medical_data md
					JOIN disease_types dt ON md.disease_id = dt.id
					JOIN child_shift cs ON cs."childId" = md.child_id
					JOIN shift s ON s.id = cs."shiftId"
					WHERE s.id = ${req.params.shiftId}
					GROUP BY dt.title, s.title
				`, {
				type: sequelize.QueryTypes.SELECT
			});
			res.json(report);
		} catch (error) {
			console.log(error)
		}
	}

	async getReportForCoocker(req, res, next) {
		try {
			const report = await sequelize.query(`
				SELECT dt.title AS disease_type_title, COUNT(md.child_id) AS child_count, s.title AS shift_title
				FROM medical_data md
				JOIN disease_types dt ON md.disease_id = dt.id
				JOIN child_shift cs ON cs."childId" = md.child_id
				JOIN shift s ON s.id = cs."shiftId"
				WHERE dt.title = 'пищевая аллергия' AND s.id = ${req.params.shiftId}
				GROUP BY dt.title, s.title
			`, {
				type: sequelize.QueryTypes.SELECT
			});
			res.json(report);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
	async getReportByChild(req, res, next) {
		try {
			const { child_id } = req.body
			const medicalData = await MedicalData.findAll({ where: { child_id } })
			return res.json(medicalData)
		} catch (error) {
			console.log(error)
		}
	}
}

module.exports = new MedicalDataController()