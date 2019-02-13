import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList, Linking
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import { changeTime, changeDate } from '../../Actions/actions';
import StudyRoomHeader from '../../components/StudyRoomHeader';
import StudyRoomModal from './StudyRoomModal';

const availableRooms = [
  { location: 'Hedrick', room: 7, availableDurations: [1, 2, 3] },
  { location: 'Powell', room: 5, availableDurations: [1, 2, 3] },
  { location: 'Sproul', room: 5, availableDurations: [1, 2, 3] },
  { location: 'YRL', room: 5, availableDurations: [1, 2, 3] },
  { location: 'Sproul', room: 7, availableDurations: [1] },
  { location: 'Sproul', room: 7, availableDurations: [1] },
  { location: 'YRL', room: 2, availableDurations: [1, 2] },
];

class StudyRoomList extends Component {
  static navigationOptions = {
    // headerTitle instead of title
    header: props => <StudyRoomHeader {...props} />,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleSelectRoom() {
    Linking.openURL('http://calendar.library.ucla.edu/spaces?lid=4394&gid=7749').catch(err => console.error('An error occurred', err));
  }

  showInfo() {
    this.setState({
      visible: true,
    });
  }

  renderRow(item) {
    return (
      <TouchableOpacity
        onPress={() => this.handleSelectRoom(item)}
      >
        <View style={styles.cell}>
          <View
            style={styles.containerRow}
          >
            <View style={styles.circleIcon}>
              <Text style={styles.circleText}>COOL</Text>
            </View>
            <View
              style={styles.containerText}
            >
              <View style={styles.containerRow}>
                <Text style={[styles.name, styles.leftText]}>
                  {item.location}
                </Text>
              </View>
              <View style={styles.containerRow}>
                <Text style={[styles.text, styles.leftText]}>
                  Rooms Available:
                  {item.room}
                </Text>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => this.showInfo()}
                >
                  <Entypo name="chevron-thin-down" size={25} />
                </TouchableOpacity>
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
    const data = availableRooms;
    return (
      <View style={styles.container}>
        <FlatList
          ref={(ref) => { this._flatList = ref; }}
          data={data}
          extraData={data}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
        { this.state.visible ? (
          <StudyRoomModal />
        ) : null }
      </View>
    );
  }
}

const text = {
  fontFamily: 'System',
  fontSize: 12,
  fontWeight: '500',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: '#5e5b59',
  paddingBottom: 3,
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4F87EC',
    width: '100%',
  },
  list: {
    backgroundColor: 'transparent',
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    padding: 10,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  containerText: {
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
    width: '100%'
  },
  category: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  circleIcon: {
    borderRadius: 25,
    height: 50,
    width: 50,
    backgroundColor: 'green',
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
  circleText: {
    ...text,
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  name: { // name of location
    ...text,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  icon: {
    marginLeft: '35%'
  }
});

const mapStateToProps = state => ({
  time: state.study.time,
  date: state.study.date
});

const mapDispatchToProps = dispatch => ({
  changeTime: (time) => {
    dispatch(changeTime(time));
  },
  changeDate: (date) => {
    dispatch(changeDate(date));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyRoomList);
