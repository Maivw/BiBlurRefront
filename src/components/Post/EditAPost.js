import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { editCurrentPost, getAPost } from "../../reducers/postManagement";
import { Row, Col, Card, Modal } from "antd";
import "./EditAPost.css";

function EditAPost({ visible, onCancel, id }) {
	const post = useSelector((state) => state.postManagement.currentPost);

	const userId = useSelector((state) => state.authentication.user.id);
	const [postEdited, setPostEdited] = useState({
		postContent: "",
		userId,
		location: " ",
		imagePostUrl: "",
		videoPostUrl: "",
	});
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAPost({ id }));
	}, [id]);
	const onChangeEditInput = (e) => {
		e.persist();
		setPostEdited((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const onEdit = (e) => {
		e.preventDefault();
		dispatch(editCurrentPost({ id, ...postEdited }));
		onCancel();
	};

	return (
		<Modal visible={visible} onCancel={onCancel} onOk={onEdit}>
			{post && (
				<Card hoverable className="EditPost">
					<p>
						<strong style={{ color: "#112a45" }}>Edit your post</strong>
					</p>
					<Row
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						{post.imagePostUrl && (
							<img className="inputRender" src={post.imagePostUrl} />
						)}
						{post.videoPostUrl && (
							<video className="inputRender" controls>
								<source src={post.videoPostUrl} type="video/mp4" />
							</video>
						)}
						<p>
							If you do not want to change the image or video, please copy the
							link and paste it below.
						</p>
						{post.imagePostUrl && (
							<p style={{ fontSize: 8, color: "blue" }}>{post.imagePostUrl}</p>
						)}
						{post.videoPostUrl && (
							<p style={{ fontSize: 8, color: "blue" }}>{post.videoPostUrl}</p>
						)}
					</Row>
					<Row
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<input
							className="inputEditChange"
							placeholder={post.postContent}
							value={postEdited.postContent}
							name="postContent"
							onChange={onChangeEditInput}
						/>
						<br />

						{post.imagePostUrl && (
							<input
								type="text"
								className="inputEditChange"
								onChange={onChangeEditInput}
								value={postEdited.imagePostUrl}
								placeholder={post.imagePostUrl}
								name="imagePostUrl"
							/>
						)}
						{post.videoPostUrl && (
							<Row>
								<input
									className="inputEditChange"
									onChange={onChangeEditInput}
									value={postEdited.videoPostUrl}
									placeholder={post.videoPostUrl}
									name="videoPostUrl"
								/>
							</Row>
						)}
					</Row>
				</Card>
			)}
		</Modal>
	);
}

export default EditAPost;
