import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Dimensions} from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu'
import MainTopBar from '../components/MainTopBar'
import ViewContainer from '../components/ViewContainer'
import TestsList from '../components/TestsList'
import GlobalSearchBar from '../components/GlobalSearchBar'; 
import Search from '../components/Search'
//sample data for Dropdown Menu 
const classes = [
  {name: "CS31"}, {name: "CS32"}, {name: "CS33"}, {name: "Computer Science 31"}, {name: "Computer Science 32"}, {name: "CS111"},
  {name: "MATH61"}, {name: "MATH33"}, {name: "PHYSICS 1A"}, 
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
      Class: '232',
      Professor: '',
      Term: '',
      Year: '',
      Test: '', 
      singleTest: {class: 'CS33',
      professor: 'Eggert',
      term: 'Fall',
      year: '2018',
      test: 'Midterm 1',},
    };
    this.setInputState = this.setInputState.bind(this);
  
  }

  setInputState(event){
    this.setState({ Class: event.target.value });
  } 
  processPosts(e) {
    var i;
   searchedPosts = []
    if (this.state.Class == ' ') {
      searchedPosts = Posts.slice();
    }
    for (i =0 ; i<Posts.length; i++) {
          if (Posts[i]['courseName'] == e){
            searchedPosts.push(Posts[i]);
          }
    }
    return searchedPosts
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
            result.push(value)
        }
    }
    return result
  }
  render() {
    const classesData = this.handleSearchSuggestions(this.state.Class)
    const { navigate } = this.props.navigation;
    return (
      <ViewContainer>
          <Search
                style = {styles.autocompleteContainer}
                data = {classesData} // this should be an API call or huge list eventually 
                defaultValue={this.state.Class}
                onChangeText={(e) => this.setInputState(e)}
                inputContainerStyle = {{width: 250, height: 30, backgroundColor: 'white', borderRadius: 10}}
                hideResults = {this.state.searching}
                renderItem={item => (
                    <TouchableOpacity onPress={() => this.handleClick(item)}>
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
        <MainTopBar/>
          <View style={styles.menu}>
          {this.state.Class.length ?
          <DropdownMenu
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'blue'}
          handler={(selection, row) => this.handleSelection(selection,row)}
          data={data}
          maxHeight={150} >
        </DropdownMenu> : <Text> Search and select a class </Text>
        }
        </View>
        <View style={styles.list}>
        {(this.state.Test.length >0 && this.state.Class.length >0 && 
        this.state.Professor.length >0 && this.state.Term.length >0 &&
        this.state.Year.length >0) ? 
        <TestsList
        style = {styles.list}
        data = {this.state.singleTest}
        /> : <Text> Waiting for selections... </Text>
        }
        </View>
        
        <TouchableOpacity style = {{position: 'absolute', bottom:'5%', 
        justifyContent: 'center', alignItems:'center'}}>
               <Button
                   onPress = {() =>
                   this.handleFinish()
                    }
                  title = "Search"
                  color = "green"/>
              </TouchableOpacity>
      </ViewContainer>
    )
  }
  handleSelection(selection,row){
    const name = data[selection][0]
    val = ''
    if (row != 0) {
     val = data[selection][row]
    }
   
      if (name == "Class")
        this.setState({Class: val})
      if (name == "Professor")
        this.setState({Professor: val})
      if (name == "Term")
        this.setState({Term: val})
      if (name == "Year")
        this.setState({Year: val})
      if (name == "Test")
        this.setState({Test: val})
    

  }
  handleFinish() {
    if(this.state.Test.length >0 && this.state.Class.length >0 &&this.state.Professor.length >0&&this.state.Term.length >0&&this.state.Year.length >0){
      this.setState({singleTest: {
        class: this.state.Class,
        professor: this.state.Professor,
        term: this.state.Term,
        year: this.state.Year,
        test: this.state.Test
      }})
    } else {
      this.setState({text: "Not all fields completed."})
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: 30,
  },
  menu: {
    flex: 1,
    zIndex: 10,
    position: 'absolute',
    top: '20%',
    width: '100%',
    
  },
  list: {
    zIndex : 1,
    position: 'absolute',
    top: '35%',
    width: '100%',
   
  },
  searchContainer: { 
    marginTop: 8, 
    marginBottom: 8,
    justifyContent: 'center',
  }

});

module.exports = Tests