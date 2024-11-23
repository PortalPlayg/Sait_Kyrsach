import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../index';

const NavbarComponent = () => {
	const location = useLocation();
	const { user } = useContext(Context);

	return (
		<Navbar bg="light" expand="lg" variant="light">
			<Navbar.Brand as={Link} to="/" style={{ color: 'black', fontFamily: 'Arial' }}>
				Лагерь
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link
						as={Link}
						to="/courses"
						style={{
							color: location.pathname === '/courses' ? 'green' : 'black',
							borderBottom: location.pathname === '/courses' ? '2px solid green' : 'none',
						}}
					>
						Смены
					</Nav.Link>
					<Nav.Link
						as={Link}
						to="/cabinet"
						style={{
							color: location.pathname === '/cabinet' ? 'green' : 'black',
							borderBottom: location.pathname === '/cabinet' ? '2px solid green' : 'none',
						}}
					>
						Кабинет
					</Nav.Link>
					{user._user.role_id === 1 || user._user.role_id === 3 ? (
						<Nav.Link
							as={Link}
							to="/medical"
							style={{
								color: location.pathname === '/medical' ? 'green' : 'black',
								borderBottom: location.pathname === '/medical' ? '2px solid green' : 'none',
							}}
						>
							Медицина
						</Nav.Link>
					) : null}
					{user._user.role_id === 1 || user._user.role_id === 2 ? (
						<Nav.Link
							as={Link}
							to="/canteen"
							style={{
								color: location.pathname === '/canteen' ? 'green' : 'black',
								borderBottom: location.pathname === '/canteen' ? '2px solid green' : 'none',
							}}
						>
							Столовая
						</Nav.Link>
					) : null}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavbarComponent;
