import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, Tab, Tabs, ScrollableTab } from "native-base";
import MainHeader from "../components/commons/MainHeader";
import { primaryColor, bgLight, textColor } from "../tools";
import EventCard from "../components/commons/EventCard";

class Events extends Component {
  state = {
    categories: [],
    data: [],
    isReady: false,
    selectedPage: 0
  };

  render() {
    console.log(`[ID] ${this.state.selectedPage}`);

    return (
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
            {this._renderTab()}
          </Tabs>
        </Content>
      </Container>
    );
  }

  _renderTab = () => {
    return ["All", ...this.props.categories].map(e => (
      <Tab
        heading={e.toUpperCase()}
        key={e}
        tabStyle={{
          backgroundColor: bgLight,
          borderColor: "green"
        }}
        textStyle={{ color: textColor, fontFamily: "font", fontSize: 12 }}
        activeTextStyle={{
          color: primaryColor,
          fontFamily: "font",
          fontSize: 12,
          fontWeight: "normal"
        }}
        activeTabStyle={{
          backgroundColor: bgLight
        }}
      >
        {this.props.events.map(e => (
          <EventCard key={e.key} data={{ ...e, id: e.key }} />
        ))}
      </Tab>
    ));
  };
}

const mstp = ({ events, categories }) => ({
  events,
  categories
});

export default connect(mstp)(Events);
