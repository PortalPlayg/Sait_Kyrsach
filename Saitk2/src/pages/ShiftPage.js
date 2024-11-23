import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Context } from '../index';
import { create, getAll } from '../http/shiftAPI';

import './styles/shift.css'

const Shift = ({ shift }) => {
	const { title, dateStart, dateFinish, registrationOpen } = shift;
	const containerStyle = {
		backgroundColor: registrationOpen ? '#d4edda' : '#fff3cd',
		borderRadius: '10px',
		boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
		padding: '20px',
		marginBottom: '20px'
	};

	return (
		<Col xs={12}>
			<Link to={`/shift/${shift.id}/childs`} style={{ textDecoration: 'none', color: 'inherit' }}>
				<div className="shift" style={containerStyle}>
					<h4>{title}</h4>
					<p>Начало смены: {new Date(dateStart).toLocaleString()}</p>
					<p>Окончание смены: {new Date(dateFinish).toLocaleString()}</p>
					<p>Регистрация открыта: {registrationOpen ? 'Да' : 'Нет'}</p>
				</div>
			</Link>
		</Col>
	);
};

const Shifts = () => {
	const { user } = useContext(Context);
	const [shifts, setShifts] = useState([]);
	const [show, setShow] = useState(false);
	const [newShift, setNewShift] = useState({
		title: '',
		dateStart: '',
		dateFinish: '',
		registrationOpen: false
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewShift({ ...newShift, [name]: value });
	};

	const handleCheckboxChange = (e) => {
		const { name, checked } = e.target;
		setNewShift({ ...newShift, [name]: checked });
	};

	const handleSubmit = async () => {
		try {
			const data = await create(newShift);
			if (data != null) {
				setShifts([...shifts, data]);
				alert("Создана");
			} else {
				alert("Ошибка");
			}
			handleClose();
		} catch (error) {
			console.error("Ошибка при создании смены:", error);
			alert("Ошибка при создании смены");
		}
	};

	useEffect(() => {
		const fetchShifts = async () => {
			try {
				const data = await getAll();
				setShifts(data);
			} catch (error) {
				console.error('Ошибка при получении данных о сменах:', error);
			}
		};
		fetchShifts();
	}, []);

	return (
		<Container>
			<Row>
				{user._user.role_id === 1 && (
					<Col xs={12} className="mb-3">
						<Button variant="primary" onClick={handleShow}>
							Добавить смену
						</Button>
					</Col>
				)}
				{shifts.length > 0 &&
					shifts.map((shift) => <Shift key={shift.id} shift={shift} />)
				}
			</Row>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Добавить смену</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="formShiftTitle">
							<Form.Label>Название смены</Form.Label>
							<Form.Control
								type="text"
								placeholder="Введите название смены"
								name="title"
								value={newShift.title}
								onChange={handleChange}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formDateStart">
							<Form.Label>Дата начала</Form.Label>
							<Form.Control
								type="datetime-local"
								name="dateStart"
								value={newShift.dateStart}
								onChange={handleChange}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formDateFinish">
							<Form.Label>Дата окончания</Form.Label>
							<Form.Control
								type="datetime-local"
								name="dateFinish"
								value={newShift.dateFinish}
								onChange={handleChange}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formRegistrationOpen">
							<Form.Check
								type="checkbox"
								label="Регистрация открыта"
								name="registrationOpen"
								checked={newShift.registrationOpen}
								onChange={handleCheckboxChange}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Отмена
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Создать
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default Shifts;
