import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Search from '../../components/Search';
import Sorter from '../../components/Sorter';
import { changeDuration } from '../../Actions/actions';
import LocationContainer from '../LocationContainer';

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
    this.props.navigation.navigate('Booking');
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
      <View style={styles.bar}>
        <View style={styles.leftView}>
          <TouchableOpacity
            style={styles.buttonLeft}
            onPress={() => navigate('LocationContainer')}
          >
            <Ionicon name="ios-list" color="white" size={30} />
          </TouchableOpacity>
        </View>
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
        <View style={styles.rightView}>
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
        </View>
      </View>

    );
  }
}

const text = {
  fontFamily: 'System',
  letterSpacing: 1.92,
};

const styles = StyleSheet.create({
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
    height: 80,
    paddingTop: 10,
    backgroundColor: '#4F87EC',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',

  },
  searchContainer: {
    flex: 1,
    zIndex: 5,
    marginLeft: '5%'
  },
  inputContainer: {
    width: 250,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1
  },
  input: {
    ...text,
    fontSize: 14,
    fontWeight: 'bold',
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
