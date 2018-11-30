import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity, createStackNavigator} from 'react-native';
import StatusBarBackground from '../components/StatusBarBackground'
import ViewContainer from '../components/ViewContainer'
import GlobalSearchBar from '../components/GlobalSearchBar';


export default class Locations extends Component {
  constructor(props) {
    super(props)
   
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#e0e0e0',
  }
});

module.exports = Locations 