import React, { Component } from 'react';
import {
  StyleSheet, Text, ScrollView, Image, View, Dimensions, Button, TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import LocationHeader from '../components/LocationHeader';
import LocationsList from './LocationsList';
import Locations from './Locations';

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
      currentLibrary: 'NO-LIBRARY'
    };
  }

  async componentWillMount() {
    let temp;
    console.log('Requesting library info...');
    /* Fetch library data from API, store inside this.library_data */
    await fetch('http://studysmart-env-2.dqiv29pdi2.us-east-1.elasticbeanstalk.com/libinfo')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.Items);
        temp = data;
      });
    /* Once the request is done, save library data to current state */
    this.setState({ library_data: temp.Items });
  }

  goToMap = (library) => {
    this.setState({
      currentPage: 'Map',
      currentLibrary: library
    });
  }

  handlePress() {
    this.goToMap('NO-LIBRARY');
    const { currentPage } = this.state;
    if (currentPage === 'List') {
      this.setState({ currentPage: 'Map' });
    } else if (currentPage === 'Map') {
      this.setState({ currentPage: 'List' });
    }
  }

  render() {
    const { navigation } = this.props;
    const { currentPage, library_data, currentLibrary } = this.state;

    // Loading animation screen should go here
    if (library_data === undefined) {
      return (
        <Text> Attempting to get library data . . . </Text>);
    }

    // Choose to display list or map depending on state
    let body;
    if (currentPage === 'List') {
      body = <LocationsList library_data={library_data} navigation={navigation} goToMap={this.goToMap} />;
    } else if (currentPage === 'Map') {
      body = <Locations libraryData={library_data} navigation={navigation} library={currentLibrary} />;
    }

    return (
      <View style={styles.container}>
        <LocationHeader library_data={library_data} navigation={navigation} currentRouteKey={currentPage} onPress={() => this.handlePress()} />
        {body}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // header: {
  //   height: 50,
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   backgroundColor: '#4F87EC',
  //   width: '100%',
  // },
});

export default withNavigation(LocationContainer);
