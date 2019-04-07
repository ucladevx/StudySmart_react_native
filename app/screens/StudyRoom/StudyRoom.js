import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList, Linking
} from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  changeTime, changeDate, changeLocation, loadData
} from '../../Actions/actions';
import StudyRoomHeader from '../../components/StudyRoomHeader';
import StudyRoomModal from './StudyRoomModal';

const namePairs = {
  sproulstudy: 'Sproul Study Rooms',
  sproulmusic: 'Sproul Music Rooms',
  deneve: 'De Neve Meeting Rooms',
  rieber: 'Rieber Study Rooms',
  music: 'Rieber Music Rooms',
  hedrick: 'The Study at Hedrick',
  hedrickstudy: 'Hedrick Study Rooms',
  hedrickmusic: 'Hedrick Music Rooms',
  movement: 'Hedrick Movement Studio',
};

class StudyRoomList extends Component {
  static navigationOptions={
    header: () => {
      false;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      currentData: [],
      room: null,
    };
    this.handleReserve = this.handleReserve.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  async componentDidMount() {
    let temp; let month; let day; let
      year;
    let appendedURL = '';
    const { date, time } = this.props;
    if (date.length > 0) {
      month = date.substring(0, 2);
      day = date.substring(3, 5);
      year = date.substring(date.length - 4);
      if (time.length === 0) {
        appendedURL = `?date=${year}-${month}-${day}`;
      }
    }
    if (time.length > 0) {
      const splitTime = time.split(':');
      const yearInt = parseInt(year, 10);
      const monthInt = parseInt(month, 10);
      const dayInt = parseInt(day, 10);
      let hourInt = parseInt(splitTime[0], 10);
      const minuteInt = parseInt(splitTime[1].substring(0, 2), 10);
      if (splitTime[1].substring(splitTime[1].length - 2) === 'PM') {
        hourInt += 12;
      }
      const newDate = new Date(yearInt, monthInt - 1, dayInt, hourInt, minuteInt, 0, 0);
      const seconds = newDate.getTime() / 1000;
      appendedURL += `?time=${seconds}`;
    }
    /* Fetch library data from API, store inside this.library_data */
    await fetch(`http://studysmart-env-2.dqiv29pdi2.us-east-1.elasticbeanstalk.com/studyinfo${appendedURL}`)
      .then(response => response.json())
      .then((data) => {
        temp = data;
      });
    /* Once the request is done, save library data to current state */
    this.props.loadData(temp.Items);
    this.sortData();
  }

  sortData() {
    const locationDict = {};
    const array = [];
    const duration = this.props.duration.toString();
    const location = this.props.location;
    const { data } = this.props;
    for (let i = 0; i < data.length; i += 1) {
      if (duration === '0' || data[i].duration === duration) {
        if (location.length === 0 || data[i].location === location) {
          if (data[i].name in locationDict) {
            locationDict[data[i].name].push(data[i]);
          } else {
            locationDict[data[i].name] = [data[i]];
          }
        }
      }
    }
    Object.keys(locationDict).forEach((key) => {
      array.push({ location: key, available: locationDict[key] });
    });
    this.setState({
      currentData: array
    });
  }

  handleSelectRoom() {
    Linking.openURL('https://reslife.ucla.edu/reserve/');
  }

  handleReserve(room) {
    this.handleModal();
    if (room !== null) {
      Linking.openURL(room);
    }
  }

  handleModal(item) {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
      room: item,
    });
  }

  renderRow(item) {
    return (
      <TouchableOpacity
        onPress={() => this.handleModal(item)}
      >
        <View style={styles.cell}>
          <View
            style={styles.containerRow}
          >
            <View style={styles.circleIcon}>
              <Text style={styles.circleText}>UCLA</Text>
            </View>
            <View
              style={styles.containerText}
            >
              <View style={styles.containerRow}>
                <Text style={[styles.name, styles.leftText]}>
                  {namePairs[item.location]}
                </Text>
              </View>
              <View style={styles.containerRow}>
                <Text style={[styles.text, styles.leftText]}>
                  Rooms Available:
                  {item.available.length}
                </Text>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => this.handleSelectRoom(item)}
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
    const { visible, room } = this.state;
    return (
      <View style={styles.container}>
        <StudyRoomHeader
          navigation={this.props.navigation}
          sortData={this.sortData}
        />
        <FlatList
          data={this.state.currentData}
          extraData={this.state.currentData}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
        { visible ? (
          <StudyRoomModal
            handleReserve={this.handleReserve}
            handleModal={this.handleModal}
            rooms={this.state.room}
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
    width: '100%',
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
    fontSize: 14,
    textAlign: 'center'
  },
  name: { // name of location
    ...text,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  icon: {
    position: 'absolute',
    right: 20
  }
});

const mapStateToProps = state => ({
  time: state.study.time,
  date: state.study.date,
  duration: state.study.duration,
  location: state.study.location,
  data: state.study.data,
  unstyledTime: state.study.unstyledTime

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
  },
  loadData: (data) => {
    dispatch(loadData(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyRoomList);
