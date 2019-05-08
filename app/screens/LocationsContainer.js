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
    };
  }

  handlePress() {
    const { currentPage } = this.state;
    if (currentPage === 'List') {
      this.setState({ currentPage: 'Map' });
    } else if (currentPage === 'Map') {
      this.setState({ currentPage: 'List' });
    }
  }

  async componentDidMount() {
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


  render() {
    // Loading animation screen should go here
    if (this.state.library_data === undefined) {
      return (
        <Text> Attempting to get library data . . . </Text>);
    }

    let body;

    if (this.state.currentPage === 'List') {
      body = <LocationsList library_data={this.state.library_data} navigation={this.props.navigation} />;
    } else if (this.state.currentPage === 'Map') {
      body = <Locations library_data={this.state.library_data} navigation={this.props.navigation} />;
    }

    return (
      <View styles={styles.container}>
        <LocationHeader library_data={this.state.library_data} navigation={this.props.navigation} currentRouteKey={this.state.currentPage} onPress={() => this.handlePress()} />
        {body}
      </View>

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

/* Standardized text used throughout code */
const text = {
  fontFamily: 'System',
  letterSpacing: 1.92,
};

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
