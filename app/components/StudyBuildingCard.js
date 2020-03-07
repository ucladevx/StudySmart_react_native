import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Image, TouchableOpacity
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { withNavigation } from 'react-navigation';
import ReactNativeHaptic from 'react-native-haptic';

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

const hedrickstudy = require('../../assets/Studyrooms/hedrick.jpg');


class StudyBuildingCard extends Component {
  static navigationOptions = {
    header: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      studyRoomList: [],
    };
    this.getClassrooms = this.getClassrooms.bind(this);
  }

  handleSelectBuilding = () => {
    this.getClassrooms();
    //ReactNativeHaptic.generate('impact');
  }

  async getClassrooms() {
    const { item } = this.props;
    const { navigation } = this.props;
    navigation.navigate('StudyRoomReserve', {
      rooms: item.rooms,
      building: item.name,
    });
  }

  render() {
    const { item } = this.props;
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          clicked = true;
          this.handleSelectBuilding();
        }}
      >
        <View style={styles.cell}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              clicked = true;
              this.handleSelectBuilding();
            }}
          >
            <Entypo name="chevron-thin-right" size={25} color="black" />
          </TouchableOpacity>
          <View
            style={styles.containerRow}
          >
            <View style={styles.imageIcon}>
              {/* <Image source={imagePairs[item.location]} style={styles.image} /> */}
              <Image source={hedrickstudy} style={styles.image} />
            </View>
            <View
              style={styles.containerCol}
            >
              <View style={styles.containerRow}>
                <Text style={[styles.name, styles.leftText]}>
                  {item.building === '' ? 'Building name not found' : namePairs[item.name]}
                </Text>
              </View>
              <View style={styles.containerRow}>
                <Text style={[styles.text, styles.leftText]}>
                    Rooms Available:
                  {item.rooms.length}
                </Text>
              </View>
              <View style={styles.containerRow}>
                <Text style={[styles.text, styles.leftText]} />
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


export default withNavigation(StudyBuildingCard);