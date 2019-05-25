import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, SafeAreaView
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import Search from '../../components/Search';
import { changeDuration } from '../../Actions/actions';

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

const fakeVal = [];
class StudyRoomHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleInput = (input) => {
    this.props.filterData(input);
  }

  render() {
    const { date, time, location } = this.props;
    const { visible } = this.state;
    const month = monthPairs[date.substring(0, 2)];
    const day = date.substring(3, 5);
    return (
      <View style={styles.topBar}>
        <View style={styles.bar}>
          <TouchableOpacity style={styles.rightButtonAbs} onPress={() => this.props.handleModal()}>
            <MaterialCommunityIcons name="filter-variant" color="#108BF8" size={35} />
          </TouchableOpacity>
          <Text style={styles.searchText}>
            {' '}
            {date !== '' || time !== '' ? `${month} ${day} ${time}` : ''}
            {' '}
          </Text>
        </View>
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
  textAlign: 'center'
};

const styles = StyleSheet.create({
  titleText,
  searchText: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: 'black',
    width: '80%',
    textAlign: 'left',
    position: 'absolute',
    left: '2%',
    top: '15%',
  },
  topBar: {
    alignItems: 'center',
    width: '100%',
    height: 100,
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
    backgroundColor: 'white',
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
    right: 20,
    top: '15%',
    zIndex: 10,
  },


});
const mapStateToProps = state => ({
  location: state.study.location,
  time: state.study.time,
  date: state.study.date,
  duration: state.study.duration,
});

const mapDispatchToProps = dispatch => ({
  changeDuration: (duration) => {
    dispatch(changeDuration(duration));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyRoomHeader);
