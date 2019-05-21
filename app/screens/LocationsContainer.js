import React, { Component } from 'react';
import {
  StyleSheet, Text, ActivityIndicator, SafeAreaView,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import LocationHeader from '../components/LocationHeader';
import LocationsList from './LocationsList';
import LocationsMap from './LocationsMap';

const libraryToBusynessTranslation = {
  'Science and Engineering Library': 'UCLA Science and Engineering Library',
  'Music Library': 'UCLA Music Library',
  'Powell Library': 'Powell Library',
  'Research Library (Charles E. Young)': 'Charles E. Young Research Library',
  'Management Library (Eugene and Maxine Rosenfeld)': 'Rosenfeld Library',
};

class LocationContainer extends Component {
  static navigationOptions = {
    header: () => {
      false;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      libraryData: undefined,
      currentPage: 'List',
      initialSelectedLibrary: 'NO-LIBRARY',
      busynessData: undefined,

      // This one NEVER changes after fetched
      fullLibraryData: undefined,
    };
  }

  async componentWillMount() {
    let temp;
    // Fetch library data from API, store inside this.libraryData
    await fetch('http://studysmart-env-2.dqiv29pdi2.us-east-1.elasticbeanstalk.com/libinfo')
      .then(response => response.json())
      .then((data) => {
        temp = data;
      });
    let temp2;
    await fetch('http://studysmart-env-2.dqiv29pdi2.us-east-1.elasticbeanstalk.com/busyness_graphs')
      .then(response => response.json())
      .then((data) => {
        temp2 = data;
      });
    // Process activity levels - dictionary from name to name

    const libData = temp.Items;
    const busyData = temp2.Items;

    // loop through library data items, if in dictionary, add the busyness
    for (let i = 0; i < libData.length; i += 1) {
      const item = libData[i];
      // This is the name from the libraryData API
      const libraryName = item.name.S;
      // Found a valid translation, valid busyness data
      if (libraryName in libraryToBusynessTranslation) {
        // Get the name translation
        const busyName = libraryToBusynessTranslation[libraryName];
        // Find the item in API matching name
        const busyItem = busyData.find(element => busyName === element.name.S);
        // Add the busyness data to the item
        const currentBusyness = busyItem.current_busyness.N;
        item.currentBusyness = `${currentBusyness}%`;
      } else { // Not in the translation, no busyness data, append N/A.
        item.currentBusyness = 'N/A';
      }
    }

    /* Once the request is done, save library data to current state */
    this.setState({
      libraryData: libData,
      busynessData: busyData.Items,
      fullLibraryData: libData,
    });
  }

  goToMap = (library) => {
    this.setState({
      currentPage: 'Map',
      initialSelectedLibrary: library
    });
  }

  // Shirly's code from GlobalSearchBar.js
  getSearchQuery = (e) => {
    this.filterData(e);
  }

  // Shirly's code from GlobalSearchBar.js
  filterData = (search) => {
    const { fullLibraryData } = this.state;
    let index; let
      value;
    const result = [];
    for (index = 0; index < fullLibraryData.length; index += 1) {
      value = fullLibraryData[index].name.S.toUpperCase();
      const currentLocation = search.toUpperCase();
      if (value.includes(currentLocation)) {
        result.push(fullLibraryData[index]);
      }
    }
    // return result;
    this.setState({ libraryData: result });
  }

  handlePress() {
    // When moving to map, make sure there is no selected marker
    this.setState({
      initialSelectedLibrary: 'NO-LIBRARY'
    });
    // Switch page types
    const { currentPage } = this.state;
    if (currentPage === 'List') {
      this.setState({ currentPage: 'Map' });
    } else if (currentPage === 'Map') {
      this.setState({ currentPage: 'List' });
    }
  }

  render() {
    const { navigation } = this.props;
    const {
      currentPage, libraryData, initialSelectedLibrary, busynessData
    } = this.state;

    // Loading animation screen should go here
    if (libraryData === undefined) {
      return (
        <SafeAreaView style={styles.loading}>
          <Text style={{ textAlign: 'center', paddingBottom: 20, }}>Attemping to fetch library data...</Text>
          <ActivityIndicator size="large" color="#4F87EC" />
        </SafeAreaView>
      );
    }

    // Choose to display list or map depending on state
    let body;
    if (currentPage === 'List') {
      body = (
        <LocationsList
          libraryData={libraryData}
          busynessData={busynessData}
          navigation={navigation}
          goToMap={this.goToMap}
        />
      );
    } else if (currentPage === 'Map') {
      body = (
        <LocationsMap
          libraryData={libraryData}
          busynessData={busynessData}
          navigation={navigation}
          initialLibrary={initialSelectedLibrary}
        />
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <LocationHeader
          libraryData={libraryData}
          navigation={navigation}
          currentRouteKey={currentPage}
          onPress={() => this.handlePress()}
          getSearchQuery={this.getSearchQuery}
        />
        {body}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  }
});

export default withNavigation(LocationContainer);
