import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import LocationShadowButton from '../../components/LocationShadowButton';
import { changeLocation } from '../../Actions/actions';

class BookingLocation extends Component {
  static navigationOptions = {
    header: () => {
      false;
    }
  }

  changeLoc = (location, selected) => {
    const currentLocations = this.props.location.slice();
    if (!selected) {
      const index = currentLocations.indexOf(location);
      if (index > -1) {
        currentLocations.splice(index, 1);
      }
    } else if (selected && !currentLocations.includes(location)) {
      currentLocations.push(location);
    }
    this.props.changeLocation(currentLocations);
  }

  isSelected = (location) => {
    const currentLocations = this.props.location;
    const index = currentLocations.indexOf(location);
    if (index > -1) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.promptText}>Where do you want to study?</Text>
        <View style={styles.centeredView}>
          <LocationShadowButton title="Anywhere" selected={this.isSelected('Anywhere')} changeLoc={this.changeLoc} />
          <LocationShadowButton title="Hill" selected={this.isSelected('Hill')} changeLoc={this.changeLoc} />
          <LocationShadowButton title="Libraries" selected={this.isSelected('Libraries')} changeLoc={this.changeLoc} />
          <LocationShadowButton title="Classrooms" selected={this.isSelected('Classrooms')} changeLoc={this.changeLoc} />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={() => this.props.navigation.navigate('BookingTime')}>
          <Text style={styles.searchText}> Next </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const promptText = {
  fontFamily: 'System',
  fontSize: 30,
  fontWeight: '200',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: '#108BF8',
  marginTop: '25%',
  marginBottom: '5%',
  width: '80%',
  textAlign: 'center'
};

const styles = StyleSheet.create({
  promptText,
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center'
  },
  searchButton: {
    borderWidth: 2,
    borderColor: '#108BF8',
    backgroundColor: '#108BF8',
    position: 'absolute',
    width: '65%',
    height: '8%',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    bottom: '8%',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },
  searchText: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: 'white',
    width: '80%',
    padding: 5,
    textAlign: 'center',
  },
  centeredView: {
    width: '100%',
    height: '56%',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  }

});
const mapStateToProps = state => ({
  location: state.study.location
});

const mapDispatchToProps = dispatch => ({
  changeLocation: (location) => {
    dispatch(changeLocation(location));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingLocation);
