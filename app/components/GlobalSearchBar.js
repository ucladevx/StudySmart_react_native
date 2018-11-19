import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';


  
class GlobalSearchBar extends Component {
    constructor(props) {
        super(props)
        this.setInputState = this.setInputState.bind(this);
      }
      
      setInputState(e){
        this.setState({ Class: e });
      } 

      render() {
        return (
            <View style = {styles.bar}>
                <TouchableOpacity style={styles.buttonLeft}>
                <Icon color ="white"name="upload" size={25} backgroundColor="#4F87EC">
                </Icon>
                </TouchableOpacity>   
                <SearchBar 
                placeholder='Search                                    '
                searchIcon={true}
                onChangeText={(e) => this.setInputState(e)}
                inputStyle={{backgroundColor: 'white'}}
                containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 10, marginTop: 20,}} />
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