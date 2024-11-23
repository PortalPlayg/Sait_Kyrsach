import axios from './axiosConfig';

export const getDiseasesCountAndList = async () => {
	const response = await axios.get('/api/shift/canteen-report')
	console.log(response + "response")
	return response
}