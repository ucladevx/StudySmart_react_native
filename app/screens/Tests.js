import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Dimensions} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import TestsList from '../components/TestsList'
import GlobalSearchBar from '../components/GlobalSearchBar'
//sample data for Dropdown Menu 
const classes = [
  {name: "CS31"}, {name: "CS32"}, {name: "CS33"}, {name: "Computer Science 31"}, {name: "Computer Science 32"}, {name: "CS111"},
  {name: "MATH61"}, {name: "MATH33"}, {name: "PHYSICS 1A"}, 
]
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
var data = [["Professor","Smallberg", "Eggert"], ["Term","Fall", "Spring"], ["Year","2017", "2018"], ["Test", "Midterm 1", "Midterm 2", "Final"]];
export default class Tests extends Component {
  
  static navigationOptions = {
    header: () => {
     visible: false  
    },
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
      text: 'Nothing',
      Class: ' ',
    };
  }

  processPosts(e) {
    var i;
    var testsResources = [];
    for (i =0; i<e.length; i++) {
          if ( e[i].type == 'Tests' ){
            testsResources.push(e[i]);
          }
    }
    return testsResources;
  }
  render() {
    const classes = this.props.navigation.getParam('results', ' ')
    return (
        <ViewContainer >
        {classes == ' ' ? <Text style= {{top: '24%', zIndex: 10, position: 'absolute', width:'100%'}}> Search for classes! </Text> :
         <TestsList
         data={this.processPosts(classes)}
         />
        }
        </ViewContainer>
       
    )
  }

}

module.exports = Tests