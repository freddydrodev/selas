import { createSwitchNavigator } from "react-navigation";
import auth from "./auth";
import privateRoute from "./privateRoute";
import Bridge from "./bridge";

const route = createSwitchNavigator({
  bidge: Bridge,
  auth,
  app: privateRoute
});

export default route;
