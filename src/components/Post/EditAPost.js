import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCurrentPost, getAPost } from "../../reducers/postManagement";
import { Row, Col, Card, Modal, Input } from "antd";

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
				<Card hoverable className="cardEdit">
					<Row>
						<span
							style={{
								color: "white",
								textTransform: "capitalize",
								fontWeight: "300",
							}}
						>
							Edit your post
						</span>
					</Row>
					<Row className="cardEdit__body">
						{post.imagePostUrl && (
							<img
								className="cardEdit__body-imageVideo"
								src={post.imagePostUrl}
							/>
						)}
						{post.videoPostUrl && (
							<video className="cardEdit__body-imageVideo" controls>
								<source src={post.videoPostUrl} type="video/mp4" />
							</video>
						)}
						<p style={{ fontSize: "1.2rem", color: "white" }}>
							If you do not want to change the image or video, please copy the
							link and paste it below.
						</p>
						<div>
							{post.imagePostUrl && (
								<p style={{ fontSize: "0.8rem", color: "white" }}>
									{post.imagePostUrl}
								</p>
							)}
							{post.videoPostUrl && (
								<p style={{ fontSize: "0.8rem", color: "white" }}>
									{" "}
									{post.videoPostUrl}
								</p>
							)}
						</div>
					</Row>
					<Row className="cardEdit__footer">
						<Col>
							<Row>
								<span
									style={{
										color: "white",
										textTransform: "capitalize",
										fontWeight: "300",
									}}
								>
									What's on your mind?
								</span>
							</Row>
							<Input
								placeholder={post.postContent}
								value={postEdited.postContent}
								name="postContent"
								onChange={onChangeEditInput}
								style={{
									padding: "1rem 2rem",
									border: "1px solid #0e414918",
									borderRadius: "2rem",
									margin: "1rem",
									position: "relative",
									width: "95%",
									fontSize: "1.2rem",
								}}
							/>

							<span
								style={{
									color: "white",
									textTransform: "capitalize",
									fontWeight: "300",
								}}
							>
								Image or Video url
							</span>
							{post.imagePostUrl && (
								<Input
									type="text"
									onChange={onChangeEditInput}
									value={postEdited.imagePostUrl}
									placeholder={post.imagePostUrl}
									name="imagePostUrl"
									style={{
										padding: "1rem 2rem",
										border: "1px solid #0e414918",
										borderRadius: "2rem",
										margin: "1rem",
										position: "relative",
										width: "95%",
										fontSize: "1.2rem",
									}}
								/>
							)}
							{post.videoPostUrl && (
								<Input
									className="inputEditChange"
									onChange={onChangeEditInput}
									value={postEdited.videoPostUrl}
									placeholder={post.videoPostUrl}
									name="videoPostUrl"
									style={{
										padding: "1rem 2rem",
										border: "1px solid #0e414918",
										borderRadius: "2rem",
										margin: "1rem",
										position: "relative",
										width: "95%",
										fontSize: "1.2rem",
									}}
								/>
							)}
						</Col>
					</Row>
				</Card>
			)}
		</Modal>
	);
}

export default EditAPost;
