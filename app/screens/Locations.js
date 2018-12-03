import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity, createStackNavigator} from 'react-native';
import StatusBarBackground from '../components/StatusBarBackground'
import ViewContainer from '../components/ViewContainer'
import GlobalSearchBar from '../components/GlobalSearchBar';

import MapView, { ProviderPropType, Marker, AnimatedRegion } from 'react-native-maps';

export default class Locations extends Component {
  constructor(props) {
    super(props)
  }

  //NOTE: hardcoding the markers for now - still checking accuracy of locations

  render() {
    const { navigate } = this.props.navigation;
    return (
     
      <MapView
        style={{ flex: 1 }}
        region={{
        latitude: 34.070801,
        longitude: -118.445052,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.001,
      }}
      >

       <Marker coordinate={{latitude: 34.071613, longitude: -118.442181}} title="Powell"></Marker>
       
      </MapView>

    )
  }

}




















const styles = StyleSheet.create({
  container:{
    backgroundColor: '#e0e0e0',
  }
});

module.exports = Locations 