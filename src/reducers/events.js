import { UPDATE_EVENTS } from "../actions/actionType";

const events = (state = [], { type, events }) => {
  switch (type) {
    case UPDATE_EVENTS:
      return events;
    default:
      return state;
  }
};

export default events;
