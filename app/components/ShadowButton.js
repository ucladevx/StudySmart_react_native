import React, { Component } from 'react';
// import { connect } from 'react-redux';
import {
  StyleSheet, Text, TouchableOpacity,
} from 'react-native';

export default class ShadowButton extends Component {
  constructor(props) {
    const { selected, buttonStyle, disabled } = props;
    super(props);
    this.state = {
      selected
    };
    this.buttonStyle = styles.whiteButton;
    this.selectedButtonStyle = styles.whiteButtonSelected;
    if (buttonStyle === 'Small') {
      this.buttonStyle = styles.whiteButtonSmall;
      this.selectedButtonStyle = styles.whiteButtonSmallSelected;
      if (disabled) {
        this.buttonStyle = styles.disabledButtonSmall;
      }
    }
    if (disabled && buttonStyle !== 'Small') {
      this.buttonStyle = styles.disabledButton;
    }
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
    }, () => { changeLoc(title, !selected) });
  }

  render() {
    const { selected } = this.state;
    const { title, disabled } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled}
        style={selected ? this.selectedButtonStyle : this.buttonStyle}
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

const whiteButtonSmall = {
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
  width: '90%',
  padding: 5,
  textAlign: 'center'
};

const styles = StyleSheet.create({
  titleText,
  whiteButton,
  whiteButtonSmall,
  whiteButtonSelected: {
    ...whiteButton,
    backgroundColor: '#108BF8',
  },
  whiteButtonSmallSelected: {
    ...whiteButtonSmall,
    backgroundColor: '#108BF8',
  },

  titleTextSelected: {
    ...titleText,
    color: 'white',

  },
  disabledButton: {
    ...whiteButton,
    opacity: 0.5
  },
  disabledButtonSmall: {
    ...whiteButtonSmall,
    opacity: 0.5
  }

});
