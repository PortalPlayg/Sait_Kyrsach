import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { getChildsList } from '../http/userAPI';
import { addMedicalAppeal, getMedicalReport } from '../http/medicalAPI';

const MedicalRecordForm = () => {
	const [childs, setChilds] = useState([]);
	const [childId, setChildId] = useState('');
	const [anamnesis, setAnamnesis] = useState('');
	const [description, setDescription] = useState('');
	const [carriedOut, setCarriedOut] = useState('');
	const [error, setError] = useState('');
	const [selectedDate, setSelectedDate] = useState('');
	const [report, setReport] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [showReport, setShowReport] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getChildsList();
				setChilds(response.data);
				setChildId(response.data.length > 0 ? response.data[0].id : '');
			} catch (error) {
				console.error('Failed to fetch child list:', error);
			}
		};
		fetchData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateInput()) return;
		try {
			await addMedicalAppeal(childId, anamnesis, description, carriedOut);
			alert('Добавлено');
			setAnamnesis('');
			setDescription('');
			setCarriedOut('');
			setError('');
		} catch (error) {
			console.error('Failed to add medical appeal:', error);
			setError('Failed to add medical appeal. Please try again.');
		}
	};

	const handleShowReport = async () => {
		try {
			const response = (await getMedicalReport(selectedDate)).data;
			if (Array.isArray(response)) {
				setReport(response);
				setShowReport(true);
				setShowForm(false);
			} else {
				alert('Ошибка при загрузке отчета');
			}
		} catch (error) {
			console.error('Failed to fetch medical report:', error);
		}
	};

	const validateInput = () => {
		if (!childId || !anamnesis || !description || !carriedOut) {
			setError('All fields are required!');
			return false;
		}
		return true;
	};

	const handleSelectDate = (date) => {
		setSelectedDate(date);
	};

	return (
		<div className="container">
			<h2>Медпункт</h2>
			<div>
				<Button onClick={() => { setShowReport(true); setShowForm(false); }}>Показать отчет</Button>{' '}
				<Button onClick={() => { setShowForm(true); setShowReport(false); }}>Новое обращение</Button>
			</div>
			{showForm && (
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Выберите ребенка</Form.Label>
						<Form.Control
							as="select"
							value={childId}
							onChange={(e) => setChildId(e.target.value)}
						>
							<option value="">Выбрать</option>
							{childs.map((child) => (
								<option key={child.id} value={child.id}>
									{child.firstname} {child.lastname} {child.patronimyc}
								</option>
							))}
						</Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Label>Анамнез</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter anamnesis"
							value={anamnesis}
							onChange={(e) => setAnamnesis(e.target.value)}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Описание</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							placeholder="Enter description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Предпринятые действия</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter carried out"
							value={carriedOut}
							onChange={(e) => setCarriedOut(e.target.value)}
						/>
					</Form.Group>

					{error && <p className="text-danger">{error}</p>}

					<Button variant="primary" type="submit">
						Сохранить
					</Button>
				</Form>
			)}
			{showReport && (
				<div>
					<input type="date" value={selectedDate} onChange={(e) => handleSelectDate(e.target.value)} />{' '}
					<Button onClick={handleShowReport}>Подтвердить</Button>
				</div>
			)}
			{Array.isArray(report) && report.length > 0 && (
				<div>
					<h3>Отчет за {selectedDate}</h3>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Имя</th>
								<th>Фамилия</th>
								<th>Отчество</th>
								<th>Время обращения</th>
								<th>Анамнез</th>
								<th>Описание</th>
								<th>Проведенные действия</th>
							</tr>
						</thead>
						<tbody>
							{report.map((item, index) => (
								<tr key={index}>
									<td>{item.firstname}</td>
									<td>{item.lastname}</td>
									<td>{item.patronimyc}</td>
									<td>{item.appeal_time}</td>
									<td>{item.anamnesis}</td>
									<td>{item.description}</td>
									<td>{item.carried_out}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			)}
		</div>
	);
};

export default MedicalRecordForm;
