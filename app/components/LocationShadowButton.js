import React, { Component } from 'react';
// import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';

export default class LocationShadowButton extends Component {
  constructor(props) {
    super(props);
    const { selected } = this.props;
    this.state = {
      selected
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected
    });
  }

  select() {
    const { selected } = this.state;
    const { changeLoc, title } = this.props;
    this.setState({
      selected: !selected
    }, () => { changeLoc(title, selected); });
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
  height: '14%',
  width: '65%',
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.5,
  shadowRadius: 1,
  elevation: 5,
  marginTop: 10,
  marginBottom: 10
};

const titleText = {
  fontFamily: 'System',
  fontSize: 18,
  fontWeight: '300',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: '#108BF8',
  width: '90%',
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
