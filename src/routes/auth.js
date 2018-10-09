//auth path such as login, presentation, registration, password forget, etc...
import { createStackNavigator } from "react-navigation";
import Login from "../screens/Login";
import Registration from "../screens/Registration";
import PasswordForget from "../screens/PasswordForget";

const route = createStackNavigator({
  login: Login,
  registration: Registration,
  passwordForget: PasswordForget
});

export default route;
