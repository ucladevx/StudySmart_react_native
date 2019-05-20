import React, { Component } from 'react';
import {
  StyleSheet, Text, ScrollView, Image, View, Dimensions, Button, TouchableOpacity, ActivityIndicator, SafeAreaView,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import LocationHeader from '../components/LocationHeader';
// import StudyRoomHeader from '../screens/StudyRoom/StudyRoomHeader';
import LocationsList from './LocationsList';
import LocationsMap from './LocationsMap';

class LocationContainer extends Component {
  static navigationOptions = {
    header: () => {
      false;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      library_data: undefined,
      currentPage: 'List',
      initialSelectedLibrary: 'NO-LIBRARY',
      busyness_data: undefined
    };
  }

  async componentWillMount() {
    let temp;
    console.log('Requesting library info...');
    // Fetch library data from API, store inside this.library_data
    await fetch('http://studysmart-env-2.dqiv29pdi2.us-east-1.elasticbeanstalk.com/libinfo')
      .then(response => response.json())
      .then((data) => {
        console.log(data.Items);
        temp = data;
      });

    let temp2;
    await fetch('http://studysmart-env-2.dqiv29pdi2.us-east-1.elasticbeanstalk.com/busyness_graphs')
      .then(response => response.json())
      .then((data) => {
        console.log(data.Items);
        temp2 = data;
      });

    // Process activity levels - dictionary from name to name
    const libraryToBusynessTranslation = {
      'Science and Engineering Library': 'UCLA Science and Engineering Library',
      'Music Library': 'UCLA Music Library',
      'Powell Library': 'Powell Library',
      'Research Library (Charles E. Young)': 'Charles E. Young Research Library',
      'Management Library (Eugene and Maxine Rosenfeld)': 'Rosenfeld Library',
    };
    const lib_data = temp.Items;
    const busy_data = temp2.Items;

    // loop through library data items, if in dictionary, add the busyness
    for (let i = 0; i < lib_data.length; i++) {
      const item = lib_data[i];
      // This is the name from the library_data API
      const libraryName = item.name.S;
      // Found a valid translation, valid busyness data
      if (libraryName in libraryToBusynessTranslation) {
        // Get the name translation
        const busyName = libraryToBusynessTranslation[libraryName];
        // Find the item in API matching name
        const busyItem = busy_data.find((element) => busyName === element.name['S']);
        // Add the busyness data to the item
        const currentBusyness = busyItem.current_busyness.N;
        item.currentBusyness = `${currentBusyness  }%`;
      }
      // Not in the translation, no busyness data, append N/A.
      else {
        item.currentBusyness = 'N/A';
      }
    }

    /* Once the request is done, save library data to current state */
    this.setState({ library_data: lib_data, busyness_data: busy_data.Items });
  }

  goToMap = (library) => {
    this.setState({
      currentPage: 'Map',
      initialSelectedLibrary: library
    });
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
    const { currentPage, library_data, initialSelectedLibrary } = this.state;

    // Loading animation screen should go here
    if (library_data === undefined) {
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
      body = <LocationsList library_data={library_data} busyness_data={this.state.busyness_data} navigation={navigation} goToMap={this.goToMap} />;
    } else if (currentPage === 'Map') {
      body = <LocationsMap libraryData={library_data} busyness_data={this.state.busyness_data} navigation={navigation} initialLibrary={initialSelectedLibrary} />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <LocationHeader library_data={library_data} navigation={navigation} currentRouteKey={currentPage} onPress={() => this.handlePress()} />
        {body}
      </SafeAreaView>

    // After we get the data generate the list view and everything else
    // if (this.state.currentPage === 'List') {
    //   return (
    //     <View styles={styles.container}>
    //       <LocationHeader library_data={this.state.library_data} navigation={this.props.navigation} currentRouteKey="List"/>
    //     <LocationsList library_data={this.state.library_data} navigation={this.props.navigation}/>
    //     </View>
    //   )
    // }
    // else if (this.state.currentPage === 'Map'){
    //   console.log("In map")
    //   return (
    //     <View styles={styles.container}>
    //       <LocationHeader library_data={this.state.library_data} navigation={this.props.navigation} currentRouteKey="Map"/>
    //         <Locations library_data={this.state.library_data} navigation={this.props.navigation}/>
    //     </View>
    //   )
    // }
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
  // header: {
  //   height: 50,
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   backgroundColor: '#4F87EC',
  //   width: '100%',
  // },
});

export default withNavigation(LocationContainer);
