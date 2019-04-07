import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import { changeTime, changeDate } from '../../Actions/actions';


class Booking extends Component {
  constructor(props) {
    super(props);
    const { date, time } = this.props;
    this.state = {
      datePickerVisible: false,
      timePickerVisible: false,
      date: date !== '' ? date : 'Choose a date!',
      time: time !== '' ? time : 'Choose a time!',
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
        <Text style={styles.promptText}>What day?</Text>
        <TouchableOpacity
          style={styles.studyRoom}
          onPress={this.showDatePicker}
        >
          <Text style={styles.titleText}>
            {date}
          </Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={datePickerVisible}
          onConfirm={chosenDate => this.handleConfirm(chosenDate, 'date')}
          onCancel={this.showDatePicker}
          maximumDate={this.date}
          minimumDate={this.minDate}
        />
        <Text style={styles.promptText}>What time?</Text>
        <TouchableOpacity
          style={styles.studyRoom}
          onPress={this.showTimePicker}
        >
          <Text style={styles.titleText}>
            {time}
          </Text>
        </TouchableOpacity>
        <DateTimePicker
          mode="time"
          isVisible={timePickerVisible}
          onConfirm={chosenTime => this.handleConfirm(chosenTime, 'time')}
          onCancel={this.showTimePicker}
          is24Hour={true}
          minuteInterval={30}
          titleIOS="Pick a time"
        />
        <TouchableOpacity style={this.props.date.length === 0 ? styles.searchButtonDisabled: styles.searchButton} disabled={this.props.date.length === 0} onPress={() => this.handleSearch()}>
          <Text style={styles.searchText}> Search! </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const promptText = {
  height: 65,
  fontFamily: 'System',
  fontSize: 30,
  fontWeight: 'bold',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: 'black',
  marginTop: '12%',
  marginBottom: '5%',
};

const styles = StyleSheet.create({
  promptText,
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center'
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  studyRoom: {
    backgroundColor: '#4F87EC',
    height: 50,
    width: '65%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    flex: 0,
    borderWidth: 2,
    borderColor: '#4F87EC',
    width: '65%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  searchButtonDisabled: {
    flex: 0,
    borderWidth: 2,
    borderColor: '#4F87EC',
    width: '65%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    opacity: 0.3
  },
  searchText: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: '#4F87EC',
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
    color: 'white',
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

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
