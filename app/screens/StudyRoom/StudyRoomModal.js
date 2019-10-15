import React, { Component } from 'react';
import {
  Platform,
  Text, View, TouchableOpacity, StyleSheet, Modal
} from 'react-native';

import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  changeTime, changeDate,
} from '../../Actions/actions';

class StudyRoomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePickerVisible: false,
      timePickerVisible: false,
    };
    this.date = new Date();
    this.minDate = new Date();
    this.date.setDate(this.date.getDate() + 6);
  }

  showDatePicker = () => {
    const { datePickerVisible } = this.state;
    this.setState({
      datePickerVisible: !datePickerVisible
    });
  }

  showTimePicker = () => {
    const { timePickerVisible } = this.state;
    this.setState({
      timePickerVisible: !timePickerVisible
    });
  }

  changeSearch = () => {
    const { handleModal, getStudyRooms } = this.props;
    handleModal();
    getStudyRooms();
  }

  handleConfirm = (setting, thing) => {
    const { datePickerVisible, timePickerVisible } = this.state;
    const { changeTime: changeTimeAction, changeDate: changeDateAction } = this.props;
    const minutes = setting.getMinutes();
    if (minutes !== 30 && minutes !== 0) {
      if (minutes > 30) {
        setting.setMinutes(60);
        if (setting.getHours() === 0) {
          setting.setDate(setting.getDate() + 1);
        }
      } else {
        setting.setMinutes(30);
      }
    }
    if (thing === 'time') {
      let styledTime = setting.toLocaleTimeString();
      const last2ndChar = styledTime[styledTime.length - 2];
      const lastChar = styledTime[styledTime.length - 1];
      if (Platform.OS === 'ios') {
        styledTime = styledTime.slice(0, -6) + last2ndChar + lastChar;
      } else {
        styledTime = styledTime.slice(0, -3);
        let hour = parseInt(styledTime.substring(0, 2), 10);
        if (hour > 12) {
          hour -= 12;
          const hourString = hour.toString();
          styledTime = `${hourString + styledTime.slice(2)}PM`;
        } else {
          styledTime += 'AM';
        }
      }
      this.setState({
        timePickerVisible: !timePickerVisible
      });
      changeTimeAction(styledTime);
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
        datePickerVisible: !datePickerVisible
      });
      changeDateAction(chosen);
    }
  }

  render() {
    const { datePickerVisible, timePickerVisible } = this.state;
    const { handleModal, date, time } = this.props;
    return (
      <Modal
        style={styles.modal}
        transparent
        animationType="fade"
      >
        <View style={[styles.modalContainer, styles.boxWithShadow]}>
          <Text style={styles.promptText}> Change Time </Text>
          <Text style={styles.titleText}>
            {date}
          </Text>
          <DateTimePicker
            isVisible={datePickerVisible}
            onConfirm={chosenDate => this.handleConfirm(chosenDate, 'date')}
            onCancel={this.showDatePicker}
            maximumDate={this.date}
            minimumDate={this.minDate}
          />
          <TouchableOpacity
            style={[styles.whiteButton, styles.boxWithShadow]}
            onPress={this.showDatePicker}
          >
            <Text style={styles.titleText}>
              Change
            </Text>
          </TouchableOpacity>
          <Text style={styles.titleText}>
            {time}
          </Text>
          <DateTimePicker
            mode="time"
            isVisible={timePickerVisible}
            onConfirm={chosenTime => this.handleConfirm(chosenTime, 'time')}
            onCancel={this.showTimePicker}
            is24Hour
            minuteInterval={30}
            titleIOS="Pick a time"
          />
          <TouchableOpacity
            style={[styles.whiteButton, styles.boxWithShadow]}
            onPress={this.showTimePicker}
          >
            <Text style={styles.titleText}>
              Change
            </Text>
          </TouchableOpacity>
          <View style={styles.containerRow}>
            <View style={styles.containerCol}>
              <TouchableOpacity
                style={[styles.blueButton, styles.boxWithShadow]}
                onPress={() => handleModal()}
              >
                <Text style={styles.titleTextBlue}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerCol}>
              <TouchableOpacity
                style={[styles.blueButton, styles.boxWithShadow]}
                onPress={() => this.changeSearch()}
              >
                <Text style={styles.titleTextBlue}>
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const promptText = {
  fontFamily: 'System',
  fontSize: 22,
  fontWeight: '600',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: 'black',
  width: '80%',
  textAlign: 'center',
  marginBottom: 10,
  marginTop: 10
};
const titleText = {
  fontFamily: 'System',
  fontSize: 16,
  fontWeight: '300',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: 'black',
};

const styles = StyleSheet.create({
  promptText,
  titleText,
  modalContainer: {
    height: '30%',
    minHeight: 250,
    width: '90%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    top: '35%',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  titleTextBlue: {
    ...titleText,
    color: 'white'
  },
  verticalDivider: {
    height: 30,
    backgroundColor: '#e0e0e0',
    width: 2,
    marginBottom: 2,
    marginRight: '10%',
    marginLeft: '10%',
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCol: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  whiteButton: {
    backgroundColor: 'white',
    height: 30,
    width: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  blueButton: {
    backgroundColor: '#108BF8',
    height: 30,
    width: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5
  },
});

const mapStateToProps = state => ({
  time: state.study.time,
  date: state.study.date,
});

const mapDispatchToProps = dispatch => ({
  changeTime: (time) => {
    dispatch(changeTime(time));
  },
  changeDate: (date) => {
    dispatch(changeDate(date));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyRoomModal);
