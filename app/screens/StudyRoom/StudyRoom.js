import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView, SectionList
} from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  changeTime, changeDate, changeLocation, loadHillData, loadLibraryData
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

const monthPairs = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

class StudyRoomList extends Component {
  static navigationOptions = {
    header: () => {
      false;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      hillData: [],
      libraryData: [],
    };
    this.getStudyRooms = this.getStudyRooms.bind(this);
  }

  componentDidMount() {
    this.getStudyRooms();
  }

  getStudyRooms() {
    this.getHillStudyRooms();
    //this.getLibraryStudyRooms();
  }

  async getHillStudyRooms() {
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
      const amPm = splitTime[1].substring(splitTime[1].length - 2);
      if (amPm === 'PM') {
        if (hourInt !== 12) {
          hourInt += 12;
        }
      }
      if (hourInt === 12 && amPm === 'AM') {
        hourInt = 0;
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
    for (let k = 0; k < temp.Items.length; k += 1) {
      temp.Items[k].area = 'Hill';
    }
    this.props.loadHillData(temp.Items);
    this.sortData();
  }

  async getLibraryStudyRooms() {
    let temp;
    const { date } = this.props;
    const month = date.substring(0, 2);
    const day = date.substring(3, 5);
    const year = date.substring(date.length - 4);
    const monthName = monthPairs[month];
    const appendedURL = `?date=${monthName} ${day} ${year}`;
    await fetch(`http://studysmart-env-2.dqiv29pdi2.us-east-1.elasticbeanstalk.com/librooms${appendedURL}`)
      .then(response => response.json())
      .then((data) => {
        temp = data;
      });
    for (let k = 0; k < temp.Items.length; k += 1) {
      temp.Items[k].area = 'Libraries';
    }
    this.props.loadLibraryData(temp.Items);
    this.sortData();
  }

  sortData = () => {
    const hillDict = {};
    const libDict = {};
    const hillArray = [];
    const libArray = [];
    const { location } = this.props;
    const { hillData, libraryData } = this.props;
    if (location.includes('Anywhere') || location.includes('Hill')) {
      for (let i = 0; i < hillData.length; i += 1) {
        if (hillData[i].name in hillDict) {
          hillDict[hillData[i].name].push(hillData[i]);
        } else {
          hillDict[hillData[i].name] = [hillData[i]];
        }
      }
      Object.keys(hillDict).forEach((key) => {
        hillArray.push({ location: key, available: hillDict[key], area: 'Hill' });
      });
    }
  /*  if (location.includes('Anywhere') || location.includes('Libraries')) {
      for (let i = 0; i < libraryData.length; i += 1) {
        if (libraryData[i].building in libDict) {
          libDict[libraryData[i].building].push(libraryData[i]);
        } else {
          libDict[libraryData[i].building] = [libraryData[i]];
        }
      }
      Object.keys(libDict).forEach((key) => {
        libArray.push({ location: key, available: libDict[key] });
      });
    } */
    this.setState({
      hillData: hillArray,
      //libraryData: libArray,
    });
  }

  handleSelectRoom = (item) => {
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
          <TouchableOpacity
            style={styles.icon}
            onPress={() => this.handleSelectRoom(item)}
          >
            <Entypo name="chevron-thin-right" size={25} color="#108BF8" />
          </TouchableOpacity>
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
                  {item.area === 'Hill' ? namePairs[item.location] : item.location}
                </Text>
              </View>
              <View style={styles.containerRow}>
                <Text style={[styles.text, styles.leftText]}>
                  Rooms Available:
                  {item.available.length}
                </Text>
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
    const {
      visible, hillData, libraryData
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StudyRoomHeader
          navigation={this.props.navigation}
          sortData={this.sortData}
          handleModal={this.handleModal}
        />
        <SectionList
          style={styles.list}
          renderItem={({ item }) => this.renderRow(item)}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
          )}
          sections={[
            { title: 'Hill', data: hillData },
            { title: 'Libraries', data: libraryData }]}
          keyExtractor={(item, index) => item + index}
        />
        {visible ? (
          <StudyRoomModal handleModal={this.handleModal} getStudyRooms={this.getStudyRooms} />
        ) : null}
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
  titleText,
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
    fontSize: 15,
    fontWeight: '300',
    color: 'black',
  },
  icon: {
    position: 'absolute',
    right: 5,
    top: '45%'
  },
  sectionHeader: {
    height: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});

const mapStateToProps = state => ({
  time: state.study.time,
  date: state.study.date,
  duration: state.study.duration,
  location: state.study.location,
  hillData: state.study.hillData,
  libraryData: state.study.libraryData,
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
  loadHillData: (hillData) => {
    dispatch(loadHillData(hillData));
  },
  loadLibraryData: (libraryData) => {
    dispatch(loadLibraryData(libraryData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyRoomList);
