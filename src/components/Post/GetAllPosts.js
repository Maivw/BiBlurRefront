import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
	getAllPosts,
	repostAPost,
	LikePost,
} from "../../reducers/postManagement";

import { Row, Col, Card, Divider } from "antd";
import moment from "moment";
import {
	MoreOutlined,
	EditOutlined,
	MessageOutlined,
	PictureOutlined,
	YoutubeOutlined,
	ShareAltOutlined,
	HeartFilled,
} from "@ant-design/icons";
import "../../index.css";
import "./GetAllPosts.css";

import CreatePostImageFile from "./CreatePostImageFile";
import CreatePostImageUrl from "./CreatePostImageUrl";
import CreatePostVideoUrl from "./CreatePostVideoUrl";
import EditAPost from "./EditAPost";
import DeleteAPost from "./DeleteAPost";
import AllComments from "../Comment/AllComments";
const imageUrlDefault =
	"http://sarangglobaltours.com/wp-content/uploads/2014/02/team.png";
function GetAllPosts(props) {
	const [collapse, setCollapse] = useState(null);
	const editedUser = useSelector((state) => state.authentication.editedUser);
	const posts = useSelector((state) => state.postManagement.posts);
	const token = useSelector((state) => state.authentication.token);
	const user_Id = useSelector((state) => state.authentication.user.id);
	const [visible, setVisible] = useState(false);
	const [visibleImageUrl, setVisibleImageUrl] = useState(false);
	const [visibleVideoUrl, setVisibleVideoUrl] = useState(false);
	const [activePostId, setActivePostId] = useState();
	const [visibleEditPost, setVisibleEditPost] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllPosts());
	}, []);

	const onShowModal = (e) => {
		setVisible(!visible);
	};
	const onCancel = () => {
		setVisible(!visible);
	};
	const onShowModalVideoUrl = (e) => {
		setVisibleVideoUrl(!visibleVideoUrl);
	};
	const onCancelVideoUrl = () => {
		setVisibleVideoUrl(!visibleVideoUrl);
	};
	const onShowModalImageUrl = (e) => {
		setVisibleImageUrl(!visibleImageUrl);
	};
	const onCancelImageUrl = () => {
		setVisibleImageUrl(!visibleImageUrl);
	};

	const onCancelEditPost = () => {
		setVisibleEditPost(false);
	};

	const onShowEditModal = (postId) => () => {
		setVisibleEditPost(true);
		setActivePostId(postId);
	};
	const onRepost = (post) => () => {
		dispatch(repostAPost(post));
	};
	const onLikePost = (post) => () => {
		dispatch(LikePost({ user_Id, ...post }));
	};

	const onCollapse = (postId) => () => {
		collapse ? setCollapse(null) : setCollapse(postId);
	};

	if (!token) {
		return <Redirect to="/login" />;
	}
	return (
		<div className="app-container">
			<CreatePostImageFile visible={visible} onCancel={onCancel} />
			<CreatePostImageUrl
				visible={visibleImageUrl}
				onCancel={onCancelImageUrl}
			/>
			<CreatePostVideoUrl
				visible={visibleVideoUrl}
				onCancel={onCancelVideoUrl}
			/>
			{visibleEditPost && (
				<EditAPost
					visible={visibleEditPost}
					onCancel={onCancelEditPost}
					id={activePostId}
				/>
			)}
			<Row className="createPost__options">
				<span>Create a Post</span>
				<Col className="text-white" style={{ marginLeft: 30 }}>
					<PictureOutlined
						onClick={onShowModal}
						style={{ color: "white", padding: 30 }}
					/>
				</Col>
				<Col className="text-white" style={{ marginLeft: 30 }}>
					<EditOutlined
						onClick={onShowModalImageUrl}
						style={{ color: "white", padding: 30 }}
					/>
				</Col>
				<Col className="text-white" style={{ marginLeft: 30 }}>
					<YoutubeOutlined
						onClick={onShowModalVideoUrl}
						style={{ color: "white", padding: 30 }}
					/>
				</Col>
			</Row>
			<Row className="allPost">
				{posts &&
					posts.map((post, index) => {
						const likes = post.Likes;
						const love = post.Likes.filter((l) => l.userId === user_Id)[0];
						console.log("love", love);

						const l = post.Likes.filter((like) => !like.commentId).length;

						return (
							<Col key={index} xs={4} sm={6} md={8} lg={10} xl={14}>
								<Card className="cardPost" key={index}>
									<Row key={index}>
										<Col
											span={12}
											style={{ display: "flex", justifyContent: "flex-start" }}
										>
											{post && post.User && post.User.imageUrl ? (
												<img
													src={post.User.imageUrl}
													className="headerCardAvatar"
												/>
											) : (
												<img
													src="https://www.pngkey.com/png/detail/52-522921_kathrine-vangen-profile-pic-empty-png.png"
													className="headerCardAvatar"
												/>
											)}
											<div className="headerCardInfo">
												<Link to={`/users/${post.userId}`}>
													<p style={{ fontSize: 16 }}>
														{editedUser && post.userId === editedUser.id ? (
															<strong>{editedUser.username}</strong>
														) : (
															<strong>{post.User.username}</strong>
														)}
													</p>
												</Link>
												<p>
													{moment(post.createdAt).format(
														"DD/MM/YYYY h:mm:ss a"
													)}
													<span style={{ marginLeft: 10 }}>
														At: {post.location}
													</span>
												</p>
											</div>
										</Col>

										<Col span={12} className="deletePostIcon">
											<DeleteAPost id={post.id} />
										</Col>
									</Row>
									<Row>
										<div className="postContent">{post.postContent}</div>
										<div>
											{post.imagePostUrl && (
												<img
													src={post.imagePostUrl}
													className="inputRender"
												></img>
											)}
										</div>
										<div>
											{post.videoPostUrl && (
												<video className="inputRender" controls>
													<source src={post.videoPostUrl} type="video/mp4" />
												</video>
											)}
										</div>
									</Row>
									<Divider style={{ marginTop: 20, marginBottom: 10 }} />
									<Row>
										<Col xl={6} md={6} xs={6} className="text-center mt-1">
											<HeartFilled
												onClick={onLikePost(post)}
												style={{ color: love ? "red" : "black" }}
											/>
											<span style={{ color: "#177ddc", marginLeft: 7 }}>
												{post.Likes.filter((like) => !like.commentId).length}
												{l <= 1 ? (
													<span style={{ marginLeft: 2 }}>like</span>
												) : (
													<span style={{ marginLeft: 2 }}>likes</span>
												)}
											</span>
										</Col>
										<Col
											xl={6}
											md={6}
											xs={6}
											className="text-center mt-1"
											onClick={onCollapse(post.id)}
										>
											<MessageOutlined />
										</Col>
										<Col xl={6} md={6} xs={6} className="text-center mt-1">
											<ShareAltOutlined onClick={onRepost(post)} />
										</Col>
										<Col xl={6} md={6} xs={6} className="text-center mt-1">
											<MoreOutlined
												className=".flex .justify-end"
												onClick={onShowEditModal(post.id)}
											/>
										</Col>
									</Row>
									<Divider style={{ marginTop: 10, marginBottom: 20 }} />
									<AllComments postId={post.id} isOpened={collapse} />
								</Card>
							</Col>
						);
					})}
			</Row>
		</div>
	);
}

export default GetAllPosts;
