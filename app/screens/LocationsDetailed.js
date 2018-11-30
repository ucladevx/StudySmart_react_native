import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, Image, Button, TouchableOpacity, View, Dimensions} from 'react-native';
import StatusBarBackground from '../components/StatusBarBackground'
import ViewContainer from '../components/ViewContainer'

const width = Dimensions.get('window').width

export default class LocationsDetailed extends Component {
  constructor(props) {
    super(props)
    this.params = this.props.navigation.state.params;
  }
  render() {
    
    // const { navigate } = this.params.navigation;
    const {item} = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.container}>
        <Image
          style={{width: width, height: width, resizeMode: 'contain', marginBottom:15}}
          source={{uri: item.Image_URI}}
        />
        <View style={styles.information}>
          <Text style={styles.Name}>{item.Name}</Text>

          {/* NEED TO CHANGE TO A PROGRESS BAR  */}
          <Text style={styles.Section_Header}>Activity Level: {item.Activity_Level}%</Text>
          
          <Text style={styles.Section_Header}>Hours:</Text>
          {/* Store hours in item like item.Monday, item.Tuesday, etc. */}
          <Text>Monday: 8 am to 8pm </Text>
          <Text>Tuesday: 8 am to 8pm </Text>
          <Text>Wednesday: 8 am to 8pm </Text>
          <Text>Thursday: 8 am to 8pm </Text>
          <Text>Friday: 8 am to 8pm </Text>
          <Text>Saturday: 8 am to 8pm </Text>
          <Text>Sunday: 8 am to 8pm </Text>
        </View>
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#e0e0e0',
  }, 
  information: {
   marginLeft: 10,
   marginRight: 10, 
  },
  Name: {
    fontSize: 30,
    color: '#000',
    textAlign: 'left',
  },
  Section_Header: {
    fontSize: 20,
    color: '#000',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
  },
  Activity_Level_TEMPORARY: {
    textAlign: 'center', 
    fontSize: 15,
    fontStyle: 'italic',
  }
});

module.exports = LocationsDetailed 