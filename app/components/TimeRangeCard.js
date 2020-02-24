import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation';

const intervals = {
  '12:00-1:00am': ['12:00', '12:30'],
  '1:00-2:00am': ['1:00', '1:30'],
  '2:00-3:00am': ['2:00', '2:30'],
  '3:00-4:00am': ['3:00', '3:30'],
  '4:00-5:00am': ['4:00', '4:30'],
  '5:00-6:00am': ['5:00', '5:30'],
  '6:00-7:00am': ['6:00', '6:30'],
  '7:00-8:00am': ['7:00', '7:30'],
  '8:00-9:00am': ['8:00', '8:30'],
  '9:00-10:00am': ['9:00', '9:30'],
  '10:00-11:00am': ['10:00', '10:30'],
  '11:00am-12:00pm': ['11:00', '11:30'],
  '12:00-1:00pm': ['12:00', '12:30'],
  '1:00-2:00pm': ['1:00', '1:30'],
  '2:00-3:00pm': ['2:00', '2:30'],
  '3:00-4:00pm': ['3:00', '3:30'],
  '4:00-5:00pm': ['4:00', '4:30'],
  '5:00-6:00pm': ['5:00', '5:30'],
  '6:00-7:00pm': ['6:00', '6:30'],
  '7:00-8:00pm': ['7:00', '7:30'],
  '8:00-9:00pm': ['8:00', '8:30'],
  '9:00-10:00pm': ['9:00', '9:30'],
  '10:00-11:00pm': ['10:00', '10:30'],
  '11:00pm-midnight': ['11:00', '11:30'],
};

class TimeRangeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
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

  showExpandedClassroomsCell = (title) => {
    const { navigate } = this.props.navigation;
    const { hour, half, hourOffset, day } = this.props;
    const { collapsed } = this.state;
    if (!collapsed) {
      return (
        <View style={styles.row}>
          <TouchableOpacity
            disabled={hour.length === 0}
            style={hour.length > 0 ? styles.button : styles.buttonDisabled}
            onPress={() => navigate('ClassroomBuildingList', {
              rooms: hour,
              hourOffset,
              minuteOffset: 0,
              day
            })}
          >
            <Text style={styles.text}>
              {' '}
              {intervals[title][0]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={half.length === 0}
            style={half.length > 0 ? styles.button : styles.buttonDisabled}
            onPress={() => navigate('ClassroomBuildingList', {
              rooms: half,
              hourOffset,
              minuteOffset: 30,
              day
            })}
          >
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

  showExpandedCell = (title) => {
    const { navigate } = this.props.navigation;
    const { hour, half } = this.props;
    const { collapsed } = this.state;
    if (!collapsed) {
      return (
        <View style={styles.row}>
          <TouchableOpacity
            disabled={hour.length === 0}
            style={hour.length > 0 ? styles.button : styles.buttonDisabled}
            onPress={() => navigate('StudyRoomReserve', {
              rooms: hour.sort((a, b) => (a.details > b.details) ? 1 : -1)
            })}
          >
            <Text style={styles.text}>
              {' '}
              {intervals[title][0]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={half.length === 0}
            style={half.length > 0 ? styles.button : styles.buttonDisabled}
            onPress={() => navigate('StudyRoomReserve', {
              rooms: half.sort((a, b) => (a.details > b.details) ? 1 : -1)
            })}
          >
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
    const { title, available, forClassrooms } = this.props;
    const { collapsed } = this.state;
    return (
      <TouchableOpacity
        onPress={() => this.handleSelectRoom(title)}
      >
        <View style={collapsed ? styles.cell : styles.expandedCell}>
          <Text style={[styles.text]}>
            {title}
          </Text>
          <Text style={styles.smallText}>
            {' '}
            {`${available.length} Available`}
            {' '}
          </Text>
          {forClassrooms ? this.showExpandedClassroomsCell(title) : this.showExpandedCell(title)}
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

const button = {
  borderRadius: 7,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: 'black',
  borderWidth: 1,
  minWidth: 60,
  marginLeft: 5,
  marginRight: 5,
};

const styles = StyleSheet.create({
  text,
  cell,
  button,
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

  buttonDisabled: {
    ...button,
    opacity: 0.3
  }

});

export default withNavigation(TimeRangeCard)