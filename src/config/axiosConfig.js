import { create } from "axios";
import { store } from "../index";
import { baseUrl } from "../config";

const api = create({
	//baseURL: "https://biblur-back.herokuapp.com",
	baseURL: baseUrl,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	timeout: 60000,
});

api.interceptors.request.use((config) => {
	const state = store.getState();
	console.log("state", state);
	const token = state.authentication.token;
	return {
		...config,
		headers: { ...config.headers, Authorization: `Bearer ${token}` },
	};
});

// Add a response interceptor
// api.axiosInstance.interceptors.response.use((response) => response, (error) => {
//   // Do something with response error
//   if (error.response.status === 401) {
//     window.alert('Something went wrong!. Please login again');  //eslint-disable-line
//     // window.location.reload();
//     store.dispatch(removeToken());
//     window.location.href = '/#/login';
//   }
//   return Promise.reject(error.response);
// });

export default api;
