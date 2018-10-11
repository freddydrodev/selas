import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Tab, Tabs, ScrollableTab } from "native-base";
import MainHeader from "../components/commons/MainHeader";
import { primaryColor, bgLight, textColor } from "../tools";
import EventCard from "../components/commons/EventCard";
import { db } from "../config/base";

class Events extends Component {
  state = {
    categories: [],
    data: [],
    isReady: false,
    selectedPage: 0
  };

  render() {
    const {} = style;
    console.log(`[ID] ${this.state.selectedPage}`);

    return (
      this.state.isReady && (
        <Container>
          <MainHeader title="Events" hasTabs />
          <Content>
            <Tabs
              initialPage={this.state.selectedPage}
              onChangeTab={e => console.log(e)}
              page={this.state.selectedPage}
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
          <EventCard key={e.key} data={{ ...e, id: e.key }} />
        ))}
      </Tab>
    ));
  };

  async componentDidMount() {
    await db.bindToState("events", {
      context: this,
      state: "data",
      asArray: true,
      keepKeys: true,
      queries: {
        orderByKey: "child_added"
      },
      then: () => {
        db.bindToState("categories", {
          context: this,
          state: "categories",
          asArray: true,
          then: () => {
            const selectedPage = this.props.navigation.getParam(
              "selectedPage",
              0
            );
            this.setState({ isReady: true }, () => {
              this.setState({ selectedPage });
            });
          },
          onFailure: err => {
            console.log(err);
          }
        });
      },
      onFailure: err => {
        console.log(err);
      }
    });
  }
}

export default Events;

const style = StyleSheet.create({});
