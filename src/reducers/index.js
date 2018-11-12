import { combineReducers } from "redux";
import events from "./events";
import categories from "./categories";

const reducers = combineReducers({
  libraries: () => [],
  events,
  categories
});

export default reducers;
