import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { getDiseasesCountAndList } from '../http/canteenAPI';

const CanteenComponent = () => {
	const [totalChilds, setTotalChilds] = useState(0);
	const [allergicCount, setAllergicCount] = useState(0);
	const [allergicDiseasesList, setAllergicDiseasesList] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getDiseasesCountAndList();
				setTotalChilds(response.data[0].total_childs);
				setAllergicCount(response.data[0].allergic_count);
				setAllergicDiseasesList(response.data[0].diseases_list);
			} catch (error) {
				console.error('Failed to fetch canteen data:', error);
			}
		};
		fetchData();
	}, []);

	return (
		<Container className="mt-4">
			<h2 className="text-center mb-4">Столовая</h2>
			<Row>
				<Col md={4}>
					<Card className="mb-4">
						<Card.Body>
							<Card.Title>Общее количество детей</Card.Title>
							<Card.Text className="display-4">{totalChilds}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card className="mb-4">
						<Card.Body>
							<Card.Title>Дети с пищевой аллергией</Card.Title>
							<Card.Text className="display-4">{allergicCount}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card className="mb-4">
						<Card.Body>
							<Card.Title>Список пищевых аллергий</Card.Title>
							<Card.Text className="display-8">{allergicDiseasesList}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default CanteenComponent;
