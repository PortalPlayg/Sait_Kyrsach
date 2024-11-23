const sequelize = require('../db')
const { DataTypes, EmptyResultError, DATE } = require('sequelize')

const Employee = sequelize.define('employee', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	firstname: { type: DataTypes.STRING, allowNull: false },
	lastname: { type: DataTypes.STRING, allowNull: false },
	patronimyc: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
	phoneNumber: { type: DataTypes.STRING, allowNull: false },
}, {
	timestamps: false,
	freezeTableName: true
})

const Parent = sequelize.define('parents', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	firstname: { type: DataTypes.STRING, allowNull: false },
	lastname: { type: DataTypes.STRING, allowNull: false },
	patronimyc: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
	phoneNumber: { type: DataTypes.STRING, allowNull: false },
	confirmed: { type: DataTypes.BOOLEAN, allowNull: false }
}, {
	timestamps: false,
	freezeTableName: true
})

const Child = sequelize.define('child', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	firstname: { type: DataTypes.STRING, allowNull: false },
	lastname: { type: DataTypes.STRING, allowNull: false },
	patronimyc: { type: DataTypes.STRING },
}, {
	timestamps: false,
	freezeTableName: true
})

const EmployeeRole = sequelize.define('employee_role', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	role_name: { type: DataTypes.STRING, allowNull: false },
}, {
	timestamps: false,
	freezeTableName: true
})

const MedicalData = sequelize.define('medical_data', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING }
}, {
	timestamps: false,
	freezeTableName: true
})

const DiseaseTypes = sequelize.define('disease_types', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false }
}, {
	timestamps: false,
	freezeTableName: true
})

const Shift = sequelize.define('shift', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	dateStart: { type: DataTypes.DATE, allowNull: false },
	dateFinish: { type: DataTypes.DATE, allowNull: false },
	registrationOpen: { type: DataTypes.BOOLEAN, allowNull: false }
}, {
	timestamps: false,
	freezeTableName: true
})

const ChildShift = sequelize.define('child_shift', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	confirmed: { type: DataTypes.BOOLEAN, allowNull: false }
}, {
	timestamps: false,
	freezeTableName: true
});

Child.belongsToMany(Shift, { through: ChildShift });
Shift.belongsToMany(Child, { through: ChildShift });

const Squad = sequelize.define('squad', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.INTEGER, allowNull: false }
}, {
	timestamps: false,
	freezeTableName: true
})

const MedicalAppeal = sequelize.define('medical_appeal', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	anamnesis: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING },
	carried_out: { type: DataTypes.STRING, allowNull: false },
	date: { type: DataTypes.DATE, allowNull: false }
}, {
	timestamps: false,
	freezeTableName: true
})

const SquadChild = sequelize.define('squad_child', {})
const SquadEmployee = sequelize.define('squad_employee', {})

MedicalAppeal.belongsTo(Child, { foreign_key: 'child_id' })

Shift.hasMany(Squad, { foreignKey: 'shift_id' })
Squad.belongsTo(Shift, { foreignKey: 'shift_id' })

Child.belongsToMany(Squad, { through: SquadChild })
Squad.belongsToMany(Child, { through: SquadChild })

Squad.belongsToMany(Employee, { through: SquadEmployee })
Employee.belongsToMany(Squad, { through: SquadEmployee })

MedicalData.belongsTo(Child, { foreignKey: 'child_id' })

DiseaseTypes.hasMany(MedicalData, { foreignKey: 'disease_id' })
MedicalData.belongsTo(DiseaseTypes, { foreignKey: 'disease_id' })

Child.belongsTo(Parent, { foreignKey: 'parent_id' })

EmployeeRole.hasMany(Employee, { foreignKey: 'role_id' })
Employee.belongsTo(EmployeeRole, { foreignKey: 'role_id' })

module.exports = {
	Parent,
	Employee,
	EmployeeRole,
	MedicalAppeal,
	MedicalData,
	DiseaseTypes,
	Child,
	Shift,
	Squad,
	SquadChild,
	SquadEmployee,
	ChildShift,
	sequelize
}