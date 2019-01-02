'use strict'
import React, {Component} from 'react';
import MainFeedRow from './MainFeedRow'
import StarRating from 'react-native-star-rating';
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
              style= {{height: 120}}
        />
      )
    }
    _renderRow(item) {
      return (
        <View style={[styles.cell, styles.boxWithShadow]}>
          <View style={styles.container_text}>
          <View style={styles.container_row}>
              <Text
              numberOfLines={1}  
              style={[styles.big_text, styles.left_text]}>
                  {item.courseName} | {item.professor}
              </Text>
            </View>
            <View style={styles.container_row}>
              <Text style={[styles.text, styles.left_text]}>
                {item.test} | {item.term} {item.year}
              </Text>
            </View>
            <View style={styles.container_row}>
            <StarRating
            disabled={true}
            maxStars={5}
            starSize = {10}
            fullStarColor={'#417505'}
            rating={item.rating}
            />
            <Text style={[styles.text, {marginLeft: 8}]}>
            {item.ratingNum}
            </Text>
            </View>
            <View style = {styles.container_row}>
            <TouchableOpacity
             style={styles.rounded_button}>
                <Text style={styles.details_text}>
                Details
                </Text>
            </TouchableOpacity>
            </View>
          </View>
      </View>
      )
    }

  }

  const text = {
    fontFamily: "System",
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 1.92,
    color: "#4a4a4a",
  }
  
  const styles = StyleSheet.create({

    cell: {
      flex: 1,
      flexDirection: 'row',
      padding: 15,
      marginLeft:16,
      marginRight:16,
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 12,
      backgroundColor: '#FFF',
      elevation: 2,
      width: '48%',
      height: '92%'
  },
  text,
  big_text: {
    ...text,
    height: 20,
    width: 180,
    fontSize: 17,
    letterSpacing: 1.92,
    color: 'black',
  },
  details_text: {
    ...text, 
    fontSize: 10,
    letterSpacing: 1.52,
    color: 'white',
    
  },
  container_text: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 4,
      justifyContent: 'center',

  },
  right_text: {
    textAlign : 'right',
    flex: 1
},
left_text: {
  textAlign : 'left',
  flex: 0
},
  container_row: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
},
rounded_button: {
    borderRadius: 15,
    backgroundColor: "#4f87ec",
    width: '38%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center'
  },

});

module.exports = MainFeedList