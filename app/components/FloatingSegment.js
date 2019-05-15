import React, { Component } from 'react';
// import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, TouchableOpacity, SafeAreaView
} from 'react-native';

export default class FloatingSegment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '1 hour'
    };
  }

  select(duration) {
    this.setState({
      selected: duration
    });
    this.props.setDuration(duration);
  }

  render() {
    const { selected } = this.state;
    return (
      <SafeAreaView style={styles.rightButtonAbs}>
        <TouchableOpacity
          onPress={() => this.select('1 hour')}
        >
          <Text style={selected === '1 hour' ? styles.titleTextSelected : styles.titleText}>
            {'1 hour'}
          </Text>
          <View style={selected === '1 hour' ? styles.line : styles.lineTransparent} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.select('2 hours')}
        >
          <Text style={selected === '2 hours' ? styles.titleTextSelected : styles.titleText}>
            {'2 hours'}
          </Text>
          <View style={selected === '2 hours' ? styles.line : styles.lineTransparent} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const titleText = {
  fontFamily: 'System',
  fontSize: 12,
  fontWeight: '300',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: 'gray',
  width: '95%',
  textAlign: 'center',
  padding: 1
};

const styles = StyleSheet.create({
  titleText,

  titleTextSelected: {
    ...titleText,
    color: '#108BF8',

  },
  rightButtonAbs: {
    width: '100%',
    height: 20,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 5,
  },
  line: {
    height: 1,
    width: '95%',
    backgroundColor: '#108BF8'
  },
  lineTransparent: {
    height: 1,
    width: '95%',
    backgroundColor: 'transparent'
  }

});
