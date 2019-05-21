import React, { Component } from 'react';
import { View, StyleSheet, WebView } from 'react-native';

const FORM_ONE = 'form1';
const FORM_TWO = 'form2';

export default class Feedback extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentForm: FORM_ONE
    };
  }

  render() {
    return (
      <View style={[styles.viewContainer, this.props.style || {}]}>
        <WebView
          source={{ uri: 'https://forms.gle/RAfL6G1hXeDAubmw5' }}
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

