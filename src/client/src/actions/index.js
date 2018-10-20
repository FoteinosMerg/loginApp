// Makes ajax requests to backend api
import axios from "axios";

// Import action types
import { FETCH_USER } from "./types";

// Define action creators

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/users/current");
  dispatch({ type: FETCH_USER, payload: res.data });
};
