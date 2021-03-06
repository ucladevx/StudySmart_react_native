import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, ActivityIndicator
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

// for later
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
  pubaff: 'Public Affairs Building',
  pubhealth: 'School of Public Health',

};

const dayPairs = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default class ClassroomAvailabilityView extends Component {
  static navigationOptions = {
    header: () => {
      false;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      classtimes: this.props.navigation.getParam('classtimes', 'NA'),
      building: this.props.navigation.getParam('building', 'NA'),
      room: this.props.navigation.getParam('room', 'NA'),
      // duration: '1 hour',
      slide: false
    };
  }

  // eslint-disable-next-line class-methods-use-this
  formatTime(timeString) {
    const dateObj = new Date(timeString * 60000);
    let hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    let time = `${hours.toString().padStart(2, '0')}:${
      minutes.toString().padStart(2, '0')}`;
    if (hours > 12) {
      hours -= 12;
      time = `${hours.toString().padStart(2, '0')}:${
        minutes.toString().padStart(2, '0')} pm`;
    } else if (hours === 12) {
      time += ' pm';
    } else {
      time += ' am';
    }
    return time;
  }


  renderList(item) {
    // eslint-disable-next-line consistent-return
    return (
      <View style={styles.cell}>
        <View style={styles.containerRow}>
          <View style={styles.containerCol}>
            <Text style={styles.text}>
              {`${dayPairs[item.day]}: ${this.formatTime(item.start_time)} - ${this.formatTime(item.end_time)}`}
            </Text>
          </View>
        </View>
      </View>

    );
  }

  render() {
    const {
      building, room, classtimes, slide
    } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.bar}>
          <TouchableOpacity style={styles.leftButtonAbs} onPress={() => navigate('ClassroomView')}>
            <Ionicon name="ios-arrow-back" color="#108BF8" size={35} />
          </TouchableOpacity>
          <Text style={styles.titleText}>
            {' '}
            {`${building} ${room}`}
            {' '}
          </Text>
        </View>
        <FlatList
          data={classtimes}
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
