import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity, createStackNavigator} from 'react-native';
import StatusBarBackground from '../components/StatusBarBackground'
import ViewContainer from '../components/ViewContainer'
import LocationsList from '../components/LocationsList'
import GlobalSearchBar from '../components/GlobalSearchBar';
import { StackNavigator } from 'react-navigation';


export default class LocationsDetailed extends Component {
  constructor(props) {
    super(props)
    // this.params = this.props.navigation.state.params;
  }
  render() {
    // const { navigate } = this.params.navigation;
    return (
      <ViewContainer style={styles.container}>
        <Text>test</Text>
      </ViewContainer>
    )
  }

}



const styles = StyleSheet.create({
  container:{
    backgroundColor: '#e0e0e0',
  }
});

module.exports = LocationsDetailed 