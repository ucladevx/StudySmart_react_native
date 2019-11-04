// import React, { Component, useEffect, useState, useRef } from 'react';
// import { Platform } from 'react-native';
// import { connect } from 'react-redux';
// import {
//     changeTime, changeDate, changeLocation, loadHillData, loadLibraryData,
//   } from '../../Actions/actions';
//   import StudyRoomList from './StudyRoom';

// const monthPairs = {
//     '01': 'Jan',
//     '02': 'Feb',
//     '03': 'March',
//     '04': 'April',
//     '05': 'May',
//     '06': 'June',
//     '07': 'July',
//     '08': 'Aug',
//     '09': 'Sept',
//     10: 'Oct',
//     11: 'Nov',
//     12: 'Dec',
// };

// export default BuildingSelectView = (props) => {
//     // this.state = {
//     //     hillData: [],
//     //     librariesData: [],
//     //     loading: true,
//     //   };
//     const [librariesData, setLibrariesData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [buildingData, setBuildingData] = useState([]);

//     const prevDate = usePrevious(props.date);

    // useEffect(() => {

    //     /* componentDidMount code + componentDidUpdate code */
    //     const setting = new Date();

    //     const { date } = this.props;

    //   const { changeTime: changeTimeAction, changeDate: changeDateAction } = this.props;
    //   const minutes = setting.getMinutes();
    //   if (minutes !== 30 && minutes !== 0) {
    //     if (minutes > 30) {
    //       setting.setMinutes(60);
    //     } else {
    //       setting.setMinutes(30);
    //     }
    //   }
    //   let styledTime = setting.toLocaleTimeString();
    //   const last2ndChar = styledTime[styledTime.length - 2];
    //   const lastChar = styledTime[styledTime.length - 1];
    //   if (Platform.OS === 'ios') {
    //     styledTime = styledTime.slice(0, -6) + last2ndChar + lastChar;
    //   } else {
    //     styledTime = styledTime.slice(0, -3);
    //     let hour = parseInt(styledTime.substring(0, 2), 10);
    //     let hourString = hour.toString();
    //     if (hour > 12) {
    //       hour -= 12;
    //       hourString = hour.toString();
    //       styledTime = `${hourString + styledTime.slice(2)}PM`;
    //     } else {
    //       if (hourString === '0') {
    //         hourString = '12';
    //       }
    //       styledTime = `${hourString + styledTime.slice(2)}AM`;
    //     }
    //   }
    //   changeTimeAction(styledTime);
    //   let chosen = setting;
    //   let dd = chosen.getDate();
    //   let mm = chosen.getMonth() + 1; // January is 0!
    //   const yyyy = chosen.getFullYear();
    //   if (dd < 10) {
    //     dd = `0${dd}`;
    //   }
    //   if (mm < 10) {
    //     mm = `0${mm}`;
    //   }
    //   chosen = `${mm}/${dd}/${yyyy}`;
    //   changeDateAction(chosen);

      
    //   // Typical usage (don't forget to compare props):
    //   if (date !== prevDate) {
    //     this.getStudyRooms();
    //   }
    //     return () => {
    //         /* componentWillUnmount code */
    //     }
    // }, [props]);

    // usePrevious= (value) => {
    //     const ref = useRef();
    //     useEffect(() => {
    //       ref.current = value;
    //     }, []);
    //     return ref.current;
    //   }

// }

import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, ActivityIndicator
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

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
  boyer: 'Boyer Hall',
  bradley: 'Bradley Hall',
  bunche: 'Bunche Hall',
  dodd: 'Dodd Hall',
  haines: 'Haines Hall',
  hershey: 'Hershey Hall',
  kaplan: 'Kaplan Hall',
  kaufman: 'Kaufman Hall',
  knudsen: 'Knudsen Hall',
  lakretz: 'La Kretz Hall',
  law: 'Law Building',
  ls: 'Life Sciences',
  macgown: 'Macgowan Hall',
  melnitz: 'Melnitz Hall',
  molsci: 'Molecular Sciences Building',
  moore: 'Moore Hall',
  ms: 'Mathematical Sciences',
  ostin: 'Ostin Music Center',
  pab: 'Physics and Astronomy Building',
  pubaff: "Public Affairs Building",
  pubhealth: 'School of Public Health',
  rolfe: 'Rolfe Hall',
  royce: 'Royce Hall',
  slichter: 'Slichter Hall',
  schoenberg: 'Schoenberg Musi Building',
  teraski: 'Teraski Life Sciences Building',
  young: 'Young Hall',
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
      duration: '1 hour',
      slide: false
    };
  }


  onSwipeLeft(gestureState) {
    this.setDuration('2 hours');
  }

  onSwipeRight(gestureState) {
    this.setDuration('1 hour');
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        this.setDuration('2 hours');
        break;
      case SWIPE_RIGHT:
        this.setDuration('1 hour');
        break;
      default:
        break;
    }
  }

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

  renderList(item) {
    const { duration } = this.state;
    if (duration.length !== 0 && durationPairs[duration] !== item.duration) {
      return;
    }
    let details = item.details.replace(/\n/g, '');
    details = details.trim();
    details = details.slice(0, -1);
    const detailsArray = details.split('(');
    // eslint-disable-next-line consistent-return
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
        </View>
      </View>

    );
  }

  render() {
    const { rooms, duration, slide } = this.state;
    const { navigate } = this.props.navigation;
    const tester = "Is this thing on?";
    const config = {
      velocityThreshold: 0.1,
      directionalOffsetThreshold: 200
    };
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.bar}>
          <TouchableOpacity style={styles.leftButtonAbs} onPress={() => navigate('StudyRoomsContainer')}>
            <Ionicon name="ios-arrow-back" color="#108BF8" size={35} />
          </TouchableOpacity>
          <Text style={styles.titleText}>
            {' '}
            {namePairs[rooms.location]}
            {' '}
          </Text>
        </View>
        <FloatingSegment setCategory={this.setDuration} selected={duration} titles={['1 hour', '2 hours']} />
        <GestureRecognizer
          onSwipe={(direction, state) => this.onSwipe(direction, state)}
          onSwipeLeft={state => this.onSwipeLeft(state)}
          onSwipeRight={state => this.onSwipeRight(state)}
          config={config}
          style={{
            flex: 1,
            backgroundColor: 'white'
          }}
        >
          <FlatList
            data={rooms.available}
            extraData={this.state}
            renderItem={({ item }) => this.renderList(item)}
            keyExtractor={(item, index) => index.toString()}
            style={{ flex: 1, backgroundColor: 'transparent', marginTop: 5 }}
          />
        </GestureRecognizer>
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