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
  {courseName: "CS13",  professor: "Nachenberg", roomNumber: 289},
  {courseName: "CS133",  professor: "Eggert", roomNumber: 4000},
  {courseName: "EE 3",  professor: "Potkonjak", roomNumber: 4000},
  {courseName: "M51A",  professor: "Potkonjak", roomNumber: 4000},
  {courseName: "CS31",  professor: "Potkonjak", roomNumber: 4000},
  {courseName: "MATH33",  professor: "Potkonjak", roomNumber: 4000}
]
var searchedPosts = []; 

export default class MainFeed extends Component {
  // customizes the header for the nav bar for the MainFeed 
  static navigationOptions = {
    header: () => {
      visible: false
    } ,
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
    this.state =  {
      Class: ' '
    }
    this.refreshClassSearch = this.refreshClassSearch.bind(this);
  }
  componentDidMount() {
    this.props.navigation.setParams({ refreshClassSearch: this.refreshClassSearch });
  }
  refreshClassSearch(e){
    this.setState({
        Class: e
    });
  }
  processPosts(e) {
    var i;
   searchedPosts = []
   console.log(e)
    if (this.state.Class == ' ') {
      searchedPosts = Posts.slice();
    }
    var upperClass = this.state.Class.toUpperCase()
    for (i =0 ; i<Posts.length; i++) {
          if (Posts[i]['courseName'].toUpperCase() == upperClass){
            searchedPosts.push(Posts[i]);
          }
    }
    return searchedPosts
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ViewContainer>
        <GlobalSearchBar
        style = {styles.search}
      refreshClassSearch = {this.refreshClassSearch}/>
       <MainTopBar
       showOptionsForClass={this.processPosts(this.state.Class)}/>
        <MainFeedList
        data={this.processPosts(this.state.Class)}
        />
        <MainFeedList
         data={this.processPosts(this.state.Class)}
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
      flex: 1,
      position: 'absolute',
      top: 50,
      zIndex: 10
  }, 
  


});
