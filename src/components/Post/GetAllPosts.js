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
	CalendarOutlined,
} from "@ant-design/icons";
import "../../index.css";

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
	const userLogin = useSelector((state) => state.authentication.userLoggedIn);
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
		<div className="app__container">
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
			<Row className="app__createPost">
				<Col className="app__createPost-heading">Create Post</Col>
				<Col className="app__createPost-options">
					<div className="app__createPost-user">
						{userLogin.imageUrl ? (
							<img
								src={userLogin.imageUrl}
								alt=""
								className="app__createPost-image"
							/>
						) : (
							<img
								src={imageUrlDefault}
								alt=""
								className="app__createPost-image"
							/>
						)}

						<p className="app__createPost-user-text">
							What's on your mind {userLogin.username}?
						</p>
					</div>
					<div className="app__createPost-icons">
						<div className="app__createPost-wrapper" onClick={onShowModal}>
							<PictureOutlined className="app__createPost-wrapper-icon" />
							<span>Photo url</span>
						</div>
						<div
							className="app__createPost-wrapper"
							onClick={onShowModalImageUrl}
						>
							<EditOutlined className="app__createPost-wrapper-icon" />
							<span>Text</span>
						</div>
						<div
							className="app__createPost-wrapper"
							onClick={onShowModalVideoUrl}
						>
							<YoutubeOutlined className="app__createPost-wrapper-icon" />
							<span>Video url</span>
						</div>
					</div>
				</Col>
			</Row>
			<Row className="app__posts" style={{ borderRadius: "2rem" }}>
				{posts &&
					posts.map((post, index) => {
						const likes = post.Likes;
						const love = post.Likes.filter((l) => l.userId === user_Id)[0];
						const l = post.Likes.filter((like) => !like.commentId).length;
						return (
							<Card className="card" key={index}>
								<Row className="card__top">
									<Col className="card__header">
										<Col className="card__header-user">
											{post && post.User && post.User.imageUrl ? (
												<img
													src={post.User.imageUrl}
													className="card__header-image"
												/>
											) : (
												<img
													src="https://www.pngkey.com/png/detail/52-522921_kathrine-vangen-profile-pic-empty-png.png"
													className="card__header-image"
												/>
											)}
											<Link
												to={`/users/${post.userId}`}
												className="card__header-name"
											>
												<p>
													{editedUser && post.userId === editedUser.id ? (
														<strong>{editedUser.username}</strong>
													) : (
														<strong>{post.User.username}</strong>
													)}
												</p>
											</Link>
										</Col>
										<Col className="card__header-info">
											<p>
												<CalendarOutlined style={{ marginRight: "1rem" }} />
												{moment(post.createdAt).format("DD/MM/YYYY h:mm:ss a")}
											</p>
											<p>
												{post.location === "" ? (
													<p></p>
												) : (
													<span>
														<i
															className="fa fa-map-marker"
															style={{ marginRight: "1rem" }}
														></i>
														{post.location}
													</span>
												)}
											</p>
										</Col>
									</Col>
									{post.userId === userLogin.id ? (
										<Col className="card__icon-delete">
											<DeleteAPost id={post.id} />
										</Col>
									) : null}
								</Row>
								<Row className="card__body">
									<Col className="card__body-content">{post.postContent}</Col>
									<Col className="card__body-iv">
										{post.imagePostUrl && (
											<img
												src={post.imagePostUrl}
												className="card__body-imageVideo"
											></img>
										)}

										{post.videoPostUrl && (
											<video className="card__body-imageVideo" controls>
												<source src={post.videoPostUrl} type="video/mp4" />
											</video>
										)}
									</Col>
								</Row>
								<Divider />
								<Row className="card__footer">
									<Col className="app__createPost-wrapper">
										<HeartFilled
											onClick={onLikePost(post)}
											style={{ color: love ? "red" : "#025f57ec" }}
											className="app__createPost-wrapper-icon"
										/>
										<span>
											{post.Likes.filter((like) => !like.commentId).length}
											{l <= 1 ? (
												<span style={{ marginLeft: 2 }}>like</span>
											) : (
												<span style={{ marginLeft: 2 }}>likes</span>
											)}
										</span>
									</Col>
									<Col
										onClick={onCollapse(post.id)}
										className="app__createPost-wrapper"
									>
										<MessageOutlined className="app__createPost-wrapper-icon" />
										<span>Comment</span>
									</Col>
									<Col className="app__createPost-wrapper">
										<ShareAltOutlined
											onClick={onRepost(post)}
											className="app__createPost-wrapper-icon"
										/>
										<span>Repost</span>
									</Col>
									<Col xl={6} md={6} xs={6} className="app__createPost-wrapper">
										<MoreOutlined
											onClick={onShowEditModal(post.id)}
											className="app__createPost-wrapper-icon"
										/>
										<span>More</span>
									</Col>
								</Row>
								<AllComments
									postId={post.id}
									isOpened={collapse}
									postUserId={post.userId}
									userLoginId={userLogin.id}
								/>
							</Card>
						);
					})}
			</Row>
		</div>
	);
}

export default GetAllPosts;
