import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getChildsList } from '../http/userAPI';
import { addHealthIssue, getDiseaseTypes } from '../http/medicalAPI';

const AddHealthIssueForm = () => {
	const [childs, setChilds] = useState([]);
	const [selectedChild, setSelectedChild] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [type, setType] = useState('');
	const [diseaseTypes, setDiseaseTypes] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getChildsList();
				setChilds(response.data);
				setSelectedChild(response.data.length > 0 ? response.data[0].id : '');
			} catch (error) {
				console.error('Failed to fetch child list:', error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchDiseaseTypes = async () => {
			try {
				const response = await getDiseaseTypes();
				setDiseaseTypes(response.data);
				setType(response.data.length > 0 ? response.data[0].id : '');
			} catch (error) {
				console.error('Failed to fetch disease types:', error);
			}
		};
		fetchDiseaseTypes();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateInput()) return;

		try {
			await addHealthIssue({
				childId: selectedChild,
				name,
				description,
				typeId: type
			});
			alert('Данные успешно добавлены!');
			setName('');
			setDescription('');
			setType(diseaseTypes.length > 0 ? diseaseTypes[0].id : '');
			setError('');
		} catch (error) {
			console.error('Failed to add health issue:', error);
			setError('Failed to add health issue. Please try again.');
		}
	};

	const validateInput = () => {
		if (!selectedChild || !name || !description || !type) {
			setError('All fields are required!');
			return false;
		}
		return true;
	};

	return (
		<div className="form-container">
			<h2>Добавить заболевание</h2>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Выберите ребенка</Form.Label>
					<Form.Control
						as="select"
						value={selectedChild}
						onChange={(e) => setSelectedChild(e.target.value)}
					>
						<option value="">Select child</option>
						{childs.map((child) => (
							<option key={child.id} value={child.id}>
								{child.firstname} {child.lastname} {child.patronimyc}
							</option>
						))}
					</Form.Control>
				</Form.Group>

				<Form.Group>
					<Form.Label>Диагноз</Form.Label>
					<Form.Control
						type="text"
						placeholder="Введите диагноз"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Описание</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						placeholder="Введите описание"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Тип заболевания</Form.Label>
					<Form.Control
						as="select"
						value={type}
						onChange={(e) => setType(e.target.value)}
					>
						<option value="">Выберите тип</option>
						{diseaseTypes.map((diseaseType) => (
							<option key={diseaseType.id} value={diseaseType.id}>
								{diseaseType.title}
							</option>
						))}
					</Form.Control>
				</Form.Group>

				{error && <p className="text-danger">{error}</p>}

				<Button variant="primary" type="submit">
					Сохранить
				</Button>
			</Form>
		</div>
	);
};

export default AddHealthIssueForm;
