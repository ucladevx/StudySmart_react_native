import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import Locations from './app/screens/Locations';
import configureStore from './store';
import LocationsDetailed from './app/screens/LocationsDetailed';
import LoginPage from './app/screens/LoginPage';
import LocationsList from './app/screens/LocationsList';
import LocationContainer from './app/screens/LocationContainer';
import Booking from './app/screens/StudyRoom/Booking';
import StudyRoomList from './app/screens/StudyRoom/StudyRoom';

const LocationStack = StackNavigator({
  Login: { screen: LoginPage },
  List: { screen: LocationsList },
  Detailed: { screen: LocationsDetailed },
  Map: { screen: Locations },
  Booking: { screen: Booking },
  StudyRoomList: { screen: StudyRoomList },
  LocationContainer: { screen: LocationContainer },

},
{
// For now, use this to toggle between List view and Map view. We will eventually add a toggle button
  initialRouteName: 'LocationContainer',
});

const store = configureStore();

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <LocationStack />
      </Provider>
    );
  }
}
