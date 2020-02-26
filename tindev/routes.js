import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "./src/pages/Login";
import Main from "./src/pages/Main";

export default createAppContainer(
  createSwitchNavigator({
    Login,
    Main
  })
);
