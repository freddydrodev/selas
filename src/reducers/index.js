import { combineReducers } from "redux";
import events from "./events";
import categories from "./categories";
import { UPDATE_USERS, SET_CURRENT_USER } from "../actions/actionType";

const reducers = combineReducers({
  libraries: () => [],
  events,
  categories,
  users: (state = [], { type, users }) => {
    switch (type) {
      case UPDATE_USERS:
        return users;
      default:
        return state;
    }
  },
  currentUser: (state = null, { type, user }) => {
    switch (type) {
      case SET_CURRENT_USER:
        return user;
      default:
        return state;
    }
  }
});

export default reducers;
