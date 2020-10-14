import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useParams } from "react-router";
import moment from "moment";
import { getAPost } from "../../reducers/postManagement";
import { Row, Col, Card } from "antd";

function GetSinglePost() {
	const post = useSelector((state) => state.postManagement.currentPost);
	const dispatch = useDispatch();
	let { id } = useParams();
	useEffect(() => {
		dispatch(getAPost({ id }));
	}, [id]);

	return (
		<div>
			{post && (
				<Card hoverable>
					<Row>
						<Col span={6}>
							<img
								src={post.User.imageUrl}
								width="60"
								height="60"
								style={{ borderRadius: "50%" }}
							/>
						</Col>
						<Col className="flex justify-center flex-col ml-4" span={6}>
							<Link to={`/users/${post.userId}`}>
								<div className="text-2xl">{post.User.username}</div>
							</Link>
							<div>
								{moment(post.createdAt).format("DD/MM/YYYY h:mm:ss a")} At:{" "}
								{post.location}
							</div>
						</Col>
					</Row>
					<Row></Row>
					<div>{post.postContent}</div>

					{post.imagePostUrl ? (
						<img src={post.imagePostUrl} alt="post" />
					) : (
						<video
							style={{
								maxHeight: 540,
								objectFit: "contain",
								width: "100%",
							}}
							controls
						>
							<source src={post.videoPostUrl} type="video/mp4" />
						</video>
					)}
				</Card>
			)}
		</div>
	);
}

export default GetSinglePost;
