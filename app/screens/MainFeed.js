import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import MainFeedList from '../components/MainFeedList'
import MainTopBar from '../components/MainTopBar'
import GlobalSearchBar from '../components/GlobalSearchBar';
// sample information for the 'posts' 
const Posts = [
  {courseName: "CS31", professor: "Smallberg", roomNumber: 3400},
  {courseName: "CS32",  professor: "Nachenberg", roomNumber: 289},
  {courseName: "CS33",  professor: "Eggert", roomNumber: 4000},  
  {courseName: "CS131", professor: "Smallberg", roomNumber: 3400},
  {courseName: "CS132",  professor: "Nachenberg", roomNumber: 289},
  {courseName: "CS133",  professor: "Eggert", roomNumber: 4000},
  {courseName: "EE 3",  professor: "Potkonjak", roomNumber: 4000},
  {courseName: "M51A",  professor: "Potkonjak", roomNumber: 4000},
  {courseName: "EE 3",  professor: "Potkonjak", roomNumber: 4000}
]


export default class MainFeed extends Component {
  // customizes the header for the nav bar for the MainFeed 
  static navigationOptions = {
    header: <GlobalSearchBar/>,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),
    
  };
  constructor(props) {
    super(props)
    this.state = {
      Class : ' '
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ViewContainer>
       <MainTopBar/>
        <MainFeedList
        data={Posts}
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
  search: {
    width : '80%',
    marginTop: 10,
    

  }
  


});
