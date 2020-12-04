import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createANewPost, getAllPosts } from "../../reducers/postManagement";
import { Modal, Row, Col, Input } from "antd";

function CreatePostImageUrl({ visible, onCancel }) {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.authentication.user.id);

	const [post, setPost] = useState({
		postContent: "",
		location: "",
		userId,
		imagePostUrl: "",
	});

	const updatePostInput = (e) => {
		e.persist();
		const { name, value } = e.target;
		setPost((prev) => ({ ...prev, [name]: e.target.value }));
	};
	const onPost = (e) => {
		e.preventDefault();
		dispatch(createANewPost(post));
		dispatch(getAllPosts());
		onCancel();
		setPost({});
	};

	const { TextArea } = Input;
	return (
		<Modal
			title="Create a Post"
			visible={visible}
			onCancel={onCancel}
			onOk={onPost}
		>
			<Row>
				<Col>
					<TextArea
						onChange={updatePostInput}
						name="postContent"
						rows={4}
						placeholder={`What's is on your mind?`}
						value={post.postContent}
						style={{
							padding: "1rem 2rem",
							border: "1px solid #0e414918",
							borderRadius: "2rem",
							margin: "1rem",
							position: "relative",
							boxShadow: "0 0 10px  0 Turquoise",
							fontSize: "1.2rem",
						}}
					/>
					<Input
						placeholder={"where are you ?"}
						name="location"
						value={post.location}
						onChange={updatePostInput}
						style={{
							padding: "1rem 2rem",
							border: "1px solid #0e414918",
							borderRadius: "2rem",
							margin: "1rem",
							position: "relative",
							boxShadow: "0 0 10px  0 Turquoise",
							fontSize: "1.2rem",
						}}
					/>
					<Input
						placeholder={"Image url"}
						name="imagePostUrl"
						value={post.imagePostUrl}
						onChange={updatePostInput}
						style={{
							padding: "1rem 2rem",
							border: "1px solid #0e414918",
							borderRadius: "2rem",
							margin: "1rem",
							position: "relative",
							boxShadow: "0 0 10px  0 Turquoise",
							fontSize: "1.2rem",
						}}
					/>
				</Col>
			</Row>
		</Modal>
	);
}

export default CreatePostImageUrl;
