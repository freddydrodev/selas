import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import {
  View,
  Text,
  Content,
  Container,
  Header,
  Item,
  Icon,
  Input,
  Button
} from "native-base";
import EventCard from "../components/commons/EventCard";
import {
  bgColor,
  bgLight,
  BASE_SPACE,
  rnSetPadding,
  rnSetPosition,
  rnSquare,
  rnNoSpace,
  HEADER_BTN,
  textColor
} from "../tools";

const Btn = ({ press, name, type, btnStyle }) => (
  <Button
    transparent
    rounded
    style={{
      // backgroundColor: bgLight,
      elevation: 0,
      ...rnSquare(HEADER_BTN),
      ...rnSetPosition(),
      ...rnNoSpace,
      ...btnStyle
    }}
    onPress={press}
  >
    <Icon
      type={type}
      name={name}
      style={{
        color: textColor,
        fontSize: 24,
        ...rnNoSpace
      }}
    />
  </Button>
);

class Search extends Component {
  state = {
    filter: ""
  };
  static navigationOptions = {
    header: null
  };

  displayEvents = () => {
    const { filter } = this.state;
    return (
      this.props.events
        //filter base on the research
        .filter(ev =>
          RegExp(`${filter.toLowerCase()}`).test(ev.name.toLowerCase())
        )
        //show events card
        .map(ev => <EventCard key={ev.key} data={{ ...ev, id: ev.key }} />)
    );
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  render() {
    const {} = style;

    return (
      <Container>
        <Header
          searchBar
          rounded
          transparent
          style={{
            backgroundColor: bgColor,
            ...rnSetPadding(BASE_SPACE, "horizontal"),
            borderBottomWidth: 1,
            borderBottomColor: bgLight
          }}
        >
          <Btn
            type="Feather"
            name="arrow-left"
            press={() => this.props.navigation.pop()}
          />
          <Item>
            <Input
              placeholder="Search"
              autoFocus
              onChangeText={this.changeFilter}
            />
            <Icon name="ios-search" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content style={{ paddingHorizontal: 20 }}>
          {this.displayEvents()}
        </Content>
      </Container>
    );
  }
}

export default connect(({ events }) => ({ events }))(Search);

const style = StyleSheet.create({});
