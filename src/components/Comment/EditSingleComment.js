import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SendOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { EditAComment } from "../../reducers/commentManagement";
import "./AllComment.css";

function EditSingleComment(props) {
	const { postId, commentId } = props;
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.authentication.user.id);
	const [commentContent, setCommentContent] = useState("");
	const [visiblePopover, setVisiblePopover] = useState(false);
	const updateInputComment = (e) => {
		setCommentContent(e.target.value);
	};
	const onEditComment = (e) => {
		dispatch(EditAComment({ postId, commentId, commentContent }));
		// props.onClick(visiblePopover);
	};
	return (
		<div>
			<Input
				onChange={updateInputComment}
				name="commentContent"
				value={commentContent}
				className="createCommentInput"
			/>
			<SendOutlined
				onClick={onEditComment}
				style={{
					position: "absolute",
					top: "25%",
					right: 30,
					color: "#15395b",
				}}
			/>
		</div>
	);
}

export default EditSingleComment;
