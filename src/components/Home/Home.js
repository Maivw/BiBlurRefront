import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GetAllPosts from "../Post/GetAllPosts";
import Logout from "../Logout/Logout";
import {
	getUserProfile,
	EditLoggedInUser,
} from "../../reducers/authentication";
import { Layout, Menu, Card, Modal, Row, Col, Input } from "antd";
import {
	UserOutlined,
	DesktopOutlined,
	LoginOutlined,
	PictureOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const imageUrlDefault =
	"http://sarangglobaltours.com/wp-content/uploads/2014/02/team.png";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function Home() {
	const token = useSelector((state) => state.authentication.token);
	const userId = useSelector((state) => state.authentication.user.id);
	const user = useSelector((state) => state.authentication.userLoggedIn);
	const [collapsed, setCollapsed] = useState(false);
	const [visible, setVisible] = useState(false);
	const [visibleEditProfile, setVisibleEditProfile] = useState(false);
	const dispatch = useDispatch();

	const [imageFile, setImageFile] = useState("");
	const [file, setFile] = useState("");
	const [userEdited, setUserEdited] = useState({
		username: "",
		imageUrl: "",
		id: userId,
	});

	const updateUserEditInput = (e) => {
		e.persist();
		const { name, value } = e.target;
		setUserEdited((prev) => ({ ...prev, [name]: e.target.value }));
	};
	const onEditUser = (e) => {
		e.preventDefault();
		let data = new FormData();
		data.append("username", userEdited.username);
		data.append("imageUrl", file);

		dispatch(EditLoggedInUser(data));
		dispatch(getUserProfile({ userId }));
		onCancelEditProfileModal();
	};
	const handleChangeUpload = (e) => {
		setImageFile(URL.createObjectURL(e.target.files[0]));
		setFile(e.target.files[0]);
	};

	const onShowEditProfileModal = (userId) => () => {
		setVisibleEditProfile(userId);
	};

	const onCancelEditProfileModal = () => {
		setVisibleEditProfile(false);
	};

	const onCollapse = (collapsed) => {
		this.setState({ collapsed });
	};

	const onShowProfileModal = () => {
		dispatch(getUserProfile({ userId }));
		setVisible(true);
	};
	const onCancel = () => {
		setVisible(false);
	};
	return (
		<>
			<Modal
				visible={visibleEditProfile}
				onCancel={onCancelEditProfileModal}
				onOk={onEditUser}
				className="editUserModal"
			>
				<p className="cardEditProfile-header">Update your profile</p>
				{user && (
					<Card
						hoverable
						className="cardEditProfile"
						cover={
							user.imageUrl ? (
								<img
									alt="example"
									src={user.imageUrl}
									className="cardEditProfile-image"
								/>
							) : (
								<img
									alt="example"
									src={imageUrlDefault}
									className="cardEditProfile-image"
								/>
							)
						}
					>
						<>
							<Input
								type="text"
								placeholder="Your username"
								value={userEdited.username}
								name="username"
								onChange={updateUserEditInput}
								className="editInput "
								autoComplete="off"
								style={{
									padding: "1rem 2rem",
									border: "1px solid #0e414918",
									borderRadius: "2rem",
									margin: "1rem",
									position: "relative",
									fontSize: "1.2rem",
								}}
							/>
							<Row className="flex justify-around">
								<label>
									<Col>
										<span style={{ padding: "1rem" }}>
											Click the Icon to update new image profile
										</span>
										<span className="updateProfileIcon">
											<PictureOutlined />
										</span>
									</Col>

									<Input
										name="imageUrl"
										type="file"
										style={{ display: "none" }}
										onChange={handleChangeUpload}
										value={userEdited.imageUrl}
										autoComplete="off"
									/>
								</label>
								{file && (
									<img
										src={imageFile}
										alt="img"
										style={{
											border: "1px solid #0e414918",
											borderRadius: "2rem",
											maxWidth: "35rem",
										}}
									/>
								)}
							</Row>
						</>
					</Card>
				)}
			</Modal>
			<Modal visible={visible} onOk={onShowProfileModal} onCancel={onCancel}>
				{user && (
					<Card
						className="cardEditProfile"
						hoverable
						cover={
							user.imageUrl ? (
								<img
									alt="example"
									src={user.imageUrl}
									className="cardEditProfile-image"
								/>
							) : (
								<img
									alt="example"
									src={imageUrlDefault}
									className="cardEditProfile-image"
								/>
							)
						}
					>
						<div style={{ fontSize: "1.2rem", color: "white" }}>
							User Name <strong>{user.username}</strong>
						</div>
						<div style={{ fontSize: "1.2rem" }}>
							Email <strong>{user.email}</strong>
						</div>

						<a
							style={{ color: "white", fontSize: "1.2rem" }}
							onClick={onCancel}
						>
							Close
						</a>
					</Card>
				)}
			</Modal>
			<Layout style={{ minHeight: "100vh" }}>
				<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
					<div className="logo" />
					<Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
						<Menu.Item key="2" icon={<DesktopOutlined />}>
							<Link style={{ fontSize: "1.2rem" }} to="/">
								Home
							</Link>
						</Menu.Item>
						<SubMenu key="sub1" icon={<UserOutlined />} title="User">
							<Menu.Item key="3" style={{ color: "white", fontSize: "1.2rem" }}>
								Followers
							</Menu.Item>
							<Menu.Item key="4" style={{ color: "white", fontSize: "1.2rem" }}>
								Followings
							</Menu.Item>
							<Menu.Item
								key="5"
								style={{
									position: "relative",
									color: "white",
									fontSize: "1.2rem",
								}}
							>
								<div
									style={{ color: "white", fontSize: "1.2rem" }}
									onClick={onShowProfileModal}
								>
									About
								</div>
							</Menu.Item>
							<Menu.Item key="6">
								<div
									style={{ color: "white", fontSize: "1.2rem" }}
									onClick={onShowEditProfileModal(userId)}
								>
									Update
								</div>
							</Menu.Item>
						</SubMenu>
						<Menu.Item key="3">
							{token ? (
								<Logout />
							) : (
								<Link
									to="/login"
									style={{ color: "white", fontSize: "1.2rem" }}
								>
									<LoginOutlined /> Log in
								</Link>
							)}
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className="site-layout">
					<Header className="site-layout-background" style={{ padding: 0 }}>
						<div className="logo" />

						<Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
							<Menu.Item key="1">
								<Link to="/">
									<img
										src="https://res.cloudinary.com/maivw/image/upload/v1598292590/05f4a9f5-9714-4ba2-85f5-bc6e550b7b35_200x200_djglwy.png"
										style={{ height: "14rem" }}
									/>
								</Link>
							</Menu.Item>
						</Menu>
					</Header>
					<Content style={{ marginTop: "20rem" }}>
						<div>
							<GetAllPosts />
						</div>
					</Content>
				</Layout>
			</Layout>
		</>
	);
}

export default Home;
