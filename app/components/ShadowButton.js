import React, { Component } from 'react';
// import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';

export default class ShadowButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected
    };
  }

  select() {
    const { selected } = this.state;
    this.setState({
      selected: !selected
    });
    this.props.changeLoc(this.props.title, this.state.selected)
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
  height: 50,
  width: '65%',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 30,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
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
