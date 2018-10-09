import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Content } from "native-base";
import MainHeader from "../components/commons/MainHeader";
import { BASE_SPACE, rnSetPadding } from "../tools";
import PopularEvents from "../components/Home/PopularEvents";
import Categories from "../components/Home/Categories";
import RecentEvents from "../components/Home/RecentEvents";
import { db } from "../config/base";
import LoadingScreen from "../components/LoadingScreen";

class Home extends Component {
  state = {
    categories: [],
    data: [],
    isReady: false
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
            this.setState({ isReady: true });
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

  render() {
    const {} = style;
    const { data, categories, isReady } = this.state;
    return isReady ? (
      <Container>
        <MainHeader title="Discovery" />
        <Content
          showsVerticalScrollIndicator={false}
          style={{ ...rnSetPadding(BASE_SPACE, "vertical") }}
        >
          <PopularEvents data={data} />
          <Categories categories={categories} />
          <RecentEvents data={data} />
        </Content>
      </Container>
    ) : (
      <LoadingScreen />
    );
  }
}

export default Home;

const style = StyleSheet.create({});
