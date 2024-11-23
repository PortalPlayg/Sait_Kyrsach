import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import { LOGIN_ROUTE, SHIFT_ROUTE } from "../utils/consts";
import { registrationParent } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Registration = observer(() => {
	const { user } = useContext(Context)
	const history = useHistory()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [patronimyc, setPatronimyc] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')

	const click = async () => {
		try {
			const response = await registrationParent({ email, password, firstname, lastname, patronimyc, phoneNumber });
			user.setUser(response);
			user.setIsAuth(true);
			history.push(SHIFT_ROUTE);
		} catch (e) {
			alert(e.response.data.message)
		}
	};

	return (
		<Container
			className="d-flex justify-content-center align-items-center"
			style={{ height: window.innerHeight - 54 }}
		>
			<Card style={{ width: 600 }} className="p-5">
				<h2 className="m-auto">Регистрация</h2>
				<Form className="d-flex flex-column">
					<Form.Control
						className="mt-3"
						placeholder="Введите ваше имя..."
						value={firstname}
						onChange={e => setFirstname(e.target.value)}
					/>
					<Form.Control
						className="mt-3"
						placeholder="Введите вашу фамилию..."
						value={lastname}
						onChange={e => setLastname(e.target.value)}
					/>
					<Form.Control
						className="mt-3"
						placeholder="Введите ваше отчество..."
						value={patronimyc}
						onChange={e => setPatronimyc(e.target.value)}
					/>
					<Form.Control
						className="mt-3"
						placeholder="Введите ваш телефон..."
						value={phoneNumber}
						onChange={e => setPhoneNumber(e.target.value)}
					/>
					<Form.Control
						className="mt-3"
						placeholder="Введите ваш email..."
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Form.Control
						className="mt-3"
						placeholder="Введите ваш пароль..."
						value={password}
						onChange={e => setPassword(e.target.value)}
						type="password"
					/>
					<Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
						<div>
							Есть аккаунт? <a href={LOGIN_ROUTE}>Войдите!</a>
						</div>
						<Button
							variant={"outline-success"}
							onClick={click}
						>
							Зарегистрироваться
						</Button>
					</Row>
				</Form>
			</Card>
		</Container>
	);
});

export default Registration;
