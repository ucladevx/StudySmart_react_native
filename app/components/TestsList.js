'use strict'
import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import { withNavigation } from 'react-navigation';
import StarRating from 'react-native-star-rating';
  
 class TestsList extends Component {
      constructor(props){
        super(props);
      }
    render() {
      return (
          <FlatList
                  ref={(ref) => { this._flatList = ref; }}
                  data={this.props.data}
                  extraData= {this.props.data}
                  renderItem={({item}) =>{return this._renderRow(item) }}
                  keyExtractor={(item, index) => index.toString()}
                  style ={styles.list}
              />
      )
             
    }

    _renderRow(item) {
      return (
          <TouchableOpacity
          onPress={() => this.handleSelectTest(item)}
          >
        <View style={styles.cell}>
        <View
        style={styles.container_row}>
        <View style={styles.circleIcon}>
        <Text style = {styles.circle_text}>{item.courseName.charAt(0)}</Text>
        </View>
        <View
        style={styles.container_text}>
        <View style={styles.container_row}>
              <Text style={[styles.big_text, styles.left_text]}>
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
        </View>
        </View>
      </View>
        </TouchableOpacity>
      )
    }
    handleSelectTest(item) {
     this.props.navigation.navigate('SelectedTest', {test: item, setSelected: this.props.setSelected})

    }
  }

  
  const text = {
    fontFamily: "System",
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 1.92,
    color: "#4a4a4a"
  }
  const styles = StyleSheet.create({
    list: {
    position: 'absolute',
    zIndex: 1,
    top: '22%',
    flex: 1,
    bottom: 0,
    backgroundColor: 'transparent'
    },
    cell: {
      flex: 1,
      flexDirection: 'row',
      height: 100,
      padding: 10,
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 5,
      backgroundColor: '#FFF',
      elevation: 2,
  },
  container_text: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 15,
      justifyContent: 'center',
      width: '100%',
      backgroundColor: 'green'
  },
  container_row: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
    alignItems: 'center',
    width: '100%'
  },
  category: {
      fontSize: 11,
      fontStyle: 'italic',
  },
  circleIcon: {
      borderRadius: 25,
      height: 50,
      width: 50,
      backgroundColor: 'green',
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center'
  },
  text,
  big_text: {
    ...text,
    height: 20,
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
circle_text: {
    ...text,
    color: 'white',
    fontSize: 20,
    textAlign : 'center'
  },
});

export default withNavigation(TestsList);