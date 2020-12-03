import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { removeAPost } from "../../reducers/postManagement";
import { DeleteOutlined } from "@ant-design/icons";

function DeleteAPost({ id }) {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.authentication.token);
	const onDelete = (e) => {
		e.preventDefault();
		dispatch(removeAPost({ id, token }));
	};

	return (
		<div type="text" onClick={onDelete} className="app__createPost-wrapper">
			<DeleteOutlined className="app__createPost-wrapper-icon" />
			<span>Delete </span>
		</div>
	);
}

export default DeleteAPost;
