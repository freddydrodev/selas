import React, { Component } from "react";
import { NetInfo } from "react-native";
import { connect } from "react-redux";
import { AUTH, DB } from "../config/base";
import LoadingScreen from "../components/LoadingScreen";
import { setCurrentUser } from "../actions";
import { Toast } from "native-base";

class Bridge extends Component {
  componentDidMount() {
    const tm = setTimeout(() => {
      Toast.show({
        text: "If the page do not appear check your network",
        duration: 60000
      });
    }, 5000);

    AUTH.onAuthStateChanged(user => {
      clearTimeout(tm);
      if (user) {
        const { displayName, email, emailVerified, uid } = user;
        if (!emailVerified) {
          user.sendEmailVerification();
        }
        DB.listenTo("users", {
          context: this,
          asArray: true,
          then: users => {
            const inDB = users.filter(u => {
              return u.uid === user.uid;
            })[0];

            this.props.setCurrentUser(inDB || user);
            // console.log("[BRIDGE]", inDB, user);
            if (!!!inDB) {
              DB.post(`users/${user.uid}`, {
                data: {
                  displayName,
                  email,
                  emailVerified,
                  uid
                }
              })
                .then(() => {
                  console.log("[BRIDGE/POST/DONE]");
                })
                .catch(err => console.war(err))
                .then(() =>
                  this.props.navigation.navigate(user ? "app" : "auth")
                );
            } else {
              this.props.navigation.navigate(user ? "app" : "auth");
            }
          }
        });
      } else {
        this.props.setCurrentUser(null);
        this.props.navigation.navigate(user ? "app" : "auth");
      }
    });
  }

  render() {
    return <LoadingScreen text="Loading the app please wait..." />;
  }
}

export default connect(
  null,
  { setCurrentUser }
)(Bridge);
