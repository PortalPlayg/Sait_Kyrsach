import React, { useState } from 'react';
import { registerChild } from '../http/userAPI';

const RegisterChildForm = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [patronymic, setPatronymic] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateInput()) return;

		try {
			await registerChild(
				firstName,
				lastName,
				patronymic
			);
			alert('Регистрация ребенка подтверждена!');
			setFirstName('');
			setLastName('');
			setPatronymic('');
		} catch (error) {
			console.error('Failed to register child:', error);
		}
	};

	const validateInput = () => {
		let isValid = true;
		let errorMessage = '';

		if (!firstName || !lastName) {
			isValid = false;
			errorMessage = 'Имя и фамилия обязательны для заполнения!';
		}

		if (!isValid) {
			setError(errorMessage);
		}

		return isValid;
	};

	return (
		<div className="form-container">
			<div className="form-group">
				<label htmlFor="firstName">Имя:</label>
				<input
					className="form-control"
					type="text"
					id="firstName"
					placeholder="Введите имя"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="lastName">Фамилия:</label>
				<input
					className="form-control"
					type="text"
					id="lastName"
					placeholder="Введите фамилию"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="patronymic">Отчество:</label>
				<input
					className="form-control"
					type="text"
					id="patronymic"
					placeholder="Введите отчество"
					value={patronymic}
					onChange={(e) => setPatronymic(e.target.value)}
				/>
			</div>

			<button className="btn btn-primary" type="submit" onClick={handleSubmit}>
				Подтвердить
			</button>

			{error && <div className="alert alert-danger mt-3">{error}</div>}
		</div>
	);
};

export default RegisterChildForm;
