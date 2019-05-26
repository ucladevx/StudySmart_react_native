import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, Image, SafeAreaView, FlatList
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import StudyRoomHeader from './StudyRoomHeader';
import StudyRoomModal from './StudyRoomModal';
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

const icon = require('../../../assets/studyTab.png');

export default class StudyRoomList extends Component {
  static navigationOptions = {
    header: () => {
      false;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      currentData: this.props.hillDataFound,
      currentLocation: 'Hill',
    };
  }

  filterData = (search) => {
    const rooms = this.props.hillDataFound.slice();
    const hillArray = [];
    const hillDict = {};
    const upperSearch = search.toUpperCase();
    for (let i = 0; i < rooms.length; i += 1) {
      const name = namePairs[rooms[i].name].toUpperCase();
      if (name.includes(upperSearch)) {
        if (rooms[i].name in hillDict) {
          hillDict[rooms[i].name].push(rooms[i]);
        } else {
          hillDict[rooms[i].name] = [rooms[i]];
        }
      }
    }
    Object.keys(hillDict).forEach((key) => {
      hillArray.push({ location: key, available: hillDict[key], area: 'Hill' });
    });
    this.setState({
      currentData: hillArray
    });
  }

  handleSelectRoom = (item) => {
    this.props.navigation.navigate('StudyRoomReserve', {
      rooms: item
    });
  }

  handleModal = () => {
    this.setState({
      visible: !this.state.visible
    });
  }

  setLocation = (location) => {
    this.setState({
      currentData: location === 'Hill' ? this.props.hillDataFound: null,
      currentLocation: location,
    });
  }

  renderRow(item) {
    return (
      <TouchableOpacity
        onPress={() => this.handleSelectRoom(item)}
      >
        <View style={styles.cell}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => this.handleSelectRoom(item)}
          >
            <Entypo name="chevron-thin-right" size={25} color="#108BF8" />
          </TouchableOpacity>
          <View
            style={styles.containerRow}
          >
            <View style={styles.imageIcon}>
              <Image source={icon} style={{ height: 50, width: 60 }} />
            </View>
            <View
              style={styles.containerCol}
            >
              <View style={styles.containerRow}>
                <Text style={[styles.name, styles.leftText]}>
                  {item.area === 'Hill' ? namePairs[item.location] : item.location}
                </Text>
              </View>
              <View style={styles.containerRow}>
                <Text style={[styles.text, styles.leftText]}>
                  Rooms Available:
                  {item.available.length}
                </Text>
              </View>
              <View style={styles.containerRow}>
                <Text style={[styles.text, styles.leftText]}>
                  {''}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      visible, currentData, currentLocation
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StudyRoomHeader
          navigation={this.props.navigation}
          sortData={this.sortData}
          handleModal={this.handleModal}
          filterData={this.filterData}
        />
        <FloatingSegment setCategory={this.setLocation} selected={currentLocation} titles={['Hill', 'Libraries', 'Classrooms']} />
        { this.props.hillDataFound.length > 0 ? (
          <FlatList
            data={this.props.hillDataFound}
            extraData={currentData}
            renderItem={({ item }) => this.renderRow(item)}
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
          />
        ) : (
          <View style={styles.empty}>
            <Text style={titleText}> No rooms available </Text>
          </View>
        ) }

        {visible ? (
          <StudyRoomModal handleModal={this.handleModal} getStudyRooms={this.props.getStudyRooms} />
        ) : null}
      </SafeAreaView>
    );
  }
}

const text = {
  fontFamily: 'System',
  fontSize: 12,
  fontWeight: '300',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: 'black',
  paddingBottom: 3,
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
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  list: {
    backgroundColor: 'transparent',
    marginTop: 5
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
  text,
  bigText: {
    ...text,
    height: 20,
    fontSize: 17,
    letterSpacing: 1.92,
    color: 'black',
  },
  leftText: {
    textAlign: 'left',
    flex: 0
  },
  name: { // name of location
    ...text,
    fontSize: 15,
    fontWeight: '300',
    color: 'black',
  },
  icon: {
    position: 'absolute',
    right: 5,
    top: '45%'
  },
  sectionHeader: {
    height: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
