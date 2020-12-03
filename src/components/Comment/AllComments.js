import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetComments } from "../../reducers/commentManagement";
import { LikeComment } from "../../reducers/postManagement";
import { MoreOutlined, HeartFilled } from "@ant-design/icons";
import { Row, Col, Popover } from "antd";
import { Collapse } from "react-collapse";
import CreateAComment from "./CreateAComment";
import DeleteSingleComment from "./DeleteAComment";
import EditSingleComment from "./EditSingleComment";
import _ from "lodash";

const imageUrlDefault =
	"http://sarangglobaltours.com/wp-content/uploads/2014/02/team.png";

const theme = {
	collapse: "ReactCollapse--collapse",
	content: "ReactCollapse--content",
};
export default function AllComments(props) {
	const dispatch = useDispatch();
	const user_Id = useSelector((state) => state.authentication.user.id);
	const comments = useSelector((state) => state.commentManagement.comments);
	const posts = useSelector((state) => state.postManagement.Posts);
	const { postId, isOpened, postUserId, userLoginId } = props;
	const [visibleShowmore, setVisibleShowmore] = useState(false);
	const userLogin = useSelector((state) => state.authentication.userLoggedIn);
	useEffect(() => {
		if (postId === isOpened) {
			onShowComments();
		}
	}, [isOpened]);

	const onShowComments = () => {
		dispatch(GetComments({ postId }));
	};
	const onShowMore = (commentId) => () => {
		setVisibleShowmore(commentId);
	};
	const closeShowmore = (e) => {
		setVisibleShowmore(false);
	};
	const onLikeComment = (commentId, postId, user_Id) => () => {
		dispatch(LikeComment({ commentId, postId, user_Id }));
	};

	return (
		<div>
			<Collapse
				isOpened={isOpened === postId}
				theme={theme}
				style={{ marginTop: 20 }}
			>
				{comments &&
					comments.map((comment) => {
						const currentPost = posts.find((e) => e.id === comment.postId);
						const isLiked = _.get(currentPost, "Likes", []).find(
							(e) => e.commentId === comment.id
						);
						return (
							<Row key={comment.id} className="comments">
								<Row className="comment__top">
									<Col xl={3} md={3} xs={3} className="comment__avatar">
										{comment.User.imageUrl ? (
											<img
												src={comment.User.imageUrl}
												alt={comment.User.username}
												className="comment__avatar-image"
											/>
										) : (
											<img
												src={imageUrlDefault}
												alt="avatar"
												className="comment__avatar-image"
											/>
										)}
									</Col>
									<Row className="comment__content" xl={19} md={19} xs={19}>
										<Col>{comment.commentContent}</Col>
										<Col
											style={{
												display: "flex",
												justifyContent: "space-around",
											}}
										>
											<Col style={{ marginRight: "1rem" }}>
												<HeartFilled
													onClick={onLikeComment(comment.id, postId, user_Id)}
													style={{
														color: isLiked ? "red" : "#025f57ec",
													}}
													className="app__createPost-wrapper-icon"
												/>
											</Col>
											<Col className="app__popover">
												<Popover
													content={
														<div>
															<EditSingleComment
																postId={postId}
																commentId={comment.id}
																OnSendClose={closeShowmore}
																userId={comment.userId}
															/>
															<div
																style={{
																	display: "flex",
																	justifyContent: "space-between",
																	marginTop: 10,
																	color: "yellow",
																}}
															>
																<DeleteSingleComment
																	postId={postId}
																	commentId={comment.id}
																	postUserId={postUserId}
																	userLoginId={userLoginId}
																	userId={comment.userId}
																/>
																<p
																	onClick={closeShowmore}
																	style={{ marginLeft: 15, color: "#8c8c8c" }}
																>
																	Close
																</p>
															</div>
														</div>
													}
													title=""
													trigger="click"
													visible={visibleShowmore === comment.id}
													className="popover"
												></Popover>
												<MoreOutlined
													onClick={onShowMore(comment.id)}
													className="app__createPost-wrapper-icon"
												/>
											</Col>
										</Col>
									</Row>
								</Row>
							</Row>
						);
					})}
				<CreateAComment postId={postId} />
			</Collapse>
		</div>
	);
}
