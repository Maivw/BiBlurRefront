import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createANewPost, getAllPosts } from "../../reducers/postManagement";
import { Modal, Row, Col, Input } from "antd";
import { PictureOutlined } from "@ant-design/icons";

function CreatePostImageFile({ visible, onCancel }) {
	const dispatch = useDispatch();
	const [imageFile, setImageFile] = useState("");
	const userId = useSelector((state) => state.authentication.user.id);
	const [file, setFile] = useState("");
	const [post, setPost] = useState({
		postContent: "",
		location: "",
		userId,
		videoPostUrl: "",
		imagePostUrl: "",
	});

	const updatePostInput = (e) => {
		e.persist();
		const { name, value } = e.target;
		setPost((prev) => ({ ...prev, [name]: e.target.value }));
	};
	const onPost = (e) => {
		e.preventDefault();
		let data = new FormData();
		data.append("postContent", post.postContent);
		data.append("imagePostUrl", file);
		data.append("location", post.location);
		data.append("userId", post.userId);
		dispatch(createANewPost(data));
		dispatch(getAllPosts());
		onCancel();
		setPost({});
	};
	const handleChangeUpload = (e) => {
		setImageFile(URL.createObjectURL(e.target.files[0]));
		setFile(e.target.files[0]);
	};
	const { TextArea } = Input;
	return (
		<Modal
			title="Create a Post"
			visible={visible}
			onCancel={onCancel}
			onOk={onPost}
			className="modal__createPost"
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
					<label>
						<PictureOutlined style={{ color: "white" }} />
						<Input
							name="imagePostUrl"
							type="file"
							style={{ display: "none" }}
							onChange={handleChangeUpload}
							value={post.imagePostUrl}
						/>
					</label>
					{file && <img src={imageFile} alt="img" style={{ height: 50 }} />}
				</Col>
			</Row>
		</Modal>
	);
}

export default CreatePostImageFile;
