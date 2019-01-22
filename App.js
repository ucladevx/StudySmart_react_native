import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Locations from './app/screens/Locations';
import LocationsDetailed from './app/screens/LocationsDetailed';
import LoginPage from './app/screens/LoginPage';
import LocationsList from './app/screens/LocationsList';

const LocationStack = StackNavigator({
  Login: { screen: LoginPage },
  List: { screen: LocationsList },
  Detailed: { screen: LocationsDetailed },
  Map: { screen: Locations },


},
{
// For now, use this to toggle between List view and Map view. We will eventually add a toggle button
  // initialRouteName: "List"
  initialRouteName: 'Login',
});


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <LocationStack />
    );
  }
}
