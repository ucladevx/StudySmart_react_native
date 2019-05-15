import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import LibraryCard from '../components/LibraryCard';

const unselectedMarker = require('../../assets/library.png');
const selectedMarker = require('../../assets/librarySelected.png');

export default class Locations extends Component {
  // NOTE: hardcoding the markers for now - still checking accuracy of locations
  // currentLibrary = name of current selected library
  // currentItem = dictionary that holds library data for currentLibrary
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      currentLibrary: 'NO-LIBRARY',
      currentItem: 'NO-ITEM'
    };
  }

  componentDidMount() {
    const markerList = [
      { title: 'Powell Library', latlng: { latitude: 34.071613, longitude: -118.442181 } },
      { title: 'Arts Library', latlng: { latitude: 34.074456, longitude: -118.439205 } },
      { title: 'Management Library (Eugene and Maxine Rosenfeld)', latlng: { latitude: 34.074281, longitude: -118.443350 } },
      { title: 'Southern Regional Library Facility', latlng: { latitude: 34.071090, longitude: -118.454179 } },
      { title: 'East Asian Library (Richard C. Rudolph)', latlng: { latitude: 34.074960, longitude: -118.441466 } },
      { title: 'Science and Engineering Library', latlng: { latitude: 34.068986, longitude: -118.442659 } },
      { title: 'Music Library', latlng: { latitude: 34.070693, longitude: -118.440154 } },
      { title: 'Law Library (Hugh & Hazel Darling)', latlng: { latitude: 34.072646, longitude: -118.437929 } },
      { title: 'Research Library (Charles E. Young)', latlng: { latitude: 34.074970, longitude: -118.441464 } },
      { title: 'Biomedical Library (Louise M. Darling)', latlng: { latitude: 34.066654, longitude: -118.442417 } }
    ];
    this.setState({ markers: markerList });
  }

  /* Sets currentLibrary to hold name of current selected marker */
  updateSelectedMarker(title) {
    const { libraryData } = this.props;
    const { currentLibrary } = this.state;
    if (title === currentLibrary) {
      this.setState({
        currentLibrary: 'NO-LIBRARY',
        currentItem: 'NO-ITEM'
      });
    } else {
      this.setState({
        currentLibrary: title,
        currentItem: libraryData.find(element => element.name.S === title)
      });
    }
  }

  render() {
    const { navigation } = this.props;
    const { currentLibrary, currentItem, markers } = this.state;

    const item = navigation.getParam('item', { name: { S: 'NO-ITEM' } });

    return (
      <View style={styles.mapContainer}>
        <MapView
          onPress={() => this.updateSelectedMarker('NO-LIBRARY')}
          style={styles.map}
          region={{
            latitude: 34.070801,
            longitude: -118.445052,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.001,
          }}
        >
          {/* stopPropagation() prevents updateSelectedMarker from being
          called twice (one for touching map and one for touching marker) */}
          {markers.map(marker => (
            <Marker
              key={marker.title}
              coordinate={marker.latlng}
              description={marker.description}
              image={currentLibrary === marker.title ? selectedMarker : unselectedMarker}
              onPress={(e) => { e.stopPropagation(); this.updateSelectedMarker(marker.title); }}
            />
          ))}
        </MapView>
        {currentLibrary === 'NO-LIBRARY' ? <View /> : <LibraryCard item={currentItem} />}
      </View>
    );
  }
}

/* mapContainer has a zIndex: -1 so that it renders behind header */
const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  mapContainer: {
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1
  },
});

module.exports = Locations;
