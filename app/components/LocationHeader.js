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
      // Location: '',
      // library_data: this.props.library_data,
      currentRouteKey: this.props.currentRouteKey,
    };
    // this.setInputState = this.setInputState.bind(this);
    // this.handleSearchSuggestions = this.handleSearchSuggestions.bind(this);
  }

  // Shirly's code from GlobalSearchBar.js
  // setInputState(e) {
  // this.setState({ Location: e });
  // }

  // // Shirly's code from GlobalSearchBar.js
  // handleSearchSuggestions(e) {
  // const { Location, library_data } = this.state;
  // if (Location.length === 0 || library_data.length === 0) {
  //   return [];
  // }
  // let index; let
  //   value;
  // const result = [];

  // for (index = 0; index < library_data.length; ++index) {
  //   // fix API .name.touppercase stuff
  //   value = library_data[index].name.S.toUpperCase();
  //   const currentLocation = Location.toUpperCase();
  //   if (value.substring(0, Location.length) == currentLocation) {
  //     result.push(library_data[index]);
  //   }
  // }
  // return result;
  // }

  // handleSelection(item) {
  // const { navigate } = this.props.navigation;
  // const { library_data } = this.state;
  // // TODO: Fix api .Name.toUpperCase()
  // navigate('Detailed', { locationClicked: library_data.find(x => x.name.S.toUpperCase() === item.item.name.S.toUpperCase()) });
  // this.setState({
  //   Location: '',
  // });
  // }

  render() {
    // const locations = this.props.handleSearchSuggestions(this.state.Location);
    const locations = this.props.library_data;
    // console.log(locations)
    const { currentRouteKey } = this.state;

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.topBar}>
        <View style={styles.bar}>
          <Text style={styles.titleText}>
            {' '}
            Libraries
            {' '}
          </Text>
          <TouchableOpacity onPress={() => this.props.onPress()}>
            <Ionicon color="#108BF8" name="ios-map" size={25} backgroundColor="#4F87EC" />
          </TouchableOpacity>
        </View>
        <Search
          data={locations} // this should be an API call or huge list eventually
          defaultValue={this.state.Location}
          onChangeText={(e) => this.props.setInputState(e)}
          inputContainerStyle={styles.inputContainer}
          style={styles.searchContainer}
          renderItem={() => (
            // <TouchableOpacity onPress={() => this.props.handleSelection(item)}>
            // <Text>{item.item.name.S}</Text>
            // </TouchableOpacity>
            <TouchableOpacity onPress={() => null} />
          )}
        />
      </View>
    );
  }
}

const text = {
  fontFamily: 'System',
  letterSpacing: 1.92,
};
const titleText = {
  fontFamily: 'System',
  fontSize: 18,
  fontWeight: '300',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: '#108BF8',
  width: '80%',
  padding: 5,
  textAlign: 'center'
};

const styles = StyleSheet.create({
  titleText,
  topBar: {
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
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
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

  },
  searchContainer: {
    zIndex: 5,
    flexDirection: 'row',
    width: '95%',
    height: 35,
    marginLeft: '5%',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    zIndex: 5,
    height: 40,
    width: '95%',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0.5,
      height: 0.5
    },
    shadowRadius: 1,
    shadowOpacity: 0.8,
  },
  input: {
    ...text,
    fontSize: 14,
    fontWeight: '300',
    color: '#000',
  },


});

export default withNavigation(LocationHeader);