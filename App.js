

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import StatusBarBackground from './app/components/StatusBarBackground'
import ViewContainer from './app/components/ViewContainer'
import MainFeedList from './app/components/MainFeedList'

const Posts = [
  {courseName: "CS31", professor: "Smallberg", roomNumber: 3400},
  {courseName: "CS32",  professor: "Nachenberg", roomNumber: 289},
  {courseName: "CS33",  professor: "Eggert", roomNumber: 4000}
]

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
   
  }
  render() {
    return (
      <ViewContainer>
        <StatusBarBackground style={{backgroundColor: "mistyrose"}} />
        <MainFeedList
        items={Posts}
        />
      </ViewContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
