import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import { changeTime, changeDate } from '../../Actions/actions';

class BookingTime extends Component {
  static navigationOptions={
    header: () => {
      false;
    }
  }

  constructor(props) {
    super(props);
    const { date, time } = this.props;
    this.state = {
      datePickerVisible: false,
      timePickerVisible: false,
      date: date !== '' ? date : 'Today',
      time: time !== '' ? time : 'Now',
    };
    this.date = new Date();
    this.minDate = new Date();
    this.date.setDate(this.date.getDate() + 7);
    this.showDatePicker = this.showDatePicker.bind(this);
    this.showTimePicker = this.showTimePicker.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  showDatePicker() {
    const { datePickerVisible } = this.state;
    this.setState({
      datePickerVisible: !datePickerVisible
    });
  }

  showTimePicker() {
    const { timePickerVisible } = this.state;
    this.setState({
      timePickerVisible: !timePickerVisible
    });
  }


  handleConfirm(setting, thing) {
    const { datePickerVisible, timePickerVisible } = this.state;
    const { changeTime: changeTimeAction, changeDate: changeDateAction } = this.props;
    if (thing === 'time') {
      let styledTime = setting.toLocaleTimeString();
      const last2ndChar = styledTime[styledTime.length - 2];
      const lastChar = styledTime[styledTime.length - 1];
      styledTime = styledTime.slice(0, -6);
      this.setState({
        time: styledTime + last2ndChar + lastChar,
        timePickerVisible: !timePickerVisible
      });
      changeTimeAction(styledTime + last2ndChar + lastChar);
    } else {
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
      this.setState({
        date: chosen,
        datePickerVisible: !datePickerVisible
      });
      changeDateAction(chosen);
    }
  }

  handleSearch() {
    const { navigation } = this.props;
    navigation.navigate('StudyRoomList');
  }

  render() {
    const {
      date, time, datePickerVisible, timePickerVisible
    } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.leftButtonAbs} onPress={() => this.props.navigation.navigate('BookingLocation')}>
          <Ionicon name="ios-arrow-back" color="#108BF8" size={35} />
        </TouchableOpacity>
        <Text style={styles.promptText}>When do you want to study?</Text>
        <Text style={styles.largeText}>
          {' '}
          {date}
          {' '}
        </Text>
        <TouchableOpacity
          style={[styles.whiteButton, styles.boxWithShadow]}
          onPress={this.showDatePicker}
        >
          <Text style={styles.titleText}>
            Change
          </Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={datePickerVisible}
          onConfirm={chosenDate => this.handleConfirm(chosenDate, 'date')}
          onCancel={this.showDatePicker}
          maximumDate={this.date}
          minimumDate={this.minDate}
        />
        <Text style={styles.largeText}>
          {' '}
          {time}
          {' '}
        </Text>
        <TouchableOpacity
          style={[styles.whiteButton, styles.boxWithShadow]}
          onPress={this.showTimePicker}
        >
          <Text style={styles.titleText}>
            Change
          </Text>
        </TouchableOpacity>
        <DateTimePicker
          mode="time"
          isVisible={timePickerVisible}
          onConfirm={chosenTime => this.handleConfirm(chosenTime, 'time')}
          onCancel={this.showTimePicker}
          is24Hour
          minuteInterval={30}
          titleIOS="Pick a time"
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => this.handleSearch()}>
          <Text style={styles.searchText}> Search </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const promptText = {
  fontFamily: 'System',
  fontSize: 30,
  fontWeight: '200',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: '#108BF8',
  marginTop: '25%',
  marginBottom: '5%',
  width: '80%',
  textAlign: 'center',
};
const searchButton = {
  flex: 0,
  borderWidth: 2,
  borderColor: '#108BF8',
  backgroundColor: '#108BF8',
  width: '65%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  position: 'absolute',
  bottom: '10%',
};
const styles = StyleSheet.create({
  promptText,
  largeText: {
    ...promptText,
    marginTop: '15%',
    fontSize: 40,
  },
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  whiteButton: {
    backgroundColor: 'white',
    height: 50,
    width: '65%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftButtonAbs: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 20,
    top: '5%'
  },
  searchButton,
  searchText: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: 'white',
    width: '80%',
    padding: 5,
    textAlign: 'center'
  },
  titleText: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: '#108BF8',
    width: '80%',
    padding: 5,
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingTime);
