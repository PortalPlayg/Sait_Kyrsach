import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getChildsListShift, registerChild } from '../http/shiftAPI';
import { getChildsList } from '../http/userAPI';
import { Context } from '../index';

const ShiftChildsPage = () => {
	const { shiftId } = useParams();
	const [shift, setShift] = useState(null);
	const [children, setChildren] = useState([]);
	const [selectedChildId, setSelectedChildId] = useState('');
	const { user } = useContext(Context);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const shiftData = await getChildsListShift(shiftId);
				setShift(shiftData);
			} catch (error) {
				console.error('Failed to fetch shift data:', error);
			}
		};
		fetchData();
	}, [shiftId]);

	useEffect(() => {
		const fetchChildren = async () => {
			try {
				const childrenData = (await getChildsList()).data;
				console.log(childrenData)
				setChildren(Array.isArray(childrenData) ? childrenData : []);
			} catch (error) {
				console.error('Failed to fetch children data:', error);
			}
		};
		if (user.role_id !== 1) {
			fetchChildren();
		}
	}, [user]);

	const handleRegister = async () => {
		try {
			await registerChild(selectedChildId, shiftId);
		} catch (error) {
			console.error('Failed to register child:', error);
		}
	};

	return (
		<Container>
			{shift ? (
				<>
					<h2>{shift.title}</h2>
					<Table striped bordered hover>
						<thead style={{ backgroundColor: '#f8f9fa' }}>
							<tr>
								<th>Имя</th>
								<th>Фамилия</th>
								<th>Отчество</th>
								<th>Подтвержден</th>
							</tr>
						</thead>
						<tbody>
							{shift.children.map((child, index) => (
								<tr key={index} style={{ backgroundColor: child.child_shift.confirmed ? '#d4edda' : 'white' }}>
									<td>{child.firstname}</td>
									<td>{child.lastname}</td>
									<td>{child.patronimyc || '-'}</td>
									<td>{child.child_shift.confirmed ? 'Да' : 'Нет'}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			) : (
				user.role_id !== 1 && (
					<>
						<Form.Group controlId="childSelect">
							<Form.Label>Выберите ребенка для регистрации</Form.Label>
							<Form.Control as="select" value={selectedChildId} onChange={e => setSelectedChildId(e.target.value)}>
								<option value="">Выберите ребенка...</option>
								{children.map(child => (
									<option key={child.id} value={child.id}>
										{child.firstname} {child.lastname}
									</option>
								))}
							</Form.Control>
						</Form.Group>
						<Button onClick={handleRegister} disabled={!selectedChildId}>
							Зарегистрировать
						</Button>
					</>
				)
			)}
		</Container>
	);
};

export default ShiftChildsPage;
