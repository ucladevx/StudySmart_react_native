import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements'
import { withNavigation } from 'react-navigation';



class GlobalSearchBar extends Component {
    constructor(props) {
        super(props)
        this.setInputState = this.setInputState.bind(this);
      }
      
      setInputState(event){
        this.setState({ Class: event.target.value });
      } 

      render() {
        return (
            <View style = {{height: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0539C4', flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between'}}>
                <TouchableOpacity>
                    <Button
                    title = "Up"
                    color = "white"
                    /> 
                </TouchableOpacity>   
                <SearchBar 
                placeholder='Search                          '
                searchIcon={true}
                onChangeText={this.setInputState}
                inputStyle={{backgroundColor: 'white'}}
                containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 10,marginTop: 20,}} />
                <TouchableOpacity>
                <Button
                title = "Chat"
                color = "white"
                /> 
             </TouchableOpacity>   
             </View>

        )



      }




}

export default withNavigation(GlobalSearchBar);