import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Logout from "./components/Logout/Logout";
import Signup from "./components/Signup/Signup";
import GetSinglePost from "./components/Post/GetSinglePost";
import GetAllPosts from "./components/Post/GetAllPosts";

function App() {
	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/logout" component={Logout} />
					<Route exact path="/" component={Home} />
					<Route exact path="/dashboard" component={GetAllPosts} />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
