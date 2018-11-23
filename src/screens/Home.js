import React, { Component } from "react";
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import MainHeader from "../components/commons/MainHeader";
import { BASE_SPACE, rnSetPadding } from "../tools";
import PopularEvents from "../components/Home/PopularEvents";
import Categories from "../components/Home/Categories";
import RecentEvents from "../components/Home/RecentEvents";
class Home extends Component {
  render() {
    const { events, categories } = this.props;
    return (
      <Container>
        <MainHeader title="Discovery" />
        <Content
          showsVerticalScrollIndicator={false}
          style={{ ...rnSetPadding(BASE_SPACE, "vertical") }}
        >
          <PopularEvents data={events} />
          <Categories categories={categories} />
          <RecentEvents data={events} />
        </Content>
      </Container>
    );
  }
}

const mstp = ({ events, categories }) => ({
  events,
  categories
});

export default connect(mstp)(Home);
