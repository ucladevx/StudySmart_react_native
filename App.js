import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  Image
} from 'react-native';
import { StackNavigator, createBottomTabNavigator } from 'react-navigation';
import LocationsMap from './app/screens/LocationsMap';
import configureStore from './store';
import LocationsList from './app/screens/LocationsList';
import LocationsContainer from './app/screens/LocationsContainer';
import BookingLocation from './app/screens/StudyRoom/BookingLocation';
import BookingTime from './app/screens/StudyRoom/BookingTime';
import StudyRoomList from './app/screens/StudyRoom/StudyRoom';
import StudyRoomReserve from './app/screens/StudyRoom/StudyRoomReserve';
import FeedbackContainer from './app/screens/Feedback/FeedbackContainer';
import BookingWebView from './app/screens/StudyRoom/BookingWebView';

const StudyRoomStack = StackNavigator({
  StudyRoomList: { screen: StudyRoomList },
  BookingLocation: { screen: BookingLocation },
  BookingTime: { screen: BookingTime },
  StudyRoomList: { screen: StudyRoomList },
  StudyRoomReserve: { screen: StudyRoomReserve },
  BookingWebView: { screen: BookingWebView },


},
{
// For now, use this to toggle between List view and Map view. We will eventually add a toggle button
  initialRouteName: 'BookingLocation',
});

const LocationsStack = StackNavigator({
  LocationsContainer: { screen: LocationsContainer },
  List: { screen: LocationsList },
  Map: { screen: LocationsMap },

  initialRouteName: 'LocationContainer',
});

const FeedbackStack = StackNavigator({
  Feedback: { screen: FeedbackContainer },
});

StudyRoomStack.navigationOptions = {
  tabBarIcon: ({ focused }) => {
    const image = focused
      ? require('./assets/studyTabSelected.png')
      : require('./assets/studyTab.png');
    return (
      <Image
        source={image}
      />
    );
  },
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#108BF8',
    inactiveTintColor: 'gray',
    showLabel: false
  }
};

LocationsStack.navigationOptions = {
  tabBarIcon: ({ focused }) => {
    const image = focused
      ? require('./assets/locationTabSelected.png')
      : require('./assets/locationTab.png');
    return (
      <Image
        source={image}
      />
    );
  },
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#108BF8',
    inactiveTintColor: 'gray',
    showLabel: false
  }
};

FeedbackStack.navigationOptions = {
  tabBarIcon: ({ focused }) => {
    const image = focused
      ? require('./assets/feedbackSelected.png')
      : require('./assets/feedback.png');
    return (
      <Image
        source={image}
      />
    );
  },
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#108BF8',
    inactiveTintColor: 'gray',
    showLabel: false
  }
};


const StudySmartTabNavigator = createBottomTabNavigator(
  {
    Study: StudyRoomStack,
    Locations: LocationsStack,
    Feedback: FeedbackStack
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
