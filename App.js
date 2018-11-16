import React, { Component } from "react";
import { Font, AppLoading, Asset } from "expo";
import { Image } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Provider, connect } from "react-redux";
import { CacheManager } from "react-native-expo-image-cache";
import { createStore } from "redux";
import MainApp from "./src/";
import reducers from "./src/reducers";
import { View, Root } from "native-base";
import { rnFill } from "./src/tools";
import { DB } from "./src/config/base";
import { updateEvents, updateCategories } from "./src/actions";

class RootApp extends Component {
  state = { isReady: false };

  _loadfonts = (...fonts) => fonts.map(font => Font.loadAsync(font));

  _loadImages = (...images) =>
    images.map(image => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });

  _loadAssets = async () => {
    const fontAssets = this._loadfonts(
      {
        Roboto: require("./assets/fonts/WorkSans/WorkSans-Regular.ttf")
      },
      {
        Roboto_medium: require("./assets/fonts/WorkSans/WorkSans-SemiBold.ttf")
      },
      { font: require("./assets/fonts/WorkSans/WorkSans-Regular.ttf") },
      { font_bold: require("./assets/fonts/WorkSans/WorkSans-Bold.ttf") },
      {
        font_sBold: require("./assets/fonts/WorkSans/WorkSans-SemiBold.ttf")
      },
      {
        font_xBold: require("./assets/fonts/WorkSans/WorkSans-ExtraBold.ttf")
      },
      { font_thin: require("./assets/fonts/WorkSans/WorkSans-Thin.ttf") },
      { font_light: require("./assets/fonts/WorkSans/WorkSans-Light.ttf") },
      Feather.font,
      Ionicons.font
    );

    const imgAssets = this._loadImages(
      require("./assets/icon.png"),
      require("./assets/splash.png")
    );

    await Promise.all([...fontAssets, ...imgAssets])
      .then(() => console.log("done"))
      .catch(err => console.warn(err));
  };

  launch = () => {
    this.setState({ isReady: true });
  };

  async componentDidMount() {
    DB.listenTo("events", {
      context: this,
      asArray: true,
      then: events => {
        //make a new event array
        const _events = [];
        const len = events.length;

        //check if image has been cached and display it
        events.map(async (e, i) => {
          const path = await CacheManager.get(e.img.uri).getPath();
          if (path) {
            e.img.cached = path;
          }

          _events.push(e);
          if (i + 1 === len) {
            this.props.updateEvents(_events.reverse());
          }
        });
      },
      onFailure: err => {
        console.log(err);
      }
    });

    DB.listenTo("categories", {
      context: this,
      asArray: true,
      then: categories => {
        this.props.updateCategories(categories);
      },
      onFailure: err => {
        console.log(err);
      }
    });
  }

  render() {
    return !this.state.isReady ? (
      <AppLoading startAsync={this._loadAssets} onFinish={this.launch} />
    ) : (
      <View style={{ ...rnFill }}>
        <MainApp />
      </View>
    );
  }
}

const AppConnect = connect(
  null,
  { updateEvents, updateCategories }
)(RootApp);

export default class App extends Component {
  render() {
    return (
      <Root>
        <Provider store={createStore(reducers)}>
          <AppConnect />
        </Provider>
      </Root>
    );
  }
}
