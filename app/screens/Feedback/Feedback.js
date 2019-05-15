import React, { Component } from 'react';
import { View, StyleSheet, WebView } from 'react-native';


export default class Feedback extends Component {
  render() {
    return (
      <View style={[styles.viewContainer, this.props.style || {}]}>
        <WebView
          source={{ uri: 'https://forms.gle/FEVruhjkQUX8ZtwY8' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  }

});
