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
  
class LocationHeader extends Component {
    constructor(props) {
        super(props)

      }
      


      render() {
        //   const classesData = this.handleSearchSuggestions(this.state.Class)
        const {navigate} = this.props.navigation;
        const currentRouteKey = this.props.navigation.state.routes[this.props.navigation.state.index].routeName;

        if (currentRouteKey == "List"){
            right_icon = <Ionicon color="white" name="ios-map" size={25} backgroundColor="#4F87EC">
            </Ionicon>
            right_navigate = "Map"
        }
        else if (currentRouteKey == "Map"){
            right_icon = <Ionicon color="white" name="md-list" size={25} backgroundColor="#4F87EC">
            </Ionicon>
            right_navigate = "List"
        }

        return (
            <View style = {styles.bar}>
                <TouchableOpacity style={styles.buttonLeft} onPress ={() => {
                        navigate("List")
                    }}>
                {currentRouteKey == "Detailed" && 
                <Ionicon color ="white"name="ios-arrow-back" size={25} backgroundColor="#4F87EC">
                </Ionicon>
                }
                </TouchableOpacity>   
                {/* <Autocomplete
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
                /> */}
                <TouchableOpacity style={styles.buttonRight} onPress ={() => {
                        navigate(right_navigate)
                    }}>
                {right_icon}
                </TouchableOpacity>   
             </View>

        )



      }
      

}

const styles = StyleSheet.create({
    buttonLeft: {
        marginTop: 25,
        marginLeft:30

    },
    buttonRight: {
        marginTop: 25,
        marginRight:30

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
export default withNavigation(LocationHeader);