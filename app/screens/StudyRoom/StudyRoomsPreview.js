import React, { Component } from 'react';
import {
  Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList
} from 'react-native';
import StudyRoomsContainer from './StudyRoomsContainer';
import TimeRangeCard from '../../components/TimeRangeCard';


const timeRanges = {
  '12:00AM-1:00AM': [0, 1],
  '1:00AM-2:00AM': [1, 2],
  '2:00AM-3:00AM': [2, 3],
  '3:00AM-4:00AM': [3, 4],
  '4:00AM-5:00AM': [4, 5],
  '5:00AM-6:00AM': [5, 6],
  '6:00AM-7:00AM': [6, 7],
  '7:00AM-8:00AM': [7, 8],
  '8:00AM-9:00AM': [8, 9],
  '9:00AM-10:00AM': [9, 10],
  '10:00AM-11:00AM': [10, 11],
  '11:00AM-12:00PM': [11, 12],
  '12:00PM-1:00PM': [12, 13],
  '1:00PM-2:00PM': [13, 14],
  '2:00PM-3:00PM': [14, 15],
  '3:00PM-4:00PM': [15, 16],
  '4:00PM-5:00PM': [16, 17],
  '5:00PM-6:00PM': [17, 18],
  '6:00PM-7:00PM': [18, 19],
  '7:00PM-8:00PM': [19, 20],
  '8:00PM-9:00PM': [20, 21],
  '9:00PM-10:00PM': [21, 22],
  '10:00PM-11:00PM': [22, 23],
  '11:00PM-12:00AM': [23, 0],
};

export default class StudyRoomsPreview extends Component {
    static navigationOptions = {
      header: () => { }
    }

    renderRow = item => <TimeRangeCard title={item} />

    render() {
      const titles = Object.keys(timeRanges);
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={titles}
            extraData={titles}
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
