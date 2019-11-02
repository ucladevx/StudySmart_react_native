import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, Image, SafeAreaView, FlatList, ActivityIndicator,
  TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import StudyRoomHeader from './StudyRoomHeader';
import StudyRoomModal from './StudyRoomModal';
import FloatingSegment from '../../components/FloatingSegment';
import ShadowButton from '../../components/ShadowButton';
import BookingCard from '../../components/BookingCard';

export default class StudyRoomList extends Component {
  static navigationOptions = {
    header: () => { }
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      currentLocation: 'Hill',
    };
  }


  handleSelectRoom = (item) => {
    const { navigation } = this.props;
    navigation.navigate('StudyRoomReserve', {
      rooms: item
    });
  }

  handleModal = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible
    });
  }

  setLocation = (location) => {
    this.setState({
      currentLocation: location,
    });
  }

  renderRow = item => <BookingCard item={item} />

  render() {
    const {
      visible, currentLocation
    } = this.state;
    const {
      navigation, filterData, hillDataFound, loading, getStudyRooms, librariesDataFound,
    } = this.props;

    let listData;
    switch (currentLocation) {
      case 'Hill':
        listData = hillDataFound.length > 0 ? (
          <FlatList
            data={hillDataFound}
            extraData={hillDataFound}
            renderItem={({ item }) => this.renderRow(item)}
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
          />
        ) : (
            <View style={styles.empty}>
              <Text style={titleText}> No rooms available </Text>
              <ShadowButton title="Change Time" select={this.handleModal} />
            </View>
          );
        break;
      case 'Libraries':
        listData = librariesDataFound.length > 0 ? (
          <FlatList
            data={librariesDataFound}
            extraData={librariesDataFound}
            renderItem={({ item }) => this.renderRow(item)}
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
          />
        ) : (
            <View style={styles.empty}>
              <Text style={titleText}> No rooms available </Text>
              <ShadowButton title="Change Time" select={this.handleModal} />
            </View>
          );
        break;
      case 'Classrooms':
      // TODO
      // listData = 
      // break;
      default:
        listData = (
          <View style={styles.empty}>
            <Text style={titleText}> No rooms available </Text>
            <ShadowButton title="Change Time" select={this.handleModal} />
          </View>
        );
    }

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <StudyRoomHeader
            navigation={navigation}
            sortData={this.sortData}
            handleModal={this.handleModal}
            filterData={filterData}
          />
          <FloatingSegment setCategory={this.setLocation} selected={currentLocation} titles={['Hill', 'Libraries', 'Classrooms']} />
          {loading ? <ActivityIndicator style={styles.animation} size="large" color="#108BF8" /> : null}
          {listData}
          {visible ? (
            <StudyRoomModal handleModal={this.handleModal} getStudyRooms={getStudyRooms} />
          ) : null}
        </SafeAreaView>
      </TouchableWithoutFeedback>
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
