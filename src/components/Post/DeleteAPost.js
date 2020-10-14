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
		<div>
			<div type="text" onClick={onDelete}>
				<DeleteOutlined
					style={{ color: "#8c8c8c", fontSize: "20px", marginLeft: 10 }}
				/>
			</div>
		</div>
	);
}

export default DeleteAPost;
