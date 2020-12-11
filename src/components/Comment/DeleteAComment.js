import React from "react";
import { DeleteAComment } from "../../reducers/commentManagement";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

export default function DeleteSingleComment(props) {
	const { postId, commentId, postUserId, userLoginId } = props;
	console.log("a", postUserId);
	console.log("a1", userLoginId);
	console.log("a3", commentId);
	const dispatch = useDispatch();

	const onDeleteComment = (e) => {
		e.preventDefault();

		dispatch(DeleteAComment({ postId, commentId }));
	};

	return (
		<>
			{postUserId === userLoginId ? (
				<div onClick={onDeleteComment}>
					<DeleteOutlined className="comment__input-icon-delete" />
				</div>
			) : (
				<p style={{ color: "white", padding: "1rem", fontSize: "1.2rem" }}>
					You are not allowed to delete this comment!
					<EyeInvisibleOutlined className="comment__input-icon-warning" />
				</p>
			)}
		</>
	);
}
