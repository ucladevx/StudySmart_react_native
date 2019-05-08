import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Search from './Search';

class LocationHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Location: '',
      library_data: this.props.library_data,
      currentRouteKey: this.props.currentRouteKey,
    };
    this.setInputState = this.setInputState.bind(this);
    this.handleSearchSuggestions = this.handleSearchSuggestions.bind(this);
  }

  // Shirly's code from GlobalSearchBar.js
  setInputState(e) {
    this.setState({ Location: e });
  }

  // Shirly's code from GlobalSearchBar.js
  handleSearchSuggestions(e) {
    const { Location, library_data } = this.state;
    if (Location.length === 0 || library_data.length === 0) {
      return [];
    }
    let index; let
      value;
    const result = [];

    for (index = 0; index < library_data.length; ++index) {
      // fix API .name.touppercase stuff
      value = library_data[index].name.S.toUpperCase();
      const currentLocation = Location.toUpperCase();
      if (value.substring(0, Location.length) == currentLocation) {
        result.push(library_data[index]);
      }
    }
    return result;
  }

  handleSelection(item) {
    const { navigate } = this.props.navigation;
    const { library_data } = this.state;
    // TODO: Fix api .Name.toUpperCase()
    navigate('Detailed', { locationClicked: library_data.find(x => x.name.S.toUpperCase() === item.item.name.S.toUpperCase()) });
    this.setState({
      Location: '',
    });
  }

  render() {
    const locations = this.handleSearchSuggestions(this.state.Location);
    console.log(locations)
    const { currentRouteKey } = this.state;
    // const { navigate } = this.props.navigation;
    // const currentRouteKey = this.props.navigation.state.routes[this.props.navigation.state.index].routeName;
    let right_navigate = '';
    let right_icon = '';
    if (currentRouteKey == 'List') {
      right_icon = (
        <Ionicon color="white" name="ios-map" size={25} backgroundColor="#4F87EC" />
      );
      right_navigate = 'Map';
    } else if (currentRouteKey == 'Map') {
      right_icon = (
        <Ionicon color="white" name="md-list" size={25} backgroundColor="#4F87EC" />
      );
      right_navigate = 'List';
    }
    return (
      <View style={styles.bar}>
        <View style={styles.leftView}>
          <TouchableOpacity
            style={styles.buttonLeft}
            // onPress={() => {
            //   navigate('List');
            // }}
            onPress={() => this.props.onPress()}
          >
            {currentRouteKey === 'Detailed'
                && <Ionicon color="white" name="ios-arrow-back" size={25} backgroundColor="#4F87EC" />
                }
          </TouchableOpacity>
        </View>
        { (currentRouteKey === 'List')
                // Code from Shirly
                && (
                <Search
                  data={locations} // this should be an API call or huge list eventually
                  defaultValue={this.state.Location}
                  onChangeText={e => this.setInputState(e)}
                  inputContainerStyle={styles.inputContainer}
                  style={styles.searchContainer}
                  renderItem={item => ( 
                    <TouchableOpacity onPress={() => this.handleSelection(item)}>
                      <Text>{item.item.name.S}</Text>
                    </TouchableOpacity>
                  )}
                />
                ) }
        { currentRouteKey != 'Detailed'
                && (
                  <View style={styles.rightView}>
                    <TouchableOpacity
                      style={styles.buttonRight}
                      // onPress={() => {
                      //   navigate(right_navigate);
                      // }}
                      onPress={() => this.props.onPress()}
                    >
                      {right_icon}
                    </TouchableOpacity>
                  </View>
                ) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonLeft: {
    marginLeft: 15
  },
  buttonRight: {
    marginRight: 15
  },
  rightView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 40
  },
  leftView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 40
  },
  bar: {
    // height: 80,
    // paddingTop: 10,
    // backgroundColor: '#4F87EC',
    // flex: 1,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // flexDirection: 'row',
    // width: '100%',
    height: 80,
    paddingTop: 10,
    backgroundColor: '#4F87EC',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  searchContainer: {
    flex: 1,
    zIndex: 5,
    marginLeft: '5%'
  },
  inputContainer: {
    width: 250,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1
  }


});
export default withNavigation(LocationHeader);
