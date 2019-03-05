import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList, Linking
} from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import { changeTime, changeDate, changeLocation } from '../../Actions/actions';
import StudyRoomHeader from '../../components/StudyRoomHeader';
import StudyRoomModal from './StudyRoomModal';

const baseResLifeURL = 'https://www.orl.ucla.edu/reserve';

const availableRooms = [
  {
    location: 'Hedrick Study Rooms', room: 7, availableDurations: [1, 2, 3], type: 'The Hill'
  },
  {
    location: 'Rieber Music Rooms', room: 5, availableDurations: [1, 2, 3], type: 'The Hill'
  },
  {
    location: 'Rieber Study Rooms', room: 5, availableDurations: [1, 2, 3], type: 'hedrickstudy'
  },
  {
    location: 'De Neve Meeting Rooms', room: 5, availableDurations: [1, 2, 3], type: 'hedrickstudy'
  },
  {
    location: 'Sproul Music Rooms', room: 7, availableDurations: [1], type: 'hedrickstudy'
  },
  {
    location: 'Sproul Study Rooms', room: 7, availableDurations: [1], type: 'hedrickstudy'
  },
  {
    location: 'The Study at Hedrick', room: 2, availableDurations: [1, 2], type: 'The Hill'
  },
  {
    location: 'Powell', room: 6, availableDurations: [1, 2], type: 'Libraries Only'
  },
];


class StudyRoomList extends Component {
  static navigationOptions = {
    // headerTitle instead of title
    header: props => <StudyRoomHeader {...props} />,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handleReserve = this.handleReserve.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  handleSelectRoom() {
    Linking.openURL('http://calendar.library.ucla.edu/spaces?lid=4394&gid=7749').catch(err => console.error('An error occurred', err));
  }

  handleReserve(option) {
    this.handleModal();
    const { location } = this.props;
    if (option === 'Reserve') {
      const totalURL = `${baseResLifeURL}?type=${location}?duration=`;
    }
  }

  handleModal(item) {
    const { visible } = this.state;
    const { changeLocation: changeLocationAction } = this.props;
    this.setState({
      visible: !visible,
    });
    if (item != null) {
      changeLocationAction(item.type);
    }
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
                <Text style={[styles.name, styles.leftText]}>
                  {item.location}
                </Text>
              </View>
              <View style={styles.containerRow}>
                <Text style={[styles.text, styles.leftText]}>
                  Rooms Available:
                  {item.room}
                </Text>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => this.handleModal(item)}
                >
                  <Entypo name="chevron-thin-down" size={25} />
                </TouchableOpacity>
              </View>
              <View style={styles.containerRow}>
                <Text style={[styles.text, styles.leftText]}>
                  {''}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { visible } = this.state;
    const data = availableRooms;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          extraData={data}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
        { visible ? (
          <StudyRoomModal
            handleReserve={this.handleReserve}
            handleModal={this.handleModal}
          />
        ) : null }
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
  color: '#5e5b59',
  paddingBottom: 3,
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
  name: { // name of location
    ...text,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  icon: {
    marginLeft: '35%'
  }
});

const mapStateToProps = state => ({
  time: state.study.time,
  date: state.study.date,
  duration: state.study.duration,
  location: state.study.location,

});

const mapDispatchToProps = dispatch => ({
  changeTime: (time) => {
    dispatch(changeTime(time));
  },
  changeDate: (date) => {
    dispatch(changeDate(date));
  },
  changeLocation: (location) => {
    dispatch(changeLocation(location));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyRoomList);
