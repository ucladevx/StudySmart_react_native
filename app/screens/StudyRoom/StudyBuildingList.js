import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, FlatList,
  TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import StudyBuildingCard from '../../components/StudyBuildingCard';

export default class StudyBuildingList extends Component {
  // eslint-disable-next-line react/sort-comp
  // static navigationOptions = {
  //   header: () => { }
  // }

  renderRowBldg = item => <StudyBuildingCard item={item} />

  render() {
    const available = this.props.navigation.getParam('rooms', 'NA');
    const hourOffset = this.props.navigation.getParam('hourOffset', 'NA');
    const minuteOffset = this.props.navigation.getParam('minuteOffset', 'NA');
    const day = this.props.navigation.getParam('day', 'NA');

    const minutesMidnight = hourOffset * 60 + minuteOffset;
    availableBldg = {};
    available.forEach((room) => {
      if(room.name in availableBldg) {
        availableBldg[room.name].rooms.push(room);
      }
      else {
        availableBldg[room.name] = {name: room.name, rooms: [room] };
      }
    });
    availableBldg_list = [];
    Object.keys(availableBldg).forEach((bldg) => {
      availableBldg_list.push(availableBldg[bldg]);
    });
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={availableBldg_list}
            extraData={availableBldg_list}
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
  }
});
