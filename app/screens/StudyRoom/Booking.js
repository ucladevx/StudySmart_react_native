import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePickerVisible: false,
      timePickerVisible: false,
      date: 'Choose a date!',
      time: 'Choose a time!',
    };
    this.date = new Date();
    this.date.setDate(this.date.getDate() + 7);
    this.showDatePicker = this.showDatePicker.bind(this);
    this.showTimePicker = this.showTimePicker.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  showDatePicker() {
    this.setState({
      datePickerVisible: !this.state.datePickerVisible
    });
  }

  showTimePicker() {
    this.setState({
      timePickerVisible: !this.state.timePickerVisible
    });
  }


  handleConfirm(setting, thing) {
    if (thing === 'time') {
      var styledTime = setting.toLocaleTimeString();
      var last2ndChar = styledTime[ styledTime.length - 2];
      var lastChar = styledTime[ styledTime.length - 1];
      styledTime = styledTime.slice(0, -6);
      this.setState({
        time: styledTime + last2ndChar + lastChar,
        timePickerVisible: !this.state.timePickerVisible
      });
    } else {
      var chosen = setting;
      var dd = chosen.getDate();
      var mm = chosen.getMonth() + 1; //January is 0!
      var yyyy = chosen.getFullYear();  
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      chosen = mm + '/' + dd + '/' + yyyy;
      this.setState({
        date: chosen,
        datePickerVisible: !this.state.datePickerVisible
      });
    }
  }

  handleSearch() {
    this.props.navigation.navigate('StudyRoomTime', { date: this.state.date, time: this.state.time });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.promptText}>What day?</Text>
        <TouchableOpacity
          style={styles.studyRoom}
          onPress={this.showDatePicker}
        >
          <Text style={styles.titleText}>
            {this.state.date}
          </Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.datePickerVisible}
          onConfirm={date => this.handleConfirm(date, 'date')}
          onCancel={this.showDatePicker}
          maximumDate={this.date}
        />
        <Text style={styles.promptText}>What time?</Text>
        <TouchableOpacity
          style={styles.studyRoom}
          onPress={this.showTimePicker}
        >
          <Text style={styles.titleText}>
            {this.state.time}
          </Text>
        </TouchableOpacity>
        <DateTimePicker
          mode="time"
          isVisible={this.state.timePickerVisible}
          onConfirm={time => this.handleConfirm(time, 'time')}
          onCancel={this.showTimePicker}
          is24Hour={false}
          minuteInterval={30}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => this.handleSearch()}>
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
  searchText: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: '#4F87EC',
    width: '80%',
    padding: 5
  },
  titleText: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: 'white',
    width: '80%',
    padding: 5
  },

});
export default withNavigation(Booking);
