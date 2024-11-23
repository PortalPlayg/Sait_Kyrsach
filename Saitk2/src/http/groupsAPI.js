import axios from './axiosConfig';

export const create = async (newGroupName) => {
	await axios.post('/api/group', { group_name: newGroupName.trim() });
}

