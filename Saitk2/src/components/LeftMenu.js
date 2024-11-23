import React, { useState } from 'react';
import './styles/LeftMenu.css';

const LeftMenu = ({ onSelect, userRole }) => {
	const getMenuItems = () => {
		if (userRole === 1) {
			return [
				{ id: 'profile', label: 'Профиль' },
				{ id: 'changePassword', label: 'Сменить пароль' },
				{ id: 'groups', label: 'Подтвердить регистрацию' },
				{ id: 'registerEmployee', label: 'Зарегистрировать работника' },
			];
		} else {
			return [
				{ id: 'profile', label: 'Профиль' },
				{ id: 'changePassword', label: 'Сменить пароль' },
				{ id: 'registerChild', label: 'Зарегистрировать ребенка' },
				{ id: 'addInfoAboutChild', label: 'Информация о ребенке' },
			];
		}
	};

	const menuItems = getMenuItems();

	const [selectedItem, setSelectedItem] = useState(menuItems[0].id);

	const handleItemClick = (itemId) => {
		setSelectedItem(itemId);
		onSelect(itemId);
	};

	return (
		<div className="left-menu">
			{menuItems.map((item) => (
				<div
					key={item.id}
					className={`menu-item ${selectedItem === item.id ? 'selected' : ''}`}
					onClick={() => handleItemClick(item.id)}
				>
					{item.label}
				</div>
			))}
		</div>
	);
};

export default LeftMenu;