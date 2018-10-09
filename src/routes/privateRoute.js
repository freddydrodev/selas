//in App route accessed after login/registration
import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { bgColor, textColor, linkActive, bgLight } from "../tools";
import Home from "../screens/Home";
import Cart from "../screens/Cart";
import Events from "../screens/Events";
import AddEvent from "../screens/AddEvent";
import EventDetail from "../screens/EventDetail";
import Favorite from "../screens/Favorite";
import Search from "../screens/Search";
import Account from "../screens/Account";
import Settings from "../screens/Settings";
import { Icon } from "native-base";

const tabRoute = createBottomTabNavigator(
  {
    home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon
            type="Feather"
            name="home"
            style={{ color: tintColor, fontSize: 20 }}
          />
        )
      }
    },
    events: {
      screen: Events,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon
            type="Feather"
            name="list"
            style={{ color: tintColor, fontSize: 20 }}
          />
        )
      }
    },

    cart: {
      screen: Cart,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon
            type="Feather"
            name="shopping-cart"
            style={{ color: tintColor, fontSize: 20 }}
          />
        )
      }
    },
    favorite: {
      screen: Favorite,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon
            type="Feather"
            name="heart"
            style={{ color: tintColor, fontSize: 20 }}
          />
        )
      }
    },
    settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon
            type="Feather"
            name="settings"
            style={{ color: tintColor, fontSize: 20 }}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      initialRouteName: "events",
      activeTintColor: linkActive,
      inactiveTintColor: textColor,
      showLabel: false,
      style: {
        borderTopColor: bgLight,
        backgroundColor: bgColor
      }
    }
  }
);

const route = createStackNavigator({
  tab: {
    screen: tabRoute,
    navigationOptions: {
      header: null
    }
  },
  add: AddEvent,
  eventDetail: {
    screen: EventDetail,
    navigationOptions: {
      title: "Event Detail"
    }
  },
  search: Search,
  account: Account
});

export default route;
