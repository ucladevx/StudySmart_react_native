import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Search from './Search'
import CameraScreen from './CameraScreen'
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
class GlobalSearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Class: '',
            Result: [],
            searching: false
        }
        this.setInputState = this.setInputState.bind(this);
        this.handleSearchSuggestions = this.handleSearchSuggestions.bind(this);
      }
      
      setInputState(e){
        this.setState({ Class: e });
        this.setState({
            searching: false
        })
      }
      handleSearchSuggestions(e) {
        const { Class } = this.state; 
        if (Class.length == 0) {
            return []
        }
        var index, value;
        var result = []; 
        for (index = 0; index < classes.length; ++index) {
        value = classes[index].name.toUpperCase();
        var currentClass = Class.toUpperCase();
        if (value.substring(0, Class.length) == currentClass) {
                result.push(classes[index])
            }
        }
        return result
      }
      handleClick(chosenClass) {
          this.props.navigation.navigate('Tests', {chosenClass: chosenClass})
          this.setState({
              Class: chosenClass
          })
          this.setState({
              searching:true
          })
          
      }
      handleUpload() {
          this.props.navigation.navigate('CameraScreen')
      }
      processPosts() {
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
          const classesData = this.handleSearchSuggestions(this.state.Class)
          const { navigate } = this.props.navigation;
        return (
            <View style = {styles.bar}>
                <TouchableOpacity style={styles.buttonLeft}
                onPress={() => this.handleUpload()}>
                <Icon color ="white"name="upload" size={25} backgroundColor="#4F87EC">
                </Icon>
                </TouchableOpacity>   
                <Search
                style={styles.autocompleteContainer}
                value={this.state.Class}
                data={classesData} // this should be an API call or huge list eventually 
                defaultValue={this.state.Class}
                onChangeText={(e) => this.setInputState(e)}
                inputContainerStyle={{width: 250, height: 30, backgroundColor: 'white', borderRadius: 10}}
                hideResults={this.state.searching}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => this.handleClick(item.name)}>
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity style={styles.buttonRight}>
                <Ionicon color="white" name="ios-chatbubbles" size={25} backgroundColor="#4F87EC">
                </Ionicon>
             </TouchableOpacity>   
             </View>

        )



      }
      

}

const styles = StyleSheet.create({
    buttonLeft: {
        marginLeft: 5

    },
    buttonRight: {
        marginRight: 5 

    },
    bar: {
        height: 70, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4F87EC', 
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        position: 'absolute',
        top: 20,
        width: '100%',
        zIndex: 20

    },
    autocompleteContainer: {
        flex: 1,
        zIndex: 5
      }


  })
export default withNavigation(GlobalSearchBar);