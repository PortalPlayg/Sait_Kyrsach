const APIErrors = require("../errors/APIErrors");
const { MedicalAppeal, sequelize, DiseaseTypes } = require("../models/models");

class MedicalAppealController {
	async register(req, res, next) {
		try {
			const { childId, anamnesis, description, carried_out } = req.body
			const newAppeal = await MedicalAppeal.create({
				anamnesis,
				description,
				carried_out,
				date: new Date(),
				childId
			})
			return res.json(newAppeal)
		} catch (error) {
			console.log(error)
		}
	}
	async getReportByDate(req, res, next) {
		try {
			const { date } = req.body;
			const report = await sequelize.query(`
				SELECT 
					c.firstname, 
					c.lastname,
					COALESCE(c.patronimyc, ' ') AS patronimyc,
					TO_CHAR(ma.date, 'HH24:MI') AS appeal_time,
					ma.anamnesis,
					ma.description,
					ma.carried_out
				FROM 
					medical_appeal ma
				JOIN 
					child c ON c.id = ma."childId"
				WHERE 
					ma.date::date = $1;
			`, {
				bind: [date],
				type: sequelize.QueryTypes.SELECT
			});
			return res.json(report);
		} catch (error) {
			console.log(error);
		}
	}

	async getDisease(req, res, next) {
		console.log("Ку-ку")
		try {
			return res.json(await DiseaseTypes.findAll())
		} catch (error) {
			return next(APIErrors.internalQuery(error.message))
		}
	}

}

module.exports = new MedicalAppealController()