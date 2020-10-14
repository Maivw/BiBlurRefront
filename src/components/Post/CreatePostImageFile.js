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
					</Col>
				</Row>
				<div className="flex justify-around">
					<label style={{ fontSize: "20px", marginLeft: "80%" }}>
						<span className="createPostInputIcon">
							<PictureOutlined />
						</span>
						<input
							name="imagePostUrl"
							type="file"
							style={{ display: "none" }}
							onChange={handleChangeUpload}
							value={post.imagePostUrl}
						/>
					</label>
					{file && <img src={imageFile} alt="img" style={{ height: 50 }} />}
				</div>
			</Modal>
		</div>
	);
}

export default CreatePostImageFile;
