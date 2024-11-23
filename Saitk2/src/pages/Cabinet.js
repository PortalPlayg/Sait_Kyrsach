import React, { useContext, useState, useEffect } from 'react';
import Profile from '../components/Profile';
import ChangePasswordForm from '../components/ChangePasswordForm';
import RegisterEmployeeForm from '../components/RegisterEmployeeForm';
import LeftMenu from '../components/LeftMenu';
import { Context } from '../index';
import { getAllRoles } from '../http/userAPI';
import ConfirmRegistrationComponent from '../components/ConfirmRegisterComponent';
import RegisterChildForm from '../components/RegisterChildForm';
import AddHealthIssueForm from '../components/AddHealthIssueForm';

const Cabinet = () => {
	const { user } = useContext(Context);
	const [selectedMenuItem, setSelectedMenuItem] = useState('profile');
	const [roles, setRoles] = useState([]);

	useEffect(() => {
		const fetchRoles = async () => {
			try {
				const rolesData = await getAllRoles();
				setRoles(rolesData);
			} catch (error) {
				console.error('Failed to fetch roles:', error);
			}
		};
		fetchRoles();
	}, []);

	const handleMenuItemSelect = (itemId) => {
		setSelectedMenuItem(itemId);
	};

	return (
		<div style={{ display: 'flex' }}>
			<div style={{ width: '25%', marginRight: '20px' }}>
				<LeftMenu onSelect={handleMenuItemSelect} userRole={user._user.role_id} />
			</div>
			<div style={{ width: '75%' }}>
				{selectedMenuItem === 'profile' && <Profile user={user} />}
				{selectedMenuItem === 'changePassword' && <ChangePasswordForm />}
				{selectedMenuItem === 'registerEmployee' && <RegisterEmployeeForm roles={roles} />}
				{selectedMenuItem === 'groups' && <ConfirmRegistrationComponent />}
				{selectedMenuItem === 'registerChild' && <RegisterChildForm />}
				{selectedMenuItem === 'addInfoAboutChild' && <AddHealthIssueForm />}
			</div>
		</div>
	);
};

export default Cabinet;
