import axios from "axios";
import * as actions from "./actionTypes";

const apiEndPoint = process.env.REACT_APP_API_URL + "users";

export const getAllUsers = () => (dispatch, getState) => {
	axios
		.get(apiEndPoint, {
			headers: { "x-auth-token": getState().loginReducer.token },
		})
		.then((response) =>
			dispatch({
				type: actions.GET_ALL_USERS,
				payload: { usersG: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};