import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ViewContainer from './ViewContainer';
import { IMG_TEMP, getLibraryHours } from '../screens/LocationsList';
import { withNavigation } from 'react-navigation';

class LibraryCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  handleExpandPress() {
    const { collapsed } = this.state;
    if (collapsed) {
      this.setState({ collapsed: false });
    }
    else {
      this.setState({ collapsed: true });
    }
  }

  render() {
    const { item, goToMap } = this.props;
    const { collapsed } = this.state;
    const { navigate } = this.props.navigation;
    const millis = new Date();
    const day = millis.getDay();

    let arrowIcon;

    // Card is currently collapsed 
    if (collapsed) {
      arrowIcon = <Ionicon color="black" name="ios-arrow-down" size={25} />
    }
    else {
      arrowIcon = <Ionicon color="black" name="ios-arrow-up" size={25} />
    }

    return (
      <TouchableOpacity onPress={() => {
        this.handleExpandPress()
      }}
      >
        <View style={collapsed ? listElement.card : expandedElement.card}>
          <View style={listElement.imgContainer}>
            <Image
              style={listElement.img}
              source={{ uri: IMG_TEMP }}
            />
          </View>
          <View style={listElement.information}>
            <Text style={listElement.Name}>
              {item.name.S}
            </Text>
            {/* NEED TO CHANGE TO A PROGRESS BAR, 0% IS TEMPORARY PLACEHOLER  */}
            {/* <Text style={listElement.activityLevel}>
                        0%
                    </Text> */}
            <Text style={getLibraryHours(item, day) === 'Closed' ? listElement.Closed : listElement.Open}>
              Hours: {getLibraryHours(item, day)}
            </Text>
            {/* Conditional rendering of expanded data  */}
            {!collapsed &&
              <Text>This is temporary to test the expansion. No styling yet :(</Text>
            }
            <View style={listElement.buttonRow}>
              {goToMap !== undefined && (
                <TouchableOpacity onPress={() => {
                  goToMap(item);
                  navigate('LocationsContainer');
                }}
                >
                  {/* Need to fix map logo later  */}
                  <Ionicon color="black" name="ios-locate" size={25} style={{ marginRight: 10 }} />
                </TouchableOpacity>
              )}
              {/* Check the state, if state is non-expanded use down */}

              {/* Arrow can also expand the cell  */}
              <TouchableOpacity onPress={() => {
                this.handleExpandPress();
              }}
              >
                {arrowIcon}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const { width, height } = Dimensions.get('window');
const headerHeight = 80;

const styles = StyleSheet.create({
  map: {
    backgroundColor: 'transparent',
    height: height - headerHeight,
  },
});

/* Standardized text used throughout code */
const text = {
  fontFamily: 'System',
  letterSpacing: 1.92,
};

/* Styles for individual list elements */
const listElement = StyleSheet.create({
  card: {
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    height: height / 5,
    backgroundColor: 'white',
  },
  information: { // child of card
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 2,
  },
  imgContainer: { // child of card, holds image
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  img: {
    width: height / 10,
    height: height / 10,
    borderRadius: 0,
  },
  // this styling could be better!!! contains the map icon and the arrow of card
  buttonRow: {
    flexDirection: 'row',
    marginLeft: 'auto',
    paddingRight: 25,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  Name: { // name of location
    ...text,
    fontSize: 20,
    // fontWeight: 'bold',
    color: '#000',
    paddingBottom: 10,
    paddingRight: 25,
  },
  Closed: {
    ...text,
    fontSize: 14,
    color: 'red',
  },
  Open: {
    ...text,
    fontSize: 14,
    color: 'green',
  },
  activityLevel: {
    fontSize: 14,
    color: '#5e5b59',
    paddingBottom: 3,
  },

});

const expandedElement = StyleSheet.create({
  card: {
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    height: height / 3,
    backgroundColor: 'white',
  },
});

export default withNavigation(LibraryCard);
