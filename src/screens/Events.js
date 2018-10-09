import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Tab, Tabs, ScrollableTab } from "native-base";
import MainHeader from "../components/commons/MainHeader";
import { primaryColor, bgLight, textColor } from "../tools";
import EventCard from "../components/commons/EventCard";
import LoadingScreen from "../components/LoadingScreen";
import { db } from "../config/base";

class Events extends Component {
  state = {
    categories: ["Food", "Festival", "Music", "Party", "Religion", "Art"],
    data: [],
    isReady: false
  };

  render() {
    const {} = style;

    return (
      this.state.isReady && (
        <Container>
          <MainHeader title="Events" hasTabs />
          <Content>
            <Tabs
              renderTabBar={() => <ScrollableTab />}
              tabBarUnderlineStyle={{
                backgroundColor: primaryColor,
                height: 2
              }}
              style={{ borderBottomColor: "red" }}
            >
              {this._renderTab(this.state.categories)}
            </Tabs>
          </Content>
        </Container>
      )
    );
  }

  _renderTab = ar => {
    const newAr = [...ar];
    newAr.unshift("All");
    return newAr.map(e => (
      <Tab
        heading={e.toUpperCase()}
        key={e}
        tabStyle={{
          backgroundColor: bgLight,
          borderColor: "green"
        }}
        textStyle={{ color: textColor, fontFamily: "ws", fontSize: 12 }}
        activeTextStyle={{
          color: primaryColor,
          fontFamily: "ws",
          fontSize: 12,
          fontWeight: "normal"
        }}
        activeTabStyle={{
          backgroundColor: bgLight
        }}
      >
        {this.state.data.map(e => (
          <EventCard key={e.id} data={e} />
        ))}
      </Tab>
    ));
  };

  async componentDidMount() {
    // await db
    //   .collection("events")
    //   .orderBy("createdAt", "desc")
    //   .get()
    //   .then(docs => {
    //     const data = [];
    //     docs.forEach(doc => {
    //       data.push({ id: doc.id, ...doc.data() });
    //     });
    //     this.setState({ isReady: true, data }, () => {
    //       console.log("done");
    //     });
    //   })
    //   .catch(() => {});
  }
}

export default Events;

const style = StyleSheet.create({});
