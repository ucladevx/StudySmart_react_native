import React, { Component } from 'react';
import {
  SafeAreaView, StyleSheet, WebView, View, TouchableOpacity
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default class BookingWebView extends Component {
    static navigationOptions={
      header: () => {
        false;
      }
    }

    render() {
      return (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.leftButtonAbs} onPress={() => this.props.navigation.navigate('StudyRoomList')}>
            <Ionicon name="ios-arrow-back" color="#108BF8" size={35} />
          </TouchableOpacity>
          <View style={styles.bar} />
          <WebView
            source={{ uri: this.props.navigation.getParam('url', 'https://reslife.ucla.edu/reserve/') }}
          />
        </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
  bar: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

  },
  leftButtonAbs: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 20,
    top: '6%',
    zIndex: 5
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

});
