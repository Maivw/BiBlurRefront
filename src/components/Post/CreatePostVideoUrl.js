import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createANewPost, getAllPosts } from "../../reducers/postManagement";
import { Modal, Row, Col, Input } from "antd";

function CreatePostVideoUrl({ visible, onCancel }) {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.authentication.user.id);

	const [post, setPost] = useState({
		postContent: "",
		location: "",
		userId,
		videoPostUrl: "",
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
		<div>
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
						/>
						<Input
							placeholder={"where are you ?"}
							name="location"
							value={post.location}
							onChange={updatePostInput}
						/>
						<Input
							placeholder={"video url"}
							name="videoPostUrl"
							value={post.videoPostUrl}
							onChange={updatePostInput}
						/>
					</Col>
				</Row>
			</Modal>
		</div>
	);
}

export default CreatePostVideoUrl;
