
import React, { Component } from 'react';
import {
  Text, View, StyleSheet, ActivityIndicator, FlatList,
} from 'react-native';
import LibraryCard from '../../components/LibraryCard';

export default class LocationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { libraryData, goToMap } = this.props;

    /* Rendering temporary loading screen if http request is not done yet */
    if (libraryData === undefined) {
      return (
        <View styles={styles.loading}>
          <Text> Attempting to get library data . . . </Text>
          <ActivityIndicator size="large" color="#4F87EC" />
        </View>
      );
    }

    if (libraryData.length === 0) {
      return (
        <View styles={styles.loading}>
          <Text> No libraries to display . . . </Text>
        </View>
      );
    }

    return (
      <FlatList
        bounces={false}
        style={styles.list}
        data={libraryData}
        extraData={this.props}
        contentContainerStyle={styles.scrollStyle}
        renderItem={({ item }) => (
          <LibraryCard item={item} goToMap={goToMap} currentPage="List" />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

/* Styles for general screen */
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    backgroundColor: 'white'
  }
});
