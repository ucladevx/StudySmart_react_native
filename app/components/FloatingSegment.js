import React, { Component } from 'react';
// import { connect } from 'react-redux';
import {
  StyleSheet, Text, TouchableOpacity, SafeAreaView
} from 'react-native';

export default class FloatingSegment extends Component {
  select(category) {
    const { setCategory } = this.props;
    setCategory(category);
  }

  renderCategory(title) {
    const { selected } = this.props;
    return (
      <TouchableOpacity
        style={selected === title ? styles.categorySelected : styles.category}
        onPress={() => this.select(title)}
        key={title}
        disabled={title === 'Libraries' || title === 'Classrooms'}
      >
        <Text style={selected === title ? styles.titleTextSelected : styles.titleText}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { titles } = this.props;
    return (
      <SafeAreaView style={styles.segment}>
        {titles.map(title => (
          this.renderCategory(title)
        ))}
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
  width: '100%',
  textAlign: 'center',
  padding: 1
};
const category = {
  backgroundColor: 'white',
  borderRadius: 7,
  justifyContent: 'center',
  marginRight: 8,
  alignItems: 'center',
  minWidth: 60
};

const styles = StyleSheet.create({
  titleText,
  category,
  titleTextSelected: {
    ...titleText,
    color: 'white',

  },
  segment: {
    width: '100%',
    height: 25,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 5,
  },
  categorySelected: {
    ...category,
    backgroundColor: '#108BF8',
  }

});
