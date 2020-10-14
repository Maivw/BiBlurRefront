require("dotenv").config();

module.exports = {
	baseUrl:
		process.env.NODE_ENV == "development"
			? process.env.REACT_APP_API_BASE_URL
			: "https://biblurback.herokuapp.com/",
};
