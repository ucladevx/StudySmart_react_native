import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet
} from 'react-native';

const intervals = {
  '12:00AM-1:00AM': ['12:00', '12:30'],
  '1:00AM-2:00AM': ['1:00', '1:30'],
  '2:00AM-3:00AM': ['2:00', '2:30'],
  '3:00AM-4:00AM': ['3:00', '3:30'],
  '4:00AM-5:00AM': ['4:00', '4:30'],
  '5:00AM-6:00AM': ['5:00', '5:30'],
  '6:00AM-7:00AM': ['6:00', '6:30'],
  '7:00AM-8:00AM': ['7:00', '7:30'],
  '8:00AM-9:00AM': ['8:00', '8:30'],
  '9:00AM-10:00AM': ['9:00', '9:30'],
  '10:00AM-11:00AM': ['10:00', '10:30'],
  '11:00AM-12:00PM': ['11:00', '11:30'],
  '12:00PM-1:00PM': ['12:00', '12:30'],
  '1:00PM-2:00PM': ['1:00', '1:30'],
  '2:00PM-3:00PM': ['2:00', '2:30'],
  '3:00PM-4:00PM': ['3:00', '3:30'],
  '4:00PM-5:00PM': ['4:00', '4:30'],
  '5:00PM-6:00PM': ['5:00', '5:30'],
  '6:00PM-7:00PM': ['6:00', '6:30'],
  '7:00PM-8:00PM': ['7:00', '7:30'],
  '8:00PM-9:00PM': ['8:00', '8:30'],
  '9:00PM-10:00PM': ['9:00', '9:30'],
  '10:00PM-11:00PM': ['10:00', '10:30'],
  '11:00PM-12:00AM': ['11:00', '11:30'],
};

export default class TimeRangeCard extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: true
    };
  }

  handleExpandPress = () => {
    const { collapsed } = this.state;
    if (collapsed) {
      this.setState({ collapsed: false });
    } else {
      this.setState({ collapsed: true });
    }
  }

  handleSelectRoom = (range) => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  }

  showExpandedCell = (title) => {
    const { collapsed } = this.state;
    if (!collapsed) {
      return (
        <View style={styles.row}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>
              {' '}
              {intervals[title][0]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>
              {' '}
              {intervals[title][1]}
            </Text>
          </TouchableOpacity>
        </View>

      );
    }
    return null;
  }

  render() {
    const { title } = this.props;
    const { collapsed } = this.state;
    return (
      <TouchableOpacity
        onPress={() => this.handleSelectRoom(title)}
      >
        <View style={collapsed ? styles.cell : styles.expandedCell}>
          <Text style={[styles.text]}>
            {title}
          </Text>
          <Text style={styles.smallText}> 25 Rooms Available </Text>
          {this.showExpandedCell(title)}
        </View>
      </TouchableOpacity>
    );
  }
}

const text = {
  fontFamily: 'System',
  fontSize: 16,
  fontWeight: '300',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: 'black',
  paddingBottom: 3,
};

const cell = {
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: 60,
  width: '95%',
  padding: 10,
  marginTop: 4,
  marginBottom: 4,
  borderRadius: 5,
  alignSelf: 'center',
  backgroundColor: '#FFF',
  elevation: 2,
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowOffset: {
    width: 0.5,
    height: 0.5
  },
  shadowRadius: 1,
  shadowOpacity: 0.8,
};

const styles = StyleSheet.create({
  text,
  cell,
  expandedCell: {
    ...cell,
    height: 100,
  },

  smallText: {
    ...text,
    fontSize: 12,

  },

  row: {
    flexDirection: 'row',
  },

  button: {
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    minWidth: 60,
    marginLeft: 5,
    marginRight: 5,
  }

});
