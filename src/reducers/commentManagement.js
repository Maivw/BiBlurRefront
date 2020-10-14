import axios from "../config/axiosConfig";
const CREATE_NEW_COMMENT = "CREATE_NEW_COMMENT";
const DELETE_A_COMMENT = "DELETE_A_COMMENT";
const EDIT_A_COMMENT = "EDIT_A_COMMENT";
const DISPLAY_A_COMMENT = "DISPLAY_A_COMMENT ";
const DISPLAY_ALL_COMMENTS = "DISPLAY_ALL_COMMENTS ";

export const createNewComment = (comment) => {
	return {
		type: CREATE_NEW_COMMENT,
		comment,
	};
};
export const deleteComment = (comment) => ({
	type: DELETE_A_COMMENT,
	comment,
});
export const editComment = (comment) => ({
	type: EDIT_A_COMMENT,
	comment,
});
export const displayComment = (comment) => ({
	type: DISPLAY_A_COMMENT,
	comment,
});

export const displayAllComments = (comments) => ({
	type: DISPLAY_ALL_COMMENTS,
	comments: comments,
});

export const MakeAComment = (params) => async (dispatch) => {
	const result = await axios.post(`/comments/${params.postId}`, { ...params });

	dispatch(createNewComment(result.data.comment));
};
export const GetComments = (params) => async (dispatch) => {
	const result = await axios.get(`/comments/${params.postId}`, params);
	dispatch(displayAllComments(result.data.comments));
};

export const DeleteAComment = (params) => async (dispatch) => {
	const result = await axios.delete(
		`/comments/${params.postId}/${params.commentId}`,
		params
	);
	dispatch(deleteComment(result.data.comment));
};
export const EditAComment = (params) => async (dispatch) => {
	const result = await axios.put(
		`/comments/${params.postId}/${params.commentId}`,
		params
	);
	dispatch(editComment(result.data.comment));
};

const initialState = {
	comments: [],
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_NEW_COMMENT: {
			return {
				...state,
				comments: [action.comment, ...state.comments],
			};
		}
		case DISPLAY_ALL_COMMENTS: {
			return {
				...state,
				comments: action.comments,
			};
		}
		case DISPLAY_A_COMMENT: {
			return {
				...state,
				comment: action.comment,
			};
		}

		case DELETE_A_COMMENT: {
			let newState = [...state.comments];
			newState = newState.filter((comment) => comment.id !== action.comment.id);
			return {
				...state,
				comments: [...newState],
			};
		}

		case EDIT_A_COMMENT: {
			return {
				...state,
				comments: state.comments.map((comment) => {
					if (comment.id == action.comment.id) {
						return action.comment;
					}
					return comment;
				}),
			};
		}
		default:
			return state;
	}
}
