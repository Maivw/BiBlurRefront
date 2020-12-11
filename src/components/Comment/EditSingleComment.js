import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SendOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { EditAComment } from "../../reducers/commentManagement";

function EditSingleComment(props) {
	const { postId, commentId, userId, userLoginId } = props;
	const dispatch = useDispatch();

	const [commentContent, setCommentContent] = useState("");
	const [visible, setVisible] = useState(false);

	const updateInputComment = (e) => {
		setCommentContent(e.target.value);
	};
	const onEditComment = (e) => {
		dispatch(
			EditAComment({ postId, commentId, commentContent, userId: userLoginId })
		);
		props.OnSendClose(!visible);
	};
	return (
		<div className="create-comment__input">
			{userId === userLoginId ? (
				<>
					<Input
						onChange={updateInputComment}
						name="commentContent"
						value={commentContent}
						className="comment__input"
						autoComplete="off"
						placeholder="Edit your comment"
						style={{
							padding: "1rem 2rem",
							border: "1px solid #0e414918",
							borderRadius: "2rem",
							margin: "1rem",
							position: "relative",
						}}
					/>
					<SendOutlined
						onClick={onEditComment}
						className="comment__input-icon-second"
					/>
				</>
			) : (
				<p style={{ color: "white", padding: "1rem", fontSize: "1.2rem" }}>
					You are not allowed to edit this comment!
					<EyeInvisibleOutlined className="comment__input-icon-warning" />
				</p>
			)}
		</div>
	);
}

export default EditSingleComment;
