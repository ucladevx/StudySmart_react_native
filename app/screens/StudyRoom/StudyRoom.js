import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { changeTime, changeDate } from '../../Actions/actions';
import StudyRoomHeader from '../../components/StudyRoomHeader';

const availableRooms = [
  { location: 'Hedrick', room: '110B', availableDurations: [1, 2, 3] },
  { location: 'Powell', room: '110B', availableDurations: [1, 2, 3] },
  { location: 'Powell', room: '210B', availableDurations: [1, 2, 3] },
  { location: 'Sproul', room: '110B', availableDurations: [1, 2, 3] },
  { location: 'YRL', room: '110B', availableDurations: [1, 2, 3] },
  { location: 'Sproul', room: '110B', availableDurations: [1] },
  { location: 'YRL', room: '110B', availableDurations: [1, 2] },
  { location: 'YRL', room: '110B', availableDurations: [1, 2, 3] },
  { location: 'Sproul', room: '110B', availableDurations: [1] },
  { location: 'YRL', room: '110B', availableDurations: [1, 2] },
];

class StudyRoomList extends Component {
  static navigationOptions = {
    // headerTitle instead of title
    header: props => <StudyRoomHeader {...props} />,
  };

  handleSelectRoom() {
    const i = 0;
  }

  renderRow(item) {
    return (
      <TouchableOpacity
        onPress={() => this.handleSelectRoom(item)}
      >
        <View style={styles.cell}>
          <View
            style={styles.containerRow}
          >
            <View style={styles.circleIcon}>
              <Text style={styles.circleText}>COOL</Text>
            </View>
            <View
              style={styles.containerText}
            >
              <View style={styles.containerRow}>
                <Text style={[styles.bigText, styles.leftText]}>
                  {item.location}
                </Text>
              </View>
              <View style={styles.containerRow}>
                <Text style={[styles.text, styles.leftText]}>
                  {item.room}
                </Text>
              </View>
              <View style={styles.containerRow}>
                <Text style={[styles.text, { marginLeft: 8 }]}>
                  {item.availableDurations}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const data = availableRooms;
    return (
      <View style={styles.container}>
        <FlatList
          ref={(ref) => { this._flatList = ref; }}
          data={data}
          extraData={data}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
      </View>
    );
  }
}

const text = {
  fontFamily: 'System',
  fontSize: 12,
  fontWeight: '500',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: '#4a4a4a'
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4F87EC',
    width: '100%',
  },
  list: {
    backgroundColor: 'transparent',
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    padding: 10,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  containerText: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15,
    justifyContent: 'center',
    width: '100%',
  },
  containerRow: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
    alignItems: 'center',
    width: '100%'
  },
  category: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  circleIcon: {
    borderRadius: 25,
    height: 50,
    width: 50,
    backgroundColor: 'green',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text,
  bigText: {
    ...text,
    height: 20,
    fontSize: 17,
    letterSpacing: 1.92,
    color: 'black',
  },
  leftText: {
    textAlign: 'left',
    flex: 0
  },
  circleText: {
    ...text,
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
});

const mapStateToProps = state => ({
  time: state.study.time,
  date: state.study.date
});

const mapDispatchToProps = dispatch => ({
  changeTime: (time) => {
    dispatch(changeTime(time));
  },
  changeDate: (date) => {
    dispatch(changeDate(date));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyRoomList);

