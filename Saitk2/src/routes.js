import { CABINET_ROUTE, CANTEEN_ROUTE, LOGIN_ROUTE, MEDICAL_ROUTE, REGISTRATION_ROUTE, SHIFT_CHILDS_ROUTE, SHIFT_ROUTE } from "./utils/consts";
import Cabinet from "./pages/Cabinet";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ShiftsPage from "./pages/ShiftPage";
import ShiftChildsPage from "./pages/ShiftChildsPage";
import MedicalRecordForm from "./components/MedicalRecordForm";
import Canteen from "./pages/Canteen";

export const authRoutes = [
	{
		path: CABINET_ROUTE,
		Component: Cabinet
	},
	{
		path: SHIFT_ROUTE,
		Component: ShiftsPage
	},
	{
		path: SHIFT_CHILDS_ROUTE,
		Component: ShiftChildsPage
	},
	{
		path: MEDICAL_ROUTE,
		Component: MedicalRecordForm
	},
	{
		path: CANTEEN_ROUTE,
		Component: Canteen
	}
]

export const publicRoutes = [
	{
		path: REGISTRATION_ROUTE,
		Component: Registration
	},
	{
		path: LOGIN_ROUTE,
		Component: Login
	}
]
