import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SendOutlined } from "@ant-design/icons";
import { Row, Col, Input } from "antd";
import { MakeAComment, GetComments } from "../../reducers/commentManagement";
import "./AllComment.css";

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
		<div>
			<Row className="mt-3">
				<Col
					xl={19}
					md={19}
					sm={19}
					className="self-center"
					style={{ position: "relative" }}
				>
					<Input
						onChange={updateInputComment}
						name="commentContent"
						value={commentContent}
						className="createCommentInput"
					/>
					<SendOutlined
						onClick={onSentComment}
						style={{
							position: "absolute",
							top: "35%",
							right: 10,
							color: "#15395b",
						}}
					/>
				</Col>
			</Row>
		</div>
	);
}
