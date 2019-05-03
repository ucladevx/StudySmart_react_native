import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList, Linking, SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  changeTime, changeDate, changeLocation, loadData
} from '../../Actions/actions';

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
    };
  }


  handleReserve = (room) => {
    if (room !== null) {
      Linking.openURL(room);
    }
    this.props.navigation.navigate('StudyRoomList');
  }

  renderList(item) {
       /* const durations = { 1: '60', 2: '120' };
    if (this.state.duration.length !== 0 && durations[this.state.duration] !== item.duration) {
      return;
    } */
    let details = item.details.replace(/\n/g, '');
    details = details.trim();
    const { room } = this.state;
    return (
      <TouchableOpacity
        style={styles.cell}
        onPress={() => this.handleReserve(item.link)}
      >
        <Text style={styles.text}>
          {details}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { rooms } = this.state;
    console.log(this.state.rooms)
    return (
      <SafeAreaView style={styles.container}>
      <View style = {styles.bar}>
      <Text> {namePairs[rooms.location]} </Text>
      </View>
          <FlatList
            data={rooms.available}
            extraData={this.state}
            renderItem={({ item }) => this.renderList(item)}
            keyExtractor={(item, index) => index.toString()}
            style={{ flex: 1, backgroundColor: 'transparent' }}
            />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 18,
    fontWeight: '300',
    color: 'black',
  },
  icon: {
    position: 'absolute',
    right: 5
  },
  bar: {
    height: 50,
    backgroundColor: '#108BF8',
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
