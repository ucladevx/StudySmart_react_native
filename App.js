import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import MainFeed from './app/screens/MainFeed'
import Tests from './app/screens/Tests'
import SelectedTest from './app/screens/SelectedTest'
import Notes from './app/screens/Notes'
import Locations from './app/screens/Locations'
import Profile from './app/screens/Profile'
import CameraScreen from './app/components/CameraScreen'
import { StackNavigator } from 'react-navigation';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Header from './app/components/Header'
import Guides from './app/screens/Guides'
import CreateClasses from './app/screens/CreateClasses'

// this is for MainFeed Stack Navigation 

const MainStack = StackNavigator({
  Main: {screen: MainFeed},
  CameraScreen: {screen: CameraScreen},
  CreateClasses: {screen: CreateClasses}
},{
  initialRouteName: 'Main'
  
});
MainStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
const TestsStack = StackNavigator({
  Tests: {screen: Tests},
  SelectedTest: {screen: SelectedTest},
},
  {
    initialRouteName: 'Tests'
  }
);
TestsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
const MainTabNavigator = createMaterialTopTabNavigator({
  Main: MainStack,
  Tests: TestsStack,
  Notes: { screen: Notes },
  Guides: { screen: Guides }
},
{
    tabBarComponent:  (props) => <Header {...props} />
},
);

//this is the tab bar navigator for the entire App 
const AppTabNavigator = createBottomTabNavigator({
  Main: MainTabNavigator,
  Locations: { screen: Locations },
  Profile: { screen: Profile },
},
{
    initialRouteName: 'Main',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
});


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
   
  }
  render() {
    return ( 
      <AppTabNavigator>  
            </AppTabNavigator>
    )
  }
}

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: '#1DB8F0',
  },
  
});
