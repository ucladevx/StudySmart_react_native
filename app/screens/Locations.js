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
                    {title: "Powell", latlng: {latitude: 34.071613, longitude: -118.442181}},
                    {title: "Arts", latlng: {latitude: 34.074456, longitude: -118.439205}},
                    {title: "Rosenfeld Management", latlng: {latitude: 34.074281, longitude: -118.443350}},
                    {title: "Southern Regional", latlng: {latitude: 34.071090, longitude: -118.454179}},
                    {title: "Rudolph East Asian", latlng: {latitude:  34.074960, longitude: -118.441466}},
                    {title: "Science & Engineering", latlng: {latitude: 34.068986, longitude: -118.442659}},
                    {title: "Music", latlng: {latitude: 34.070693, longitude: -118.440154}},
                    {title: "Darling Law", latlng: {latitude: 34.072646, longitude: -118.437929}},
                    {title: "Young Research", latlng: {latitude: 34.074970, longitude: -118.441464}},
                    {title: "Darling Biomedical", latlng: {latitude: 34.066654, longitude: -118.442417}}
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
                                               image={require('./bbsmall.png')}
                                               title={marker.title}
                                               description={marker.description}
                                               />
                                               ))}
            
            
            </MapView>
    );
  }
}

module.exports = Locations;
