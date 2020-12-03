import React, { useSelector } from "react";
import { DeleteAComment } from "../../reducers/commentManagement";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

export default function DeleteSingleComment({
	postId,
	commentId,
	postUserId,
	userLoginId,
	userId,
}) {
	const dispatch = useDispatch();

	const onDeleteComment = (e) => {
		e.preventDefault();

		dispatch(DeleteAComment({ postId, commentId }));
	};

	return (
		<>
			{postUserId === userLoginId || userLoginId === userId ? (
				<div onClick={onDeleteComment}>
					<DeleteOutlined className="comment__input-icon-delete" />
				</div>
			) : (
				<p style={{ color: "#112a45", padding: "1rem" }}>
					You are not allowed to delete this comment!
					<EyeInvisibleOutlined className="comment__input-icon-warning" />
				</p>
			)}
		</>
	);
}
