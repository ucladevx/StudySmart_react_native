import React, { Component } from 'react';
import {
  Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, Platform, ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import StudyRoomsContainer from './StudyRoomsContainer';
import TimeRangeCard from '../../components/TimeRangeCard';
import {
  changeTime, changeDate, changeLocation, loadHillData, loadLibraryData,
} from '../../Actions/actions';

const timeRanges = {
  '12:00-1:00am': [0, 1],
  '1:00-2:00am': [1, 2],
  '2:00-3:00am': [2, 3],
  '3:00-4:00am': [3, 4],
  '4:00-5:00am': [4, 5],
  '5:00-6:00am': [5, 6],
  '6:00-7:00am': [6, 7],
  '7:00-8:00am': [7, 8],
  '8:00-9:00am': [8, 9],
  '9:00-10:00am': [9, 10],
  '10:00-11:00am': [10, 11],
  '11:00-12:00pm': [11, 12],
  '12:00-1:00pm': [12, 13],
  '1:00-2:00pm': [13, 14],
  '2:00-3:00pm': [14, 15],
  '3:00-4:00pm': [15, 16],
  '4:00-5:00pm': [16, 17],
  '5:00-6:00pm': [17, 18],
  '6:00-7:00pm': [18, 19],
  '7:00-8:00pm': [19, 20],
  '8:00-9:00pm': [20, 21],
  '9:00-10:00pm': [21, 22],
  '10:00-11:00pm': [22, 23],
  '11:00-12:00am': [23, 0],
};

const timeRangesSecondary = {
  '12:00-1:00am': ['12:30-1:30am', '12:00-2:00am', '12:30-2:30am'],
  '1:00-2:00am': ['1:30-2:30am', '1:00-3:00am', '1:30-3:30am'],
  '2:00-3:00am': ['2:30-3:30am', '2:00-4:00am', '2:30-4:30am'],
  '3:00-4:00am': ['3:30-4:30am', '3:00-5:00am', '3:30-5:30am'],
  '4:00-5:00am': ['4:30-5:30am', '4:00-6:00am', '4:30-6:30am'],
  '5:00-6:00am': ['5:30-6:30am', '5:00-7:00am', '5:30-7:30am'],
  '6:00-7:00am': ['6:30-7:30am', '6:00-8:00am', '6:30-8:30am'],
  '7:00-8:00am': ['7:30-8:30am', '7:00-9:00am', '7:30-9:30am'],
  '8:00-9:00am': ['8:30-9:30am', '8:00-10:00am', '8:30-10:30am'],
  '9:00-10:00am': ['9:30-10:30am', '9:00-11:00am', '9:30-11:30am'],
  '10:00-11:00am': ['10:30-11:30am', '10:00-12:00pm', '10:30-12:30pm'],
  '11:00-12:00pm': ['11:30-12:30pm', '11:00-1:00pm', '11:30-1:30pm'],
  '12:00-1:00pm': ['12:30-1:30pm', '12:00-2:00pm', '12:30-2:30pm'],
  '1:00-2:00pm': ['1:30-2:30pm', '1:00-3:00pm', '1:30-3:30pm'],
  '2:00-3:00pm': ['2:30-3:30pm', '2:00-4:00pm', '2:30-4:30pm'],
  '3:00-4:00pm': ['3:30-4:30pm', '3:00-5:00pm', '3:30-5:30pm'],
  '4:00-5:00pm': ['4:30-5:30pm', '4:00-6:00pm', '4:30-6:30pm'],
  '5:00-6:00pm': ['5:30-6:30pm', '5:00-7:00pm', '5:30-7:30pm'],
  '6:00-7:00pm': ['6:30-7:30pm', '6:00-8:00pm', '6:30-8:30pm'],
  '7:00-8:00pm': ['7:30-8:30pm', '7:00-9:00pm', '7:30-9:30pm'],
  '8:00-9:00pm': ['8:30-9:30pm', '8:00-10:00pm', '8:30-10:30pm'],
  '9:00-10:00pm': ['9:30-10:30pm', '9:00-11:00pm', '9:30-11:30pm'],
  '10:00-11:00pm': ['10:30-11:30pm', '10:00-12:00am', '10:30-12:30am'],
  '11:00-12:00am': ['11:30-12:30am', '11:00-1:00am', '11:30-1:30am']
};

class StudyRoomsPreview extends Component {
  static navigationOptions = {
    header: () => { }
  }

  constructor() {
    super();
    this.state = {
      available: {},
      listOfRooms: [],
      loading: true,
    };
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
        hourString = hour.toString();
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
      this.getHourAvailabilities();
    } 
  }

  async getHourAvailabilities() {
    let appendedURL = '';
    const { date } = this.props;
    if (date.length > 0) {
      const month = date.substring(0, 2);
      const day = date.substring(3, 5);
      const year = date.substring(date.length - 4);
      appendedURL = `?date=${year}-${month}-${day}`;
    }
    const rangeDict = {};
    const listOfRooms = [];
    await fetch(`http://studysmartserver-env.bfmjpq3pm9.us-west-1.elasticbeanstalk.com/studyinfo${appendedURL}`)
      .then(response => response.json())
      .then((data) => {
        for (let i = 0; i < data.Items.length; i += 1) {
          const time = data.Items[i].time.split(' ')[0];
          if (time in rangeDict) {
            rangeDict[time].push(data.Items[i]);
          } else {
            rangeDict[time] = [data.Items[i]];
          }
          listOfRooms.push(data.Items[i]);
        }
        this.setState({
          available: rangeDict,
          listOfRooms,
          loading: false,
        });
      });
  }


  renderRow(item) {
    const { available } = this.state;
    const firstHour = available[item];
    const firstHalfHour = available[timeRangesSecondary[item][0]];
    const twoHour = available[timeRangesSecondary[item][1]];
    const twoHalfHour = available[timeRangesSecondary[item][2]];
    const first = firstHour !== undefined ? firstHour : [];
    const second = second !== undefined ? firstHalfHour : [];
    const third = twoHour !== undefined ? twoHour : [];
    const fourth = twoHalfHour !== undefined ? twoHalfHour : [];
    const total = first.concat(second, third, fourth);
    if (total.length > 0) {
      return (
        <TimeRangeCard
          title={item}
          available={total}
          hour={first.concat(third)}
          half={second.concat(fourth)}
        />
      );
    }
    return null;
  }

  render() {
    const titles = Object.keys(timeRanges);
    const { loading, listOfRooms } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {
          loading
            ?
            <ActivityIndicator style={styles.animation} size="large" color="#108BF8" />
            :
            (
              <FlatList
                data={titles}
                extraData={listOfRooms}
                renderItem={({ item }) => this.renderRow(item)}
                keyExtractor={(item, index) => index.toString()}
              />
            )
        }

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(StudyRoomsPreview);
