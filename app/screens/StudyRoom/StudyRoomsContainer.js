import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  changeTime, changeDate, changeLocation, loadHillData, loadLibraryData
} from '../../Actions/actions';
import StudyRoomList from './StudyRoom';

class StudyRoomsContainer extends Component {
    static navigationOptions = {
      header: () => {
        false;
      }
    }

    constructor(props) {
      super(props);
      this.state = {
        hillData: [],
        librariesData: [],
      };
      this.getStudyRooms = this.getStudyRooms.bind(this);
    }

    componentDidMount() {
      this.getStudyRooms();
    }

    getStudyRooms() {
      this.getHillStudyRooms();
      // this.getLibraryStudyRooms();
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
        // librariesData: libArray,
      });
    }

    render() {
      const { hillData, librariesData } = this.state;
      return (
        <StudyRoomList
          hillDataFound={hillData}
          librariesDataFound={librariesData}
          getStudyRooms={this.getStudyRooms}
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
