import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, ActivityIndicator
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

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
  //for later
const BldgPairs = {
  boelter: 'Boelter Hall',
  bunche: 'Bunche Hall',
  dodd: 'Dodd Hall',
  franz: 'Franz Hall',
  haines: 'Haines Hall',
  kaplan: 'Kaplan Hall',
  ls: 'Life Sciences',
  moore: 'Moore Hall',
  ms: 'Mathematical Sciences',
  ostin: 'Ostin Music Center',
  pab: 'Physics and Astronomy Building',
  pubaff: "Public Affairs Building",
  pubhealth: 'School of Public Health',
  
};

const durationPairs = {
  '1 hour': '60',
  '2 hours': '120',
};

export default class ClassroomView extends Component {
  static navigationOptions = {
    header: () => {
      false;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      rooms: this.props.navigation.getParam('rooms', 'NA'),
      building: this.props.navigation.getParam('building', 'NA'),
      class_key: this.props.navigation.getParam('class_key', 'NA'),
      weekDay: this.props.navigation.getParam('weekDay', 'NA'),
      minutesMidnight: this.props.navigation.getParam('minutesMidnight', 'NA'),
      // classtimes: this.props.navigation.getParam('classtimes', 'NA'),
      duration: '1 hour',
      currentRoom: "NA",
      slide: false
    };
  }


  // onSwipeLeft(gestureState) {
  //   this.setDuration('2 hours');
  // }

  // onSwipeRight(gestureState) {
  //   this.setDuration('1 hour');
  // }

  // onSwipe(gestureName, gestureState) {
  //   const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
  //   switch (gestureName) {
  //     case SWIPE_LEFT:
  //       this.setDuration('2 hours');
  //       break;
  //     case SWIPE_RIGHT:
  //       this.setDuration('1 hour');
  //       break;
  //     default:
  //       break;
  //   }
  // }

  setDuration = (hour) => {
    this.setState({
      duration: hour
    });

    this.setState({
      slide: true
    });

    setTimeout(() => {
      this.setState({
        slide: false
      });
    }, 100);
  }

  handleAvailability = (room) => {
    // this.props.navigation.navigate('BookingWebView', { url: room });
    this.getClasstimes(room);
  }

  async getClasstimes(room) {
    let temp;
    const { navigation } = this.props;
    const { building , currentRoom } = this.state;
    await fetch(`http://studysmarttest-env.bfmjpq3pm9.us-west-1.elasticbeanstalk.com/v2/get_room_timetable/${building}/${room}`)
      .then(response => response.json())
      .then((data) => {
        temp = data;
      });
      console.log(temp.rows);
  }

  renderList(item) {
    const { duration } = this.state;
    console.log("item in renderList", item);
    
    // eslint-disable-next-line consistent-return
    return (
      <View style={styles.cell}>
        <View style={styles.containerRow}>
          <View style={styles.containerCol}>
            <Text style={styles.text}>
              {"Classroom " + item.room}
            </Text>
          </View>
          <View style={styles.containerCol}>
            <TouchableOpacity
              style={styles.reserveButton}
              onPress={() => this.handleAvailability(item.room)}
            >
              <Text style={styles.whiteText}>
                Availability
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    );
  }

  render() {
    const { building, rooms, classtimes, duration, slide } = this.state;
    console.log("building: ", building);
    console.log("rooms: ", rooms);
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.bar}>
          <TouchableOpacity style={styles.leftButtonAbs} onPress={() => navigate('StudyRoomsContainer')}>
            <Ionicon name="ios-arrow-back" color="#108BF8" size={35} />
          </TouchableOpacity>
          <Text style={styles.titleText}>
            {' '}
            {building}
            {' '}
          </Text>
        </View>
       <FloatingSegment setCategory={this.setDuration} selected={duration} titles={['1 hour', '2 hours']} />
          <FlatList
            data={rooms}
            extraData={this.state}
            renderItem={({ item }) => this.renderList(item)}
            keyExtractor={(item, index) => index.toString()}
            style={{ flex: 1, backgroundColor: 'transparent', marginTop: 5 }}
          />
        { slide ? <ActivityIndicator style={styles.animation} size="large" color="#108BF8" /> : null }
      </SafeAreaView>

    );
  }
}

const text = {
  fontFamily: 'System',
  fontSize: 14,
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
  borderRadius: 5,
  marginLeft: 20
};

const styles = StyleSheet.create({
  searchText: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: 'black',
    width: '80%',
  },
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
    fontWeight: '600',
    color: 'black'
  },
  whiteText: {
    ...text,
    fontSize: 15,
    color: 'white'
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
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftButtonAbs: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 20,
    top: '15%',
    zIndex: 5
  },
  bar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  animation: {
    backgroundColor: 'white',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '15%',
    justifyContent: 'center'
  }
});