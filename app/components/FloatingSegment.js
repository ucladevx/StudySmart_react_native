import React, { Component } from 'react';
// import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, TouchableOpacity, SafeAreaView
} from 'react-native';

export default class FloatingSegment extends Component {
  select(duration) {
    const { setDuration } = this.props;
    setDuration(duration);
  }

  renderDuration(title) {
    const { selected } = this.props;
    return (
      <TouchableOpacity
        style={selected === title ? styles.durationSelected : styles.duration}
        onPress={() => this.select(title)}
      >
        <Text style={selected === title ? styles.titleTextSelected : styles.titleText}>
          {title}
        </Text>
        <View style={selected === title ? styles.line : styles.lineTransparent} />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.rightButtonAbs}>
        { this.renderDuration('1 hour') }
        { this.renderDuration('2 hours') }
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
const duration = {
  backgroundColor: 'white',
  borderRadius: 7,
  justifyContent: 'center',
  marginRight: 4,
  width: 60,
  alignItems: 'center'
};

const styles = StyleSheet.create({
  titleText,
  duration,
  titleTextSelected: {
    ...titleText,
    color: 'white',

  },
  rightButtonAbs: {
    width: '100%',
    height: 25,
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
  },

  durationSelected: {
    ...duration,
    backgroundColor: '#108BF8',
  }

});
