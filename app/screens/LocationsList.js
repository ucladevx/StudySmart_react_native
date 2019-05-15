
import React, { Component } from 'react';
import {
  Text, View, Dimensions, TouchableOpacity, StyleSheet, SectionList, Image, ActivityIndicator, FlatList,
} from 'react-native';
// import LocationHeader from '../components/LocationHeader';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ViewContainer from '../components/ViewContainer';
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
      // library_data: undefined
    };
  }

  render() {
    const millis = new Date();
    const day = millis.getDay();

    // const { library_data } = this.state;
    const { library_data, busyness_data } = this.props;

    // // Process activity levels
    // // dictionary from name to name 
    // const libraryToBusynessTranslation = {
    //   'Science and Engineering Library': 'UCLA Science and Engineering Library',
    //   'Music Library': 'UCLA Music Library',
    //   'Powell Library': 'Powell Library',
    //   'Research Library (Charles E. Young)': 'Charles E. Young Research Library',
    //   'Management Library (Eugene and Maxine Rosenfeld)': 'Rosenfeld Library',
    // };
    // // loop through library data items, if in dictionary, add the busyness
    // for (let i = 0; i < library_data.length; i++) {
    //   let item = library_data[i];
    //   // This is the name from the library_data API
    //   let libraryName = item.name;
    //   console.log('lib_data', libraryName);
    // }
    // // console.log('Music Library' in libraryToBusynessTranslation);

    // // if not in the library to busyness then add activity level N/A

    /* Rendering temporary loading screen if http request is not done yet */
    if (library_data === undefined || library_data.length === 0) {
      return (
        <View styles={styles.container}>
          <Text> Attempting to get library data . . . </Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <FlatList
        bounces={false}
        style={styles.list}
        data={library_data}
        contentContainerStyle={styles.scroll_style}
        renderItem={({ item }) => (
          // Individual list elements 
          <LibraryCard item={item} day={day} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

/* Get width of window */
const { width, height } = Dimensions.get('window');
const headerHeight = 80;

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
  scroll_style: {
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
  Section_Header: {
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
  // this styling could be better!!! contains the map icon and the arrow of card
  buttonRow: {
    flexDirection: 'row',
    marginLeft: 'auto',
    paddingRight: 25,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  Name: { // name of location
    ...text,
    fontSize: 20,
    // fontWeight: 'bold',
    color: '#000',
    paddingBottom: 10,
    paddingRight: 25,
  },
  Closed: {
    ...text,
    fontSize: 14,
    color: 'red',
  },
  Open: {
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
