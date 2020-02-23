import React, { Component } from 'react';
import {
  Text, View, StyleSheet, SafeAreaView, FlatList, ActivityIndicator,
  TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import StudyRoomHeader from './StudyRoomHeader';
import StudyRoomModal from './StudyRoomModal';
import FloatingSegment from '../../components/FloatingSegment';
import ShadowButton from '../../components/ShadowButton';
import BookingCard from '../../components/BookingCard';
import ClassroomBuildingCard from '../../components/ClassroomBuildingCard';
import StudyRoomsPreview from './StudyRoomsPreview';
import ClassroomsPreview from './ClassroomsPreview';

export default class ClassroomBuildingList extends Component {
  // eslint-disable-next-line react/sort-comp
  // static navigationOptions = {
  //   header: () => { }
  // }

  renderRowBldg = item => <ClassroomBuildingCard item={item} />

  render() {
    const available = this.props.navigation.getParam('rooms', 'NA');
    const hourOffset = this.props.navigation.getParam('hourOffset', 'NA');
    const minuteOffset = this.props.navigation.getParam('minuteOffset', 'NA');
    const day = this.props.navigation.getParam('day', 'NA');

    const minutesMidnight = hourOffset * 60 + minuteOffset;

    available.forEach((bldg) => {
      bldg.minutesMidnight = minutesMidnight;
      bldg.weekDay = day;
    });

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={available}
            extraData={available}
            renderItem={({ item }) => this.renderRowBldg(item)}
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
          />
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
