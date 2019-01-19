import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import ViewContainer from '../components/ViewContainer';

export default class Locations extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ViewContainer>
        <Text> HI </Text>
      </ViewContainer>
    );
  }
}

module.exports = Locations;
