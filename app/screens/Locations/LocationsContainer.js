import React, { Component } from 'react';
import {
  StyleSheet, Text, ActivityIndicator, SafeAreaView, TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import LocationHeader from './LocationHeader';
import LocationsList from './LocationsList';
import LocationsMap from './LocationsMap';

const hedrick = {
  name: 'The Study at Hedrick',
  location: ' 250 De Neve Dr, Los Angeles, CA 90024',
  department: {
    Study: [{
      dp_open_time: '24 hours',
      date: 'M 14'
    }, {
      dp_open_time: '24 hours',
      date: 'M 14'
    },
    {
      dp_open_time: '24 hours',
      date: 'M 14'
    },
    {
      dp_open_time: '24 hours',
      date: 'M 14'
    },
    {
      dp_open_time: '24 hours',
      date: 'M 14'
    },
    {
      dp_open_time: '24 hours',
      date: 'M 14'
    },
    {
      dp_open_time: '24 hours',
      date: 'M 14'
    }]
  }
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
    const temp = [];
    let busynessLevels;
    // Fetch library data from API, store inside this.libraryData
    await fetch('http://studysmartserver-env.bfmjpq3pm9.us-west-1.elasticbeanstalk.com/v2/libinfo/')
      .then(response => response.json())
      .then((data) => {
        Object.keys(data).forEach((key) => {
          const dict = data[key];
          dict.name = key;
          temp.push(dict);
        });
      });

    await fetch('http://studysmartserver-env.bfmjpq3pm9.us-west-1.elasticbeanstalk.com/libinfo/')
      .then(response => response.json())
      .then((data) => {
        busynessLevels = data.Items;
      });
    // Process activity levels - dictionary from name to name

    temp.push(hedrick);
    const libData = temp;
    for (let i = 0; i < libData.length; i += 1) {
      const item = libData[i];
      const libraryName = item.name;
      const fileString = libraryName.replace(/[^a-zA-Z0-9]/g, '').substring(0, 12);
      // Add image URL
      item.image = fileString;
      for (let j = 0; j < libData.length; j += 1) {
        if (busynessLevels[j].name.S === item.name) {
          item.current_busyness = busynessLevels[j].current_busyness;
        }
      }
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
      value = fullLibraryData[index].name.toUpperCase();
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
          <Text style={{ textAlign: 'center', paddingBottom: 20, }}>Attempting to fetch library data...</Text>
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
