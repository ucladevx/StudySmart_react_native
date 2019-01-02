import React, {Component} from 'react';
import ViewContainer from '../components/ViewContainer'
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import MainTopBar from '../components/MainTopBar'
import GlobalSearchBar from '../components/GlobalSearchBar';
import MainFeedSegment from './MainFeedSegment'
import Notes from './Notes'
import Tests from './Tests'
import AntIcon from 'react-native-vector-icons/AntDesign';
// sample information for the 'posts' 
const Posts = [
  {courseName: "CS31", professor: "Smallberg", test: "Midterm 1", term:"Winter",year: 2018, rating: 4, ratingNum: 10},
  {courseName: "CS32",  professor: "Nachenberg", test: "Midterm 1", term: "Fall", year: 2015, rating: 3.5, ratingNum: 10},
  {courseName: "CS33",  professor: "Eggert", test: "Midterm 1", term: "Fall", year: 2016, rating: 3.5, ratingNum: 10},  
  {courseName: "CS131", professor: "Smallberg", test: "Midterm 1", term: "Winter", year: 2015, rating: 3.5, ratingNum: 4310},
  {courseName: "CS13",  professor: "Nachenberg", test: "Final", term: "Fall", year: 2018, rating: 5, ratingNum: 10},
  {courseName: "CS133",  professor: "Eggert", test: "Midterm 2", term: "Fall", year: 2018, rating: 3.5, ratingNum: 1000},
  {courseName: "EE 3",  professor: "Potkonjak", test: "Midterm 1", term: "Fall", year: 2015,rating: 2.0, ratingNum: 10},
  {courseName: "M51A",  professor: "Potkonjak", term: "Fall", term: "Fall", year: 2018, rating: 3.5, ratingNum: 210},
  {courseName: "CS31",  professor: "Potkonjak", test: "Midterm 1", term: "Spring", year: 2018, rating: 1, ratingNum: 10},
  {courseName: "MATH33",  professor: "Potkonjak", test: "Midterm 1", term: "Spring", year: 2018, rating: 1, ratingNum: 10}
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
      Class: ' ',
      categorySelected: 'Main',
      foundPosts: [],
    }
    this.refreshClassSearch = this.refreshClassSearch.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.processPosts = this.processPosts.bind(this);
  }
  handleScroll(e){
    this.setState({ scrollPosition: e });
  }
  refreshClassSearch(e){
    this.setState({
        Class: e
    });
  }
  loadMain(e) {
    var i;
   searchedPosts = []
    if (this.state.Class == ' ') {
      searchedPosts = Posts.slice();
    }
    var upperClass = this.state.Class.toUpperCase()
    for (i =0 ; i<Posts.length; i++) {
          if (Posts[i]['courseName'] == upperClass){
            searchedPosts.push(Posts[i]);
          }
    }
    return searchedPosts
  }
  handleSelectCategory(item){
    this.setState({
      categorySelected: item
    })
  }
  processPosts(e) {
    var i;
   searchedPosts = []
   console.log(e)
    if (this.state.Class == ' ') {
      this.setState({
        foundPosts: e.slice()
      }) 
    }
    var upperClass = this.state.Class.toUpperCase()
    for (i =0 ; i<e.length; i++) {
          if (e[i]['courseName'].toUpperCase() == upperClass){
            searchedPosts.push(e[i]);
          }
    }
    this.setState({
      foundPosts: searchedPosts
    })
  }
  render() {
    const { navigate } = this.props.navigation;
    let loadMain = this.loadMain(this.state.Class)
    return (
      <ViewContainer>
        <View
        style = {styles.list}>
        <MainFeedSegment loadMain={loadMain}/>
        <View style = {styles.plus}>
        <TouchableOpacity
        style={styles.boxWithShadow}
        onPress = { () => console.log('hey')}>
        <AntIcon color = '#4F87EC' name="pluscircle" size={50}/>
        </TouchableOpacity>
        </View>
        </View>
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
  list: {
    position: 'absolute',
    zIndex: 1,
    top: '20%',
    flex: 1,
    bottom:0
  },
  title_text: {
    fontFamily: "System",
    fontSize: 24,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 1.52,
    color: "#4a4a4a",
    marginLeft: 16,
    marginTop: 16,
  }, 
  plus: {
    position: 'absolute',
    zIndex: 20,
    bottom: 10,
    width : '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,  
    elevation: 5,
},
createClass: {
  position: 'absolute',
  zIndex: 10,
  width : '100%',
  height: 60,
  top: '25%',
  backgroundColor: 'white',
  flexDirection: 'row',
},
button : {
marginTop: 15,
 marginLeft: 40
}
});
