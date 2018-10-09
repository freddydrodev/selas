import { createSwitchNavigator } from "react-navigation";
import auth from "./auth";
import privateRoute from "./privateRoute";

const route = createSwitchNavigator({
  app: privateRoute,
  auth
});

export default route;
