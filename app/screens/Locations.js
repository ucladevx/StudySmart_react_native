import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity, createStackNavigator} from 'react-native';
import StatusBarBackground from '../components/StatusBarBackground'
import ViewContainer from '../components/ViewContainer'
import LocationsList from '../components/LocationsList'
import GlobalSearchBar from '../components/GlobalSearchBar';

const Library_Data = [
  {Name: "Arts", Activity_Level: 4, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
  {Name: "Powell", Activity_Level: 95, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
  {Name: "Charles E Young Research", Activity_Level: 88, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
  {Name: "Science and Engineering (Boelter Location)", Activity_Level: 62, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
  {Name: "Law", Activity_Level: 12, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
]

const StudyRoom_Data = [
  {Name: "Rieber", Activity_Level: 4, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
  {Name: "Hedrick", Activity_Level: 95, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
  {Name: "Hedrick Study", Activity_Level: 88, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
  {Name: "Sproul", Activity_Level: 62, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
]

const InterestingLocations_Data = [
  {Name: "Boelter Roof", Activity_Level: 1, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
  {Name: "Botanical Gardens", Activity_Level: 7, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
]

let Locations_Data = {Libraries: Library_Data, StudyRooms: StudyRoom_Data, InterestingLocations: InterestingLocations_Data}

export default class Locations extends Component {
  constructor(props) {
    super(props)
   
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ViewContainer style={styles.container}>
        <LocationsList data={Locations_Data}/>
      </ViewContainer>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#e0e0e0',
  }
});

module.exports = Locations 