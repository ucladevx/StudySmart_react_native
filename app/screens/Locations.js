import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity, createStackNavigator} from 'react-native';
import StatusBarBackground from '../components/StatusBarBackground'
import ViewContainer from '../components/ViewContainer'
import GlobalSearchBar from '../components/GlobalSearchBar';

import MapView, { ProviderPropType, Marker, AnimatedRegion } from 'react-native-maps';

//just going to put the data here for now. Eventually we'll have it in one array that we can access
//for both views

export default class Locations extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
       <MapView
         style={{ flex: 1 }}
         region={{
         latitude: 34.068921,
         longitude: -118.445181,
         latitudeDelta: 0.0322,
         longitudeDelta: 0.001,
       }}
     />
    )
  }

}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#e0e0e0',
  }
});

module.exports = Locations 