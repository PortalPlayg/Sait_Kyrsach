import axios from './axiosConfig';

export const getAll = async () => {
	const { data } = await axios.get('/api/shift');
	return data
}

export const create = async (newShift) => {
	console.log("Вызвал")
	const { data } = await axios.post('/api/shift/', {
		title: newShift.title,
		dateStart: newShift.dateStart,
		dateFinish: newShift.dateFinish,
		registrationOpen: newShift.registrationOpen
	})
	return data
}

export const getChildsListShift = async (shiftId) => {
	const { data } = await axios.get(`/api/shift/${shiftId}/childs`);
	console.log(data)
	return data
}

export const registerChild = async (childId, shiftId) => {
	const response = await axios.post(`/api/shift/${shiftId}/addchild`, { childId })
}