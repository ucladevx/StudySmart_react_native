import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image
} from 'react-native';
import { connect } from 'react-redux';
import Search from '../../components/Search';

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

const calendarIcon = require('../../../assets/icons8-schedule-80.png');

const fakeVal = [];
class StudyRoomHeader extends Component {
  handleInput = (input) => {
    const { filterData } = this.props;
    filterData(input);
  }

  render() {
    const { date, time, handleModal, currentLocation, floatComponent } = this.props;
    const month = monthPairs[date.substring(0, 2)];
    const day = date.substring(3, 5);

    return (
      <View style={currentLocation !== 'Hill' ? styles.topBar : styles.topShortBar}>
        <View style={styles.bar}>
          <TouchableOpacity style={styles.rightButtonAbs} onPress={() => handleModal()}>
            {}
            <Image source={calendarIcon} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <View>
            <Text style={styles.searchText}>
              {' '}
              {date !== '' || time !== '' ? `${month} ${day} ${currentLocation !== 'Hill' ? time : ''}` : ''}
              {' '}
            </Text>
          </View>
        </View>
        {floatComponent}
        {
          currentLocation !== 'Hill'
          && (
            <Search
              data={fakeVal} // this should be an API call or huge list eventually
              defaultValue=""
              placeholder="Search places to reserve..."
              onChangeText={text => this.handleInput(text)}
              style={[styles.searchContainer, styles.input]}
              inputContainerStyle={[styles.inputContainer]}
              renderItem={() => (
                <TouchableOpacity onPress={() => null} />
              )}
            />
          )
        }
      </View>
    );
  }
}

const text = {
  fontFamily: 'System',
  letterSpacing: 1.92,
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
  textAlign: 'center',
  alignItems: 'center'
};

const styles = StyleSheet.create({
  titleText,
  searchText: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '800',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: 'black',
    textAlign: 'left',
  },
  topBar: {
    alignItems: 'center',
    width: '100%',
    height: 120
  },
  topShortBar: {
    alignItems: 'center',
    width: '100%',
    height: 100
  },
  buttonLeft: {
    marginLeft: 15
  },
  buttonRight: {
    marginRight: 15
  },
  rightView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 40
  },
  leftView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 40
  },
  bar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  searchContainer: {
    zIndex: 5,
    flexDirection: 'row',
    width: '95%',
    height: 35,
    marginLeft: '5%',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    zIndex: 5,
    height: 40,
    width: '95%',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0.5,
      height: 0.5
    },
    shadowRadius: 1,
    shadowOpacity: 0.8,
  },
  input: {
    ...text,
    fontSize: 14,
    fontWeight: '300',
    color: '#000',
  },
  rightButtonAbs: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 10,
    marginTop: '1%',
    zIndex: 10,
    justifyContent: 'center'
  },
  leftViewAbs: {
    width: '80%',
    height: 30,
    position: 'absolute',
    left: '2%',
    marginTop: '1%',
    zIndex: 10,
  }


});
const mapStateToProps = state => ({
  location: state.study.location,
  time: state.study.time,
  date: state.study.date,
});


export default connect(mapStateToProps)(StudyRoomHeader);
