import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';

class StudyRoomTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 'Choose a time!',
    };
  }

  setTime(duration) {
    this.setState({
      duration: duration
    });
    this.continue();
  }

  continue() {
    this.props.navigation.navigate('StudyRoomList');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.promptText}>Choose a duration! </Text>
        <TouchableOpacity style={styles.studyRoom} onPress={() => this.setTime(1)}>
          <Text style={styles.titleText}>1 hr </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.studyRoom} onPress={() => this.setTime(2)}>
          <Text style={styles.titleText}>2 hrs </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.studyRoom} onPress={() => this.setTime(3)}>
          <Text style={styles.titleText}>3 hrs </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.studyRoom} onPress={() => this.continue()}>
          <Text style={styles.titleText}>Skip </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const promptText = {
  height: 100,
  fontFamily: 'System',
  fontSize: 30,
  fontWeight: 'bold',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: 'black',
  marginTop: '12%',
  marginBottom: '5%',
};


const styles = StyleSheet.create({
  promptText,
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  picker: {
    borderWidth: 2,
    borderColor: 'black',
    width: '60%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  studyRoom: {
    backgroundColor: '#4F87EC',
    height: 50,
    width: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  searchButton: {
    flex: 0,
    borderWidth: 2,
    borderColor: '#4F87EC',
    width: '65%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  searchText: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: '#4F87EC',
    width: '80%',
    padding: 5
  },
  titleText: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: 'white',
    width: '80%',
    padding: 5
  },

});

export default withNavigation(StudyRoomTime);