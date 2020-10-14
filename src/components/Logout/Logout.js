import React from "react";
import { useDispatch } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { logout } from "../../reducers/authentication";

function Logout() {
	let history = useHistory();
	const dispatch = useDispatch();
	const onLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		history.push("/login");
	};
	return (
		<div>
			<LogoutOutlined onClick={onLogout} /> Logout
		</div>
	);
}

export default Logout;
