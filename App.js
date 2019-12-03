/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  Image
} from 'react-native';
import { StackNavigator, createBottomTabNavigator } from 'react-navigation';
import LocationsMap from './app/screens/Locations/LocationsMap';
import configureStore from './store';
import LocationsList from './app/screens/Locations/LocationsList';
import LocationsContainer from './app/screens/Locations/LocationsContainer';
import StudyRoomsContainer from './app/screens/StudyRoom/StudyRoomsContainer';
import StudyRoomReserve from './app/screens/StudyRoom/StudyRoomReserve';
import LibraryRoomReserve from './app/screens/StudyRoom/LibraryRoomReserve';
import FeedbackContainer from './app/screens/Feedback/FeedbackContainer';
import BookingWebView from './app/screens/StudyRoom/BookingWebView';
import ClassroomView from './app/screens/StudyRoom/ClassroomView';
import ClassroomBuildingView from './app/screens/StudyRoom/ClassroomBuildingView';
import ClassroomAvailabilityView from './app/screens/StudyRoom/ClassroomAvailabilityView';

const locationsTabSelected = require('./assets/locationsTabSelected.png');
const locationsTab = require('./assets/locationsTab.png');
const studyTabSelected = require('./assets/studyTabSelected.png');
const studyTab = require('./assets/studyTab.png');
const feedbackTabSelected = require('./assets/feedbackTabSelected.png');
const feedbackTab = require('./assets/feedbackTab.png');

const StudyRoomStack = StackNavigator({
  StudyRoomsContainer: { screen: StudyRoomsContainer },
  StudyRoomReserve: { screen: StudyRoomReserve },
  LibraryRoomReserve: { screen: LibraryRoomReserve },
  ClassroomBuildingView: { screen: ClassroomBuildingView },
  ClassroomView: { screen: ClassroomView },
  BookingWebView: { screen: BookingWebView },
  ClassroomAvailabilityView: { screen: ClassroomAvailabilityView },

},
{
  initialRouteName: 'StudyRoomsContainer',
});

const LocationsStack = StackNavigator({
  LocationsContainer: { screen: LocationsContainer },
  List: { screen: LocationsList },
  Map: { screen: LocationsMap },

  initialRouteName: 'LocationContainer',
});

const FeedbackStack = StackNavigator({
  Feedback: {
    screen: FeedbackContainer,
    navigationOptions: {
      headerStyle: { height: 0 }
    }
  },
});

StudyRoomStack.navigationOptions = {
  tabBarIcon: ({ focused }) => {
    const image = focused
      ? studyTabSelected
      : studyTab;
    return (
      <Image
        source={image}
        style={{ width: 25, height: 25 }}
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
      ? locationsTabSelected
      : locationsTab;
    return (
      <Image
        source={image}
        style={{ width: 25, height: 25 }}
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
  header: null,
  tabBarIcon: ({ focused }) => {
    const image = focused
      ? feedbackTabSelected
      : feedbackTab;
    return (
      <Image
        source={image}
        style={{ width: 25, height: 25 }}
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
