import { UPDATE_CATEGORIES } from "../actions/actionType";

const categories = (state = [], { type, categories }) => {
  switch (type) {
    case UPDATE_CATEGORIES:
      return categories;
    default:
      return state;
  }
};

export default categories;
