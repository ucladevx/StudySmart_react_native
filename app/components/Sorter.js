import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Dimensions, Modal} from 'react-native';
import MainTopBar from '../components/MainTopBar'
import ViewContainer from '../components/ViewContainer'
import GlobalSearchBar from '../components/GlobalSearchBar'; 
class Sorter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false 
        }
    }

    render() {

    }
}

const styles = StyleSheet.create({
    modalContainer: {
        height: 250,
        width: 200,
        backgroundColor:'gray',
        justifyContent: 'center'
    },
    container2: {
      flex: 1,
      flexDirection: 'row',
      height: 100,
      padding: 10,
      marginLeft:16,
      marginRight:16,
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 5,
      backgroundColor: '#FFF',
      elevation: 2,
      width: 185,
      height: 100
  },
  big_text: {
      fontSize: 16,
      color: '#000',
      marginLeft: 5,
      marginRight: 5
  },
  container_text: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 12,
      justifyContent: 'center',

  },
  container_row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  small_text: {
      fontSize: 11,
      fontStyle: 'italic',
      marginLeft: 5,
      marginRight: 5
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
},
rounded_button: {
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    marginLeft: 4,
    marginRight: 4, 
    width: 55,
    marginTop: 5,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  right_text: {
      textAlign : 'right',
      flex: 1
  },
  left_text: {
    textAlign : 'left',
    flex: 0
}
});
