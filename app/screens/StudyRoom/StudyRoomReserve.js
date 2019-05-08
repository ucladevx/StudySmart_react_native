import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList, Linking, SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  changeTime, changeDate, changeLocation, loadData
} from '../../Actions/actions';
import FloatingSegment from '../../components/FloatingSegment';

const namePairs = {
  sproulstudy: 'Sproul Study Rooms',
  sproulmusic: 'Sproul Music Rooms',
  deneve: 'De Neve Meeting Rooms',
  rieber: 'Rieber Study Rooms',
  music: 'Rieber Music Rooms',
  hedrick: 'The Study at Hedrick',
  hedrickstudy: 'Hedrick Study Rooms',
  hedrickmusic: 'Hedrick Music Rooms',
  movement: 'Hedrick Movement Studio',
};

const durationPairs = {
  '1 hour': '60',
  '2 hours': '120',
};

class StudyRoomReserve extends Component {
  static navigationOptions={
    header: () => {
      false;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      rooms: this.props.navigation.getParam('rooms', 'NA'),
      duration: '1 hour'
    };
  }

  setDuration = (hour) => {
    this.setState({
      duration: hour
    });
  }

  handleReserve = (room) => {
    this.props.navigation.navigate('BookingWebView', { url: room });
  }

  renderList(item) {
    const { duration } = this.state;
    if (duration.length !== 0 && durationPairs[duration] !== item.duration) {
      return;
    }
    let details = item.details.replace(/\n/g, '');
    details = details.trim();
    details = details.slice(0, -1);
    const detailsArray = details.split('(');
    const { room } = this.state;
    return (
      <View style={styles.cell}>
        <View style={styles.containerRow}>
          <View style={styles.containerCol}>
            <Text style={styles.text}>
              {detailsArray[0]}
            </Text>
            <Text style={styles.littleText}>
              {detailsArray[1]}
            </Text>
          </View>
          <View style={styles.containerCol}>
            <TouchableOpacity
              style={styles.reserveButton}
              onPress={() => this.handleReserve(item.link)}
            >
              <Text style={styles.whiteText}>
          Reserve
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    );
  }

  render() {
    const { rooms } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.leftButtonAbs} onPress={() => this.props.navigation.navigate('StudyRoomList')}>
          <Ionicon name="ios-arrow-back" color="#108BF8" size={35} />
        </TouchableOpacity>
        <FloatingSegment setDuration={this.setDuration} />
        <View style={styles.bar}>
          <Text style={styles.titleText}>
            {' '}
            {namePairs[rooms.location]}
            {' '}
          </Text>
        </View>
        <FlatList
          data={rooms.available}
          extraData={this.state}
          renderItem={({ item }) => this.renderList(item)}
          keyExtractor={(item, index) => index.toString()}
          style={{ flex: 1, backgroundColor: 'transparent', marginTop: 10 }}
        />
      </SafeAreaView>
    );
  }
}

const text = {
  fontFamily: 'System',
  fontSize: 16,
  fontWeight: '300',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: 'black',
};
const reserveButton = {
  backgroundColor: '#108BF8',
  height: 30,
  width: '75%',
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 5,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.5,
  shadowRadius: 1,
};

const styles = StyleSheet.create({
  reserveButton,
  text,
  littleText: {
    ...text,
    fontSize: 12,
    letterSpacing: 1.92,
    color: 'gray',
  },
  titleText: {
    ...text,
    fontSize: 17,
    color: '#108BF8'
  },
  whiteText: {
    ...text,
    fontSize: 15,
    color: 'white'
  },
  leftText: {
    textAlign: 'left',
    flex: 0
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  list: {
    backgroundColor: 'transparent',
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    height: 120,
    width: '95%',
    padding: 10,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0.5,
      height: 0.5
    },
    shadowRadius: 1,
    shadowOpacity: 0.8,
  },
  containerCol: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15,
    justifyContent: 'center',
    width: '100%',
  },
  containerRow: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
    alignItems: 'center',
    width: '100%',
  },
  category: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  imageIcon: {
    borderRadius: 5,
    height: 100,
    width: 100,
    backgroundColor: 'green',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftButtonAbs: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 20,
    top: '6%',
    zIndex: 5
  },
  icon: {
    position: 'absolute',
    right: 5
  },
  bar: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

  },
});

const mapStateToProps = state => ({
  time: state.study.time,
  date: state.study.date,
  duration: state.study.duration,
  location: state.study.location,
  data: state.study.data,
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
  loadData: (data) => {
    dispatch(loadData(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyRoomReserve);