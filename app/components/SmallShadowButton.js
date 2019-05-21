import React, { Component } from 'react';
// import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';

export default class SmallShadowButton extends Component {
  constructor(props) {
    super(props);
    const { selected } = this.props;
    this.state = {
      selected
    };
  }

  select() {
    const { selected } = this.state;
    const { changeThing, title } = this.props;
    this.setState({
      selected: !selected
    }, () => { changeThing(title, selected) });
  }

  render() {
    const { selected } = this.state;
    const { title } = this.props;
    return (
      <TouchableOpacity
        style={selected ? styles.whiteButtonSelected : styles.whiteButton}
        onPress={() => this.select()}
      >
        <Text style={selected ? styles.titleTextSelected : styles.titleText}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const whiteButton = {
  backgroundColor: 'white',
  height: 30,
  width: '45%',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10,
  marginBottom: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.5,
  shadowRadius: 1,
  elevation: 5,
};

const titleText = {
  fontFamily: 'System',
  fontSize: 18,
  fontWeight: '300',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: '#108BF8',
  width: '80%',
  padding: 5,
  textAlign: 'center'
};

const styles = StyleSheet.create({
  whiteButton,
  titleText,
  whiteButtonSelected: {
    ...whiteButton,
    backgroundColor: '#108BF8',
  },

  titleTextSelected: {
    ...titleText,
    color: 'white',

  },

});
