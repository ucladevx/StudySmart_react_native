import React, { Component } from 'react';
import { StyleSheet } from 'react-native';


import MapView, { Marker } from 'react-native-maps';

export default class Locations extends Component {
// NOTE: hardcoding the markers for now - still checking accuracy of locations
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
        <Marker coordinate={{ latitude: 34.071613, longitude: -118.442181 }} title="Powell" />
      </MapView>
    );
  }
}

module.exports = Locations;
