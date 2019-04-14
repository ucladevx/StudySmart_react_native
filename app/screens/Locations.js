import React, { Component } from 'react';
import { StyleSheet } from 'react-native';


import MapView, { Marker } from 'react-native-maps';


export default class Locations extends Component {
// NOTE: hardcoding the markers for now - still checking accuracy of locations
//    <Marker
//    coordinate={{latitude: 34.071613, longitude: -118.442181}}
//    title="Powell"
//    />
    constructor(props){
        super(props);
        
        this.state = {
            markers: []
        };
    }
    
    componentDidMount(){
        const markerList = [
                    {title: "Powell Library", latlng: {latitude: 34.071613, longitude: -118.442181}},
                    {title: "Arts Library", latlng: {latitude: 34.074456, longitude: -118.439205}},
                    {title: "Management Library (Eugene and Maxine Rosenfeld)", latlng: {latitude: 34.074281, longitude: -118.443350}},
                    {title: "Southern Regional Library Facility", latlng: {latitude: 34.071090, longitude: -118.454179}},
                    {title: "East Asian Library (Richard C. Rudolph)", latlng: {latitude:  34.074960, longitude: -118.441466}},
                    {title: "Science and Engineering Library", latlng: {latitude: 34.068986, longitude: -118.442659}},
                    {title: "Music Library", latlng: {latitude: 34.070693, longitude: -118.440154}},
                    {title: "Law Library (Hugh & Hazel Darling)", latlng: {latitude: 34.072646, longitude: -118.437929}},
                    {title: "Research Library (Charles E. Young)", latlng: {latitude: 34.074970, longitude: -118.441464}},
                    {title: "Biomedical Library (Louise M. Darling)", latlng: {latitude: 34.066654, longitude: -118.442417}}
                          ];
        this.setState({ markers: markerList })
    }
    
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
            }}>
            
            {this.state.markers.map(marker => (
                                               <Marker
                                               key={marker.title}
                                               coordinate={marker.latlng}
                                               title={marker.title}
                                               description={marker.description}
                                               />
                                               ))}
            
            
            </MapView>
    );
  }
}

module.exports = Locations;
