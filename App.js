import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  Image
} from 'react-native';
import { StackNavigator, createBottomTabNavigator } from 'react-navigation';
import Locations from './app/screens/Locations';
import configureStore from './store';
import LocationsDetailed from './app/screens/LocationsDetailed';
import LoginPage from './app/screens/LoginPage';
import LocationsList from './app/screens/LocationsList';
import BookingLocation from './app/screens/StudyRoom/BookingLocation';
import BookingTime from './app/screens/StudyRoom/BookingTime';
import StudyRoomList from './app/screens/StudyRoom/StudyRoom';
import StudyRoomReserve from './app/screens/StudyRoom/StudyRoomReserve';

const StudyRoomStack = StackNavigator({
  Login: { screen: LoginPage },
  BookingLocation: { screen: BookingLocation },
  BookingTime: { screen: BookingTime },
  StudyRoomList: { screen: StudyRoomList },
  StudyRoomReserve: { screen: StudyRoomReserve }


},
{
// For now, use this to toggle between List view and Map view. We will eventually add a toggle button
  initialRouteName: 'BookingLocation',
});

const LocationsStack = StackNavigator({
  List: { screen: LocationsList },
  Detailed: { screen: LocationsDetailed },
  Map: { screen: Locations },
});

const StudySmartTabNavigator = createBottomTabNavigator(
  {
    Study: StudyRoomStack,
    Locations: LocationsStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let icon = require('./assets/studyTab.png');
        if (routeName === 'Study') {
          icon = focused ? require('./assets/studyTabSelected.png') : require('./assets/studyTab.png');
        } else if (routeName === 'Locations') {
          icon = focused ? require('./assets/locationTabSelected.png') : require('./assets/locationTab.png');
        }
        // You can return any component that you like here!
        return <Image source={icon} style={{height: 25, width: 25}}/>;
      },
    }),
  },
);

const store = configureStore();

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <StudySmartTabNavigator />
      </Provider>

    );
  }
}
