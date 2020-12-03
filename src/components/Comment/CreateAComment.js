import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SendOutlined } from "@ant-design/icons";
import { Row, Col, Input } from "antd";
import { MakeAComment, GetComments } from "../../reducers/commentManagement";

export default function CreateAComment({ postId }) {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.authentication.user.id);
	const [commentContent, setCommentContent] = useState("");

	const onSentComment = (e) => {
		e.preventDefault();
		dispatch(MakeAComment({ commentContent, userId, postId }));
		dispatch(GetComments({ postId }));
		setCommentContent("");
	};
	const updateInputComment = (e) => {
		e.persist();
		setCommentContent(e.target.value);
	};
	return (
		<div className="create-comment__input">
			<Input
				onChange={updateInputComment}
				name="commentContent"
				value={commentContent}
				className="comment__input"
				autoComplete="off"
				placeholder="Write a comment"
				style={{
					padding: "1rem 2rem",
					border: "1px solid #0e414918",
					borderRadius: "2rem",
					margin: "1rem",
					width: "90%",
					position: "relative",
				}}
			/>
			<div>
				<SendOutlined onClick={onSentComment} className="comment__input-icon" />
			</div>
		</div>
	);
}
