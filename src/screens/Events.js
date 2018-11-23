import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import {
  Container,
  Content,
  Tab,
  Tabs,
  ScrollableTab,
  Text
} from "native-base";
import MainHeader from "../components/commons/MainHeader";
import { primaryColor, bgLight, textColor } from "../tools";
import EventCard from "../components/commons/EventCard";

class Events extends Component {
  state = {
    categories: [],
    data: [],
    isReady: false,
    selectedPage: this.props.navigation.getParam("selectedPage", 0)
  };

  render() {
    return (
      <Container>
        <MainHeader title="Events" hasTabs />
        <Content>
          <Tabs
            initialPage={this.state.selectedPage}
            renderTabBar={() => <ScrollableTab />}
            tabBarUnderlineStyle={{ backgroundColor: primaryColor, height: 2 }}
            style={{ borderBottomColor: "red" }}
          >
            {this._renderTabs()}
          </Tabs>
        </Content>
      </Container>
    );
  }

  //this will render the category tab with its related details
  renderTab = (category, index) => {
    //get the event for the current tab

    let _events = this.props.events;

    if (category.toLowerCase() != "all") {
      _events = this.props.events.filter(
        e => e.category.toLowerCase() === category.toLowerCase()
      );
    }

    //styles
    const { tabStyle, activeTabStyle, activeTextStyle, textStyle } = styles;

    //return the tab with the events card
    return (
      <Tab
        heading={category.toUpperCase()}
        key={index}
        tabStyle={tabStyle}
        textStyle={textStyle}
        activeTextStyle={activeTextStyle}
        activeTabStyle={activeTabStyle}
      >
        {_events.map(ev => (
          <EventCard key={ev.key} data={{ ...ev, id: ev.key }} />
        ))}
      </Tab>
    );
  };

  _renderTabs = () => {
    return ["All", ...this.props.categories].map((e, i) =>
      this.renderTab(e, i)
    );
  };
}

const mstp = ({ events, categories }) => ({
  events,
  categories
});

export default withNavigation(connect(mstp)(Events));

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: bgLight,
    borderColor: "green"
  },
  textStyle: { color: textColor, fontFamily: "font", fontSize: 12 },
  activeTextStyle: {
    color: primaryColor,
    fontFamily: "font",
    fontSize: 12,
    fontWeight: "normal"
  },
  activeTabStyle: {
    backgroundColor: bgLight
  }
});
