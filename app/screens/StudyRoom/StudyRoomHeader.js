import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, SafeAreaView
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Search from '../../components/Search';
import Sorter from '../../components/Sorter';
import { changeDuration } from '../../Actions/actions';


const fakeVal = [];
class StudyRoomHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.goBack = this.goBack.bind(this);
    this.showResults = this.showResults.bind(this);
  }


  // Shirly's code from GlobalSearchBar.js
  goBack() {
    this.props.navigation.navigate('BookingTime');
  }

  showSorter() {
    this.setState({
      visible: true
    });
  }

  showResults() {
    this.setState({
      visible: false
    });
    this.props.sortData();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { date, time } = this.props;
    const { visible } = this.state;
    return (
      <View style={styles.topBar}>
        <View style={styles.bar} />
        <Search
          data={fakeVal} // this should be an API call or huge list eventually
          defaultValue={date !== '' || time !== '' ? `${date} ${time}` : ''}
          onFocus={this.goBack}
          onChangeText={() => null}
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

const styles = StyleSheet.create({
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
    backgroundColor: '#108BF8',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

  },
  searchContainer: {
    zIndex: 5,
    flexDirection: 'row',
    width: '98%',
    height: 35,
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    zIndex: 5,
    height: 40,
    width: '98%',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 0.8,
  },
  input: {
    ...text,
    fontSize: 14,
    fontWeight: '300',
    color: '#000',
  }


});
const mapStateToProps = state => ({

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

/*
 <SafeAreaView style={styles.rightView}>
          <TouchableOpacity
            style={styles.buttonRight}
            onPress={() => this.showSorter()}
          >
            <AntIcon name="filter" color="white" size={30} />
          </TouchableOpacity>
          { visible ? (
            <Sorter
              showResults={this.showResults}
            />
          ) : null }
        </SafeAreaView> */
