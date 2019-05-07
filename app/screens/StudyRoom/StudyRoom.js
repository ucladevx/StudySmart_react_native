import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  changeTime, changeDate, changeLocation, loadData
} from '../../Actions/actions';
import StudyRoomHeader from './StudyRoomHeader';
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
        if (location.includes('Anywhere') || location.includes(data[i].location)) {
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

  handleSelectRoom(item) {
    this.props.navigation.navigate('StudyRoomReserve', {
      rooms: item
    });
  }

  handleModal = () => {
    this.setState({
      visible: !this.state.visible
    });
  }

  renderRow(item) {
    const icon = require('../../../assets/studyTab.png');
    return (
      <TouchableOpacity
        onPress={() => this.handleSelectRoom(item)}
      >
        <View style={styles.cell}>
          <View
            style={styles.containerRow}
          >
            <View style={styles.imageIcon}>
              <Image source={icon} style={{ height: 50, width: 60 }} />
            </View>
            <View
              style={styles.containerCol}
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
                  <Entypo name="chevron-thin-right" size={25} color="#108BF8" />
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
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.rightButtonAbs} onPress={() => this.handleModal()}>
          <MaterialCommunityIcons name="filter-variant" color="#108BF8" size={35} />
        </TouchableOpacity>
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
          <StudyRoomModal handleModal={this.handleModal} />
        ) : null }
      </SafeAreaView>
    );
  }
}

const text = {
  fontFamily: 'System',
  fontSize: 12,
  fontWeight: '300',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: 'black',
  paddingBottom: 3,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  list: {
    backgroundColor: 'transparent',
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    height: 120,
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
  },
  containerCol: {
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
  imageIcon: {
    borderRadius: 5,
    height: 100,
    width: 100,
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
  name: { // name of location
    ...text,
    fontSize: 18,
    fontWeight: '300',
    color: 'black',
  },
  icon: {
    position: 'absolute',
    right: 5
  },
  rightButtonAbs: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 20,
    top: '6%',
    zIndex: 5,
  },
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
