import React, { Component } from 'react';
import {
  StyleSheet, Text, ActivityIndicator, SafeAreaView, TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import LocationHeader from './LocationHeader';
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
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      libraryData: undefined,
      currentPage: 'List',
      initialSelectedLibrary: 'NO-LIBRARY',
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
    // Process activity levels - dictionary from name to name

    const libData = temp.Items;

    for (let i = 0; i < libData.length; i += 1) {
      const item = libData[i];
      // This is the name from the libraryData API
      const libraryName = item.name.S;
      const fileString = libraryName.replace(/[^a-zA-Z0-9]/g, '').substring(0, 12);
      // Add image URL
      item.image = fileString;
    }

    /* Once the request is done, save library data to current state */
    this.setState({
      libraryData: libData,
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

  handlePress = () => {
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
      currentPage, libraryData, initialSelectedLibrary,
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
          navigation={navigation}
          goToMap={this.goToMap}
        />
      );
    } else if (currentPage === 'Map') {
      body = (
        <LocationsMap
          libraryData={libraryData}
          navigation={navigation}
          initialLibrary={initialSelectedLibrary}
        />
      );
    }

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <LocationHeader
            navigation={navigation}
            onPress={this.handlePress}
            getSearchQuery={this.getSearchQuery}
            currentPage={currentPage}
          />
          {body}
        </SafeAreaView>
      </TouchableWithoutFeedback>
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