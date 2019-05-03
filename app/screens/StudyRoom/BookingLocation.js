import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import ShadowButton from '../../components/ShadowButton';
import { changeLocation } from '../../Actions/actions';

class BookingLocation extends Component {
  static navigationOptions={
    header: () => {
      false;
    }
  }

  changeLoc = (location, selected) => {
    let currentLocations = this.props.location; 
    if (!selected) {
      const index = currentLocations.indexOf(location);
      if (index > -1) {
        currentLocations.splice(location, 1);
      }
    } else if (!currentLocations.includes(location)) {
      currentLocations.push(location);
    }
    this.props.changeLocation(currentLocations);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.promptText}>Where do you want to study?</Text>
        <ShadowButton title="Any" selected changeLoc={this.changeLoc} />
        <ShadowButton title="Hill" selected={false} changeLoc={this.changeLoc} />
        <ShadowButton title="Libraries" selected={false} changeLoc={this.changeLoc} />
        <ShadowButton title="Classrooms" selected={false} changeLoc={this.changeLoc} />
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
  marginTop: '30%',
  marginBottom: '5%',
  width: '80%',
  textAlign: 'center',
};

const styles = StyleSheet.create({
  promptText,
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center'
  },
  searchButton: {
    flex: 0,
    borderWidth: 2,
    borderColor: '#108BF8',
    backgroundColor: '#108BF8',
    width: '65%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    bottom: '10%',
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
    textAlign: 'center'
  },

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
