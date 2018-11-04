'use strict'
import React, {Component} from 'react';
import MainFeedRow from './MainFeedRow'
import {Text, View, ListView, TouchableOpacity, StyleSheet, FlatList} from 'react-native'


const Posts = [
    {courseName: "CS31", professor: "Smallberg", roomNumber: 3400},
    {courseName: "CS32",  professor: "Nachenberg", roomNumber: 289},
    {courseName: "CS33",  professor: "Eggert", roomNumber: 4000},  
    {courseName: "CS131", professor: "Smallberg", roomNumber: 3400},
    {courseName: "CS132",  professor: "Nachenberg", roomNumber: 289},
    {courseName: "CS133",  professor: "Eggert", roomNumber: 4000},
    {courseName: "EE 3",  professor: "Potkonjak", roomNumber: 4000},
    {courseName: "M51A",  professor: "Potkonjak", roomNumber: 4000},
    {courseName: "EE 3",  professor: "Potkonjak", roomNumber: 4000}
  ]
  
  export default class MainFeedList extends Component {
      constructor(props){
        super(props);
       this.data = Posts
      }
    render() {
      return (
          <FlatList
                  data={this.data}
                  renderItem={({item}) =>{return this._renderRow(item) }}
                  keyExtractor={(item, index) => index.toString()}
              />
      )
    }
    _renderRow(item) {
      return (
        <View style={styles.container2}>
          <View style={styles.container_text}>
              <Text style={styles.courseName}>
                  {item.courseName}
              </Text>
              <Text style={styles.professor}>
                  {item.professor}
              </Text>
          </View>
  
      </View>
      )
    }
  }

  
  const styles = StyleSheet.create({

    container2: {
      flex: 1,
      flexDirection: 'row',
      height: '20%',
      padding: 10,
      marginLeft:16,
      marginRight:16,
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 5,
      backgroundColor: '#FFF',
      elevation: 2,
  },
  courseName: {
      fontSize: 16,
      color: '#000',
  },
  container_text: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 12,
      justifyContent: 'center',
  },
  professor: {
      fontSize: 11,
      fontStyle: 'italic',
  },
});

module.exports = MainFeedList