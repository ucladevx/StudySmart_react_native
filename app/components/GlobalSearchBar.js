import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Autocomplete from 'react-native-autocomplete-input';

const classes = [
    {name: "CS31"}, {name: "CS32"}, {name: "CS33"}, {name: "Computer Science 31"}, {name: "Computer Science 32"}, {name: "CS111"},
    {name: "MATH61"}, {name: "MATH33"}, {name: "PHYSICS 1A"}, 
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
        this.refreshClassSearch = this.props.refreshClassSearch.bind(this)
      }
      
      setInputState(e){
        this.setState({ Class: e });
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
      handleClick(e) {
          this.props.refreshClassSearch(e)
          this.setState({
              searching:true
          })
          
      }
      render() {
          const classesData = this.handleSearchSuggestions(this.state.Class)
        return (
            <View style = {styles.bar}>
                <TouchableOpacity style={styles.buttonLeft}>
                <Icon color ="white"name="upload" size={25} backgroundColor="#4F87EC">
                </Icon>
                </TouchableOpacity>   
                <Autocomplete
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
        marginLeft: 10

    },
    buttonRight: {
        marginRight:10

    },
    bar: {
        height: 50, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4F87EC', 
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    autocompleteContainer: {
        flex: 1,
        zIndex: 5
      }


  })
export default withNavigation(GlobalSearchBar);