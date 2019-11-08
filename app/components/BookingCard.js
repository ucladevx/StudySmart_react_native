import React, { Component } from 'react';
import {
  StyleSheet, Dimensions, View, Text, Image, TouchableOpacity
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { withNavigation } from 'react-navigation';

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

const sproulstudy = require('../../assets/Studyrooms/sproulstudy.jpg');
const sproulmusic = require('../../assets/Studyrooms/sproulmusic.jpg');
const deneve = require('../../assets/Studyrooms/deneve.jpg');
const rieber = require('../../assets/Studyrooms/rieber.jpg');
const hedrick = require('../../assets/Studyrooms/hedrickstudy.jpg');
const hedrickmusic = require('../../assets/Studyrooms/hedrickmusic.jpg');
const music = require('../../assets/Studyrooms/music.jpg');
const hedrickstudy = require('../../assets/Studyrooms/hedrick.jpg');
const movement = require('../../assets/Studyrooms/movement.jpg');
const powellLibIcon = require('../../assets/Libraries/PowellLibrar.jpg');
const researchLibIcon = require('../../assets/Libraries/ResearchLibr.jpg');
const biomedLibIcon = require('../../assets/Libraries/BiomedicalLi.jpg');

const imagePairs = {
  sproulmusic,
  sproulstudy,
  deneve,
  rieber,
  hedrick,
  hedrickmusic,
  music,
  hedrickstudy,
  movement,
  'Powell Library': powellLibIcon,
  'Young Research Library': researchLibIcon,
};

class BookingCard extends Component {
  handleSelectRoom = (item) => {
    const { navigation } = this.props;
    console.log(item);
    switch (item.area) {
      case 'Hill':
        navigation.navigate('StudyRoomReserve', {
          rooms: item
        });
        break;
      case 'Library':
        navigation.navigate('LibraryRoomReserve', {
          rooms: item
        });
        break;
      default:
        break;
    }
  }

  render() {
    const { item } = this.props;

    const unique = [];
    for (let i = 0; i < item.available.length; i += 1) {
      if (!unique.includes(item.available[i].details)) {
        unique.push(item.available[i].details);
      }
    }
    return (
      <TouchableOpacity
        onPress={() => this.handleSelectRoom(item)}
      >
        <View style={styles.cell}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => this.handleSelectRoom(item)}
          >
            <Entypo name="chevron-thin-right" size={25} color="black" />
          </TouchableOpacity>
          <View
            style={styles.containerRow}
          >
            <View style={styles.imageIcon}>
              <Image source={imagePairs[item.location]} style={styles.image} />
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
                  {unique.length}
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
  imageIcon: {
    borderRadius: 5,
    height: 100,
    width: 100,

    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 5,
  },
  text,
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
  empty: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation: {
    backgroundColor: 'white',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    justifyContent: 'center',
    zIndex: 20
  }
});


export default withNavigation(BookingCard);
