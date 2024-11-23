import axios from './axiosConfig';

export const addHealthIssue = async (data) => {
	try {
		console.log(data)
		await axios.post('/api/medicaldata/add', { childId: data.childId, title: data.name, description: data.description, diseaseTypeId: data.typeId })
	} catch (error) {
		throw error;
	}
}

export const getDiseaseTypes = async () => {
	try {
		return await axios.get('/api/medicalappeal/getdisease')
	} catch (error) {
		throw error;
	}
}


export const addMedicalAppeal = async (childId, anamnesis, description, carriedOut) => {
	try {
		return await axios.post('/api/medicalappeal/create', { childId, anamnesis, description, carried_out: carriedOut })
	} catch (error) {
		throw error;
	}
}

export const getMedicalReport = async (date) => {
	try {
		return await axios.post('/api/medicalappeal/getreport', { date })
	} catch (error) {
		throw error;
	}
}