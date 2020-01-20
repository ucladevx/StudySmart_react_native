import React, { Component } from 'react';
import {
  SafeAreaView, StyleSheet, FlatList,
} from 'react-native';
import TimeRangeCard from '../../components/TimeRangeCard';

const timeRanges = {
  '12:00-1:00am': [0, 1],
  '1:00-2:00am': [1, 2],
  '2:00-3:00am': [2, 3],
  '3:00-4:00am': [3, 4],
  '4:00-5:00am': [4, 5],
  '5:00-6:00am': [5, 6],
  '6:00-7:00am': [6, 7],
  '7:00-8:00am': [7, 8],
  '8:00-9:00am': [8, 9],
  '9:00-10:00am': [9, 10],
  '10:00-11:00am': [10, 11],
  '11:00-12:00pm': [11, 12],
  '12:00-1:00pm': [12, 13],
  '1:00-2:00pm': [13, 14],
  '2:00-3:00pm': [14, 15],
  '3:00-4:00pm': [15, 16],
  '4:00-5:00pm': [16, 17],
  '5:00-6:00pm': [17, 18],
  '6:00-7:00pm': [18, 19],
  '7:00-8:00pm': [19, 20],
  '8:00-9:00pm': [20, 21],
  '9:00-10:00pm': [21, 22],
  '10:00-11:00pm': [22, 23],
  '11:00-12:00am': [23, 0],
};

const timeRangesSecondary = {
  '12:00-1:00am': ['12:30-1:30am', '12:00-2:00am', '12:30-2:30am'],
  '1:00-2:00am': ['1:30-2:30am', '1:00-3:00am', '1:30-3:30am'],
  '2:00-3:00am': ['2:30-3:30am', '2:00-4:00am', '2:30-4:30am'],
  '3:00-4:00am': ['3:30-4:30am', '3:00-5:00am', '3:30-5:30am'],
  '4:00-5:00am': ['4:30-5:30am', '4:00-6:00am', '4:30-6:30am'],
  '5:00-6:00am': ['5:30-6:30am', '5:00-7:00am', '5:30-7:30am'],
  '6:00-7:00am': ['6:30-7:30am', '6:00-8:00am', '6:30-8:30am'],
  '7:00-8:00am': ['7:30-8:30am', '7:00-9:00am', '7:30-9:30am'],
  '8:00-9:00am': ['8:30-9:30am', '8:00-10:00am', '8:30-10:30am'],
  '9:00-10:00am': ['9:30-10:30am', '9:00-11:00am', '9:30-11:30am'],
  '10:00-11:00am': ['10:30-11:30am', '10:00-12:00pm', '10:30-12:30pm'],
  '11:00-12:00pm': ['11:30-12:30pm', '11:00-1:00pm', '11:30-1:30pm'],
  '12:00-1:00pm': ['12:30-1:30pm', '12:00-2:00pm', '12:30-2:30pm'],
  '1:00-2:00pm': ['1:30-2:30pm', '1:00-3:00pm', '1:30-3:30pm'],
  '2:00-3:00pm': ['2:30-3:30pm', '2:00-4:00pm', '2:30-4:30pm'],
  '3:00-4:00pm': ['3:30-4:30pm', '3:00-5:00pm', '3:30-5:30pm'],
  '4:00-5:00pm': ['4:30-5:30pm', '4:00-6:00pm', '4:30-6:30pm'],
  '5:00-6:00pm': ['5:30-6:30pm', '5:00-7:00pm', '5:30-7:30pm'],
  '6:00-7:00pm': ['6:30-7:30pm', '6:00-8:00pm', '6:30-8:30pm'],
  '7:00-8:00pm': ['7:30-8:30pm', '7:00-9:00pm', '7:30-9:30pm'],
  '8:00-9:00pm': ['8:30-9:30pm', '8:00-10:00pm', '8:30-10:30pm'],
  '9:00-10:00pm': ['9:30-10:30pm', '9:00-11:00pm', '9:30-11:30pm'],
  '10:00-11:00pm': ['10:30-11:30pm', '10:00-12:00am', '10:30-12:30am'],
  '11:00-12:00am': ['11:30-12:30am', '11:00-1:00am', '11:30-1:30am']
};

class StudyRoomsPreview extends Component {
  static navigationOptions = {
    header: () => { }
  }

  renderRow(item) {
    const { available } = this.props;
    const firstHour = available[item];
    const firstHalfHour = available[timeRangesSecondary[item][0]];
    const twoHour = available[timeRangesSecondary[item][1]];
    const twoHalfHour = available[timeRangesSecondary[item][2]];
    const first = firstHour !== undefined ? firstHour : [];
    const second = second !== undefined ? firstHalfHour : [];
    const third = twoHour !== undefined ? twoHour : [];
    const fourth = twoHalfHour !== undefined ? twoHalfHour : [];
    const total = first.concat(second, third, fourth);
    if (total.length > 0) {
      return (
        <TimeRangeCard
          title={item}
          available={total}
          hour={first.concat(third)}
          half={second.concat(fourth)}
        />
      );
    }
    return null;
  }

  render() {
    const titles = Object.keys(timeRanges);
    const { listOfRooms } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={titles}
          extraData={listOfRooms}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default StudyRoomsPreview;
