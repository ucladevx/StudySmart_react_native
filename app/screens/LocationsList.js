
import React, { Component } from 'react';
import {
  Text, View, Dimensions, StyleSheet, ActivityIndicator, FlatList,
} from 'react-native';
import LibraryCard from '../components/LibraryCard';

export const IMG_TEMP = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

/* Returns "closed" if library is closed, otherwise returns the hours */
export function getLibraryHours(library, day) {
  let status = 'Closed';
  try {
    status = library.department.L[0].M.time.L[`${day}`].M.dp_open_time.S;
  } catch (err) {
    console.log(library.name, 'does not have status');
  }
  return status;
}


export default class LocationsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { libraryData, goToMap, busynessData } = this.props;

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
          <LibraryCard item={item} goToMap={goToMap} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

/* Get width of window */
const { width, height } = Dimensions.get('window');

/* Standardized text used throughout code */
const text = {
  fontFamily: 'System',
  letterSpacing: 1.92,
};

/* Styles for general screen */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    bottom: 0,
    zIndex: 2,
    backgroundColor: 'white',
  },
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
  floatingButton: {
    position: 'absolute',
    zIndex: 20,
    // TODO: NEED TO FIX THIS:
    bottom: -400,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    ...text,
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'center',
    letterSpacing: 1.52,
    color: 'white',
    width: '80%',
    padding: 5
  },
  sectionHeader: {
    ...text,
    fontSize: 24,
    backgroundColor: '#4F87EC',
    color: '#F5FCFF',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    width,
  },
  list: {
    backgroundColor: 'white'
  }
});

/* Styles for individual list elements */
const listElement = StyleSheet.create({
  card: {
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    height: height / 5,
    backgroundColor: 'white',
  },
  information: { // child of card
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 2,
  },
  imgContainer: { // child of card, holds image
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  img: {
    width: height / 10,
    height: height / 10,
    borderRadius: 0,
  },
  buttonRow: {
    flexDirection: 'row',
    marginLeft: 'auto',
    paddingRight: 25,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  name: { // name of location
    ...text,
    fontSize: 20,
    // fontWeight: 'bold',
    color: '#000',
    paddingBottom: 10,
    paddingRight: 25,
  },
  closed: {
    ...text,
    fontSize: 14,
    color: 'red',
  },
  open: {
    ...text,
    fontSize: 14,
    color: 'green',
  },
  activityLevel: {
    fontSize: 14,
    color: '#5e5b59',
    paddingBottom: 3,
  },

});
