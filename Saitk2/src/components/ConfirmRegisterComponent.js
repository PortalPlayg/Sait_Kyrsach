import React, { useEffect, useState } from 'react';
import { getUsersForConfirmation, confirmRegistration } from '../http/userAPI';

const ConfirmRegistrationComponent = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await getUsersForConfirmation();
				setUsers(response);
			} catch (error) {
				console.error('Failed to fetch users:', error);
			}
		};
		fetchUsers();
	}, []);

	const handleConfirmation = async (userId) => {
		try {
			await confirmRegistration(userId);
			alert('Регистрация подтверждена!');
			// Обновляем список пользователей после подтверждения регистрации
			const updatedUsers = users.filter(user => user.id !== userId);
			setUsers(updatedUsers);
		} catch (error) {
			console.error('Failed to confirm registration:', error);
		}
	};

	return (
		<div>
			<h2>Пользователи для подтверждения регистрации</h2>
			<table className="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Имя</th>
						<th>Фамилия</th>
						<th>Эл. почта</th>
						<th>Подтвердить</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr key={user.id}>
							<td>{user.id}</td>
							<td>{user.firstname}</td>
							<td>{user.lastname}</td>
							<td>{user.email}</td>
							<td>{user.phoneNumber}</td>
							<td>
								<button
									className="btn btn-danger"
									onClick={() => handleConfirmation(user.id)}
								>
									Подтвердить
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ConfirmRegistrationComponent;
