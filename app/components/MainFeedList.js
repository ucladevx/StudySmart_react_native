'use strict'
import React, {Component} from 'react';
import MainFeedRow from './MainFeedRow'
import {Text, View, ListView, TouchableOpacity, StyleSheet, FlatList} from 'react-native'


  
  export default class MainFeedList extends Component {
      constructor(props){
        super(props);
      }
    render() {
      return (
        <FlatList 
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={this.props.data}
              extraData= {this.props.data}
              renderItem={({item}) =>{return this._renderRow(item) }}
              keyExtractor={(item, index) => index.toString()}
        />
      )
    }
    _renderRow(item) {
      return (
        <View style={[styles.container2, styles.boxWithShadow]}>
          <View style={styles.container_text}>
          <View style={styles.container_row}>
              <Text style={[styles.big_text, styles.left_text]}>
                  {item.courseName}
              </Text>
              <Text style={[styles.big_text, styles.right_text]}>
                  {item.professor}
              </Text>
            </View>
            <View style={styles.container_row}>
              <Text style={[styles.small_text, styles.left_text]}>
                  Final
              </Text>
              <Text style={[styles.small_text, styles.right_text]}>
                  Winter 2018 
              </Text>
            </View>
            <View style={styles.container_row}>
              <Text style={styles.small_text}>
                  5/5
              </Text>
              <Text style={styles.small_text}>
                  120
              </Text>
            </View>
            <TouchableOpacity
             style={styles.rounded_button}>
                <Text>
                    Details
                </Text>
            </TouchableOpacity>
          </View>
      </View>
      )
    }

  }

  
  const styles = StyleSheet.create({

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

module.exports = MainFeedList