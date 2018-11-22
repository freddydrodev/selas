import {
  UPDATE_EVENTS,
  UPDATE_CATEGORIES,
  UPDATE_USERS,
  SET_CURRENT_USER
} from "./actionType.js";

export const updateEvents = events => ({
  type: UPDATE_EVENTS,
  events
});

export const updateCategories = categories => ({
  type: UPDATE_CATEGORIES,
  categories
});
export const updateUsers = users => ({
  type: UPDATE_USERS,
  users
});
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});
