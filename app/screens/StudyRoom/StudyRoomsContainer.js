import React, { Component } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  changeTime, changeDate, changeLocation, loadHillData, loadLibraryData,
} from '../../Actions/actions';
import StudyRoomList from './StudyRoom';

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
  '01': 'Jan',
  '02': 'Feb',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'Aug',
  '09': 'Sept',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

class StudyRoomsContainer extends Component {
    static navigationOptions = {
      header: () => {}
    }

    constructor(props) {
      super(props);
      this.state = {
        hillData: [],
        librariesData: [],
        loading: true,
      };
      this.getStudyRooms = this.getStudyRooms.bind(this);
    }


    componentDidMount() {
      const setting = new Date();
      const { changeTime: changeTimeAction, changeDate: changeDateAction } = this.props;
      const minutes = setting.getMinutes();
      if (minutes !== 30 && minutes !== 0) {
        if (minutes > 30) {
          setting.setMinutes(60);
        } else {
          setting.setMinutes(30);
        }
      }
      let styledTime = setting.toLocaleTimeString();
      const last2ndChar = styledTime[styledTime.length - 2];
      const lastChar = styledTime[styledTime.length - 1];
      if (Platform.OS === 'ios') {
        styledTime = styledTime.slice(0, -6) + last2ndChar + lastChar;
      } else {
        styledTime = styledTime.slice(0, -3);
        let hour = parseInt(styledTime.substring(0, 2), 10);
        let hourString = hour.toString();
        if (hour > 12) {
          hour -= 12;
          styledTime = `${hourString + styledTime.slice(2)}PM`;
        } else {
          if (hourString === '0') {
            hourString = '12';
          }
          styledTime = `${hourString + styledTime.slice(2)}AM`;
        }
      }
      changeTimeAction(styledTime);
      let chosen = setting;
      let dd = chosen.getDate();
      let mm = chosen.getMonth() + 1; // January is 0!
      const yyyy = chosen.getFullYear();
      if (dd < 10) {
        dd = `0${dd}`;
      }
      if (mm < 10) {
        mm = `0${mm}`;
      }
      chosen = `${mm}/${dd}/${yyyy}`;
      changeDateAction(chosen);
    }

    componentDidUpdate(prevProps) {
      const { date } = this.props;
      // Typical usage (don't forget to compare props):
      if (date !== prevProps.date) {
        this.getStudyRooms();
      }
    }

    getStudyRooms() {
      this.getHillStudyRooms();
      // this.getLibraryStudyRooms();
    }

    async getHillStudyRooms() {
      let temp; let month; let day; let
        year;
      let appendedURL = '';
      const { date, time, loadHillData: loadHillDataAction } = this.props;
      if (date.length > 0) {
        month = date.substring(0, 2);
        day = date.substring(3, 5);
        year = date.substring(date.length - 4);
        if (time.length === 0) {
          appendedURL = `?date=${year}-${month}-${day}`;
        }
      }
      if (time.length > 0) {
        let time2 = time;
        if (!time2.includes(':')) {
          time2 = `${time2.slice(0, 2)}:${time2.slice(2)}`;
        }
        const splitTime = time2.split(':');
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
      loadHillDataAction(temp.Items);
      this.sortData();
    }

    async getLibraryStudyRooms() {
      let temp;
      const { date, loadLibraryData: loadLibraryDataAction } = this.props;
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
      loadLibraryDataAction(temp.Items);
      this.sortData();
    }

    sortData = () => {
      const hillDict = {};
      // const libDict = {};
      const hillArray = [];
      // const libArray = [];
      const { location } = this.props;
      const { hillData } = this.props;
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
        loading: false,
        // librariesData: libArray,
      });
    }

  filterData = (search) => {
    const { hillData } = this.props;
    const rooms = hillData.slice();
    const hillArray = [];
    const hillDict = {};
    const upperSearch = search.toUpperCase();
    for (let i = 0; i < rooms.length; i += 1) {
      const name = namePairs[rooms[i].name].toUpperCase();
      if (name.includes(upperSearch)) {
        if (rooms[i].name in hillDict) {
          hillDict[rooms[i].name].push(rooms[i]);
        } else {
          hillDict[rooms[i].name] = [rooms[i]];
        }
      }
    }
    Object.keys(hillDict).forEach((key) => {
      hillArray.push({ location: key, available: hillDict[key], area: 'Hill' });
    });
    this.setState({
      hillData: hillArray
    });
  }

  render() {
    const { hillData, librariesData, loading } = this.state;
    const { navigation } = this.props;
    return (
      <StudyRoomList
        hillDataFound={hillData}
        librariesDataFound={librariesData}
        filterData={this.filterData}
        getStudyRooms={this.getStudyRooms}
        navigation={navigation}
        loading={loading}
      />
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(StudyRoomsContainer);
