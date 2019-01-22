import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import Locations from './app/screens/Locations'
import LocationList from './app/screens/LocationsList'
import LocationsDetailed from './app/screens/LocationsDetailed'
import { StackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation';
import LocationsList from './app/screens/LocationsList';
import LocationHeader from './app/components/LocationHeader';


const LocationStack = StackNavigator({
  List: {screen: LocationsList},
  Detailed: {screen: LocationsDetailed},
  Map: {screen: Locations}


}, {
  //For now, use this to toggle between List view and Map view. We will eventually add a toggle button
  //initialRouteName: "List"
  initialRouteName: "List",
  navigationOptions: {
    header: props => <LocationHeader {...props} />,
    headerStyle: {
      backgroundColor: "transparent"
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "#fff",
    },
    headerTintColor: "#fff",
    animationEnabled: true
  }
})


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
   
  }
  render() {
    return ( 
      <LocationStack></LocationStack>
    )
  }
}
