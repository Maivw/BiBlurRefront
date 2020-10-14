import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login, signup } from "../../reducers/authentication";
import "./Login.css";

import { Form, Input, Row, Col } from "antd";
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

function Login(props) {
	useEffect(() => {
		const signUpButton = document.getElementById("signUp");
		const signInButton = document.getElementById("signIn");
		const container = document.getElementById("container");

		signUpButton.addEventListener("click", () => {
			container.classList.add("right-panel-active");
		});

		signInButton.addEventListener("click", () => {
			container.classList.remove("right-panel-active");
		});
	}, []);
	const token = useSelector((state) => state.authentication.token);
	const dispatch = useDispatch();
	const [loginFields, setLoginFields] = useState({
		email: "demo@gmail.com",
		password: "password",
	});

	const onChangeInputFiels = (e) => {
		e.persist();
		const { value, name } = e.target;
		setLoginFields((prev) => ({ ...prev, [name]: e.target.value }));
	};
	const onLogin = (e) => {
		e.preventDefault();
		dispatch(login(loginFields));
	};

	const onFinish = (values) => {
		console.log("Success:", values);
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const [signUpFields, setSignUpFields] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const onChangeSignUpFields = (e) => {
		e.persist();
		const { name, value } = e.target;
		setSignUpFields((prev) => ({ ...prev, [name]: e.target.value }));
	};
	const onSignUp = (e) => {
		e.preventDefault();
		dispatch(signup(signUpFields));
	};

	if (token) {
		return <Redirect to="/" />;
	}

	return (
		<div className="forms">
			<div className="container" id="container">
				<div className="form-container sign-up-container">
					<form>
						<h1>Create Account</h1>
						<span>by using your email for registration</span>
						<Input
							name="username"
							label="User Name"
							value={signUpFields.username}
							onChange={onChangeSignUpFields}
							placeholder="username"
						/>
						<Input
							name="email"
							label="E-mail"
							value={signUpFields.email}
							onChange={onChangeSignUpFields}
							placeholder="email"
						/>

						<Input
							type="password"
							name="password"
							label="Password"
							value={signUpFields.password}
							onChange={onChangeSignUpFields}
							placeholder="password"
						/>

						<Input
							type="password"
							name="confirmPassword"
							label="Confirm Password"
							value={signUpFields.confirmPassword}
							onChange={onChangeSignUpFields}
							placeholder="Confirm password"
						/>

						<button type="primary" onClick={onSignUp}>
							Register
						</button>
					</form>
				</div>
				<div className="form-container sign-in-container">
					<form
						{...layout}
						name="basic"
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<h1>Sign in</h1>
						<Input
							label="Email"
							name="email"
							value={loginFields.email}
							onChange={onChangeInputFiels}
						/>

						<Input
							type="password"
							label="Password"
							name="password"
							value={loginFields.password}
							onChange={onChangeInputFiels}
						/>

						<button type="primary" onClick={onLogin}>
							Login
						</button>
					</form>
				</div>
				<div className="overlay-container">
					<div className="overlay">
						<div className="overlay-panel overlay-left">
							<h1 className="text">Welcome Back!</h1>
							<p>
								To keep connected with us please login with your personal info
							</p>
							<button className="ghost" id="signIn">
								Sign In
							</button>
						</div>
						<div className="overlay-panel overlay-right">
							<h1 className="text">Hello, Friend!</h1>
							<p>Enter your personal details and start journey with us</p>
							<button className="ghost" id="signUp">
								Sign Up
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
