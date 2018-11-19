import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Autocomplete from 'react-native-autocomplete-input';

const classes = [
    {name: "CS31"}, {name: "CS32"}, {name: "CS33"}, {name: "Computer Science 31"}, {name: "Computer Science 32"}, {name: "CS111"},
    {name: "MATH61"}, {name: "MATH32B"}, {name: "PHYSICS 1A"}, 
]
  
class GlobalSearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Class: '',
            Result: []
        }
        this.setInputState = this.setInputState.bind(this);
        this.handleSearchSuggestions = this.handleSearchSuggestions.bind(this)

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

      render() {
          const classesData = this.handleSearchSuggestions(this.state.Class)
        return (
            <View style = {styles.bar}>
                <TouchableOpacity style={styles.buttonLeft}>
                <Icon color ="white"name="upload" size={25} backgroundColor="#4F87EC">
                </Icon>
                </TouchableOpacity>   
                <Autocomplete
                data = {classesData} // this should be an API call or huge list eventually 
                defaultValue={this.state.Class}
                onChangeText={(e) => this.setInputState(e)}
                containerStyle={{backgroundColor: 'white', marginTop: 20, }} 
                inputContainerStyle = {{width: 250 }}
                renderItem={item => (
                    <TouchableOpacity onPress={() => this.setState({Class: item})}>
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
        marginTop: 15,
        marginLeft:10

    },
    buttonRight: {
        marginTop: 15,
        marginRight:10

    },
    bar: {
        height: 80, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4F87EC', 
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }


  })
export default withNavigation(GlobalSearchBar);