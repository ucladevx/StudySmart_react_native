'use strict'
import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import { withNavigation } from 'react-navigation';

  
 class TestsList extends Component {
      constructor(props){
        super(props);
        this.data = [this.props.data];
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
          <TouchableOpacity
          onPress={() => this.handleSelectTest(item)}
          >
        <View style={styles.container2}>
          <View style={styles.container_text}>
              <Text style={styles.class}>
                  {item.class}
              </Text>
              <Text style={styles.category}>
                  {item.professor}
              </Text>
              <Text style={styles.category}>
                  {item.term}
              </Text>
              <Text style={styles.category}>
                  {item.year}
              </Text>
              <Text style={styles.category}>
                  {item.test}
              </Text>
          </View>
      </View>
        </TouchableOpacity>
      )
    }
    handleSelectTest(item) {
     this.props.navigation.navigate('SelectedTest', {test: item})

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
      borderColor: 'black',
      borderWidth: 1,
      backgroundColor: '#FFF',
      elevation: 2,
  },
  class: {
      fontSize: 16,
      color: '#000',
  },
  container_text: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 12,
      justifyContent: 'center',
  },
  category: {
      fontSize: 11,
      fontStyle: 'italic',
  },
});

export default withNavigation(TestsList);