import { UPDATE_EVENTS, UPDATE_CATEGORIES } from "./actionType.js";

export const updateEvents = events => ({
  type: UPDATE_EVENTS,
  events
});

export const updateCategories = categories => ({
  type: UPDATE_CATEGORIES,
  categories
});
