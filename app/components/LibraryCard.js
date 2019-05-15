import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ViewContainer from './ViewContainer';
import { IMG_TEMP, getLibraryHours } from '../screens/LocationsList';
import Hours from "./Hours";
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
    const { item, goToMap, navigation } = this.props;
    const { collapsed } = this.state;
    const { navigate } = navigation;

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
        this.handleExpandPress();
      }}
      >
        <View style={collapsed ? listElement.card : expandedElement.card}>
          <View style={listElement.row}>
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
              {/* Special Case for when Hours are 'Closed' */}
              {
                getLibraryHours(item, day) === 'Closed'
                  ?
                  (
                    <Text style={getLibraryHours(item, day) === 'Closed' ? listElement.Closed : listElement.Open}>
                      Closed
                    </Text>
                  )
                  :
                  (
                    <Text style={getLibraryHours(item, day) === 'Closed' ? listElement.Closed : listElement.Open}>
                      Hours: {getLibraryHours(item, day)}
                    </Text>
                  )
              }

              {/* NEED TO CHANGE TO A PROGRESS BAR, THIS IS TEMPORARY PLACEHOLER  */}
              <Text style={listElement.activityLevel}>Activity Level: {item.currentBusyness}</Text>
            </View>
          </View>
          <View>
            {/* Conditional rendering of expanded data  */}
            {!collapsed &&
              <Hours item={item} />
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

// The Styling for Cards regardless of expanded or compacted
const allCards = {
  borderWidth: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#E5E5E5',
  width: width - 10,
  borderRadius: 5,
  elevation: 2,
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowOffset: {
    width: 0.5,
    height: 0.5
  },
  shadowRadius: 1,
  shadowOpacity: 0.8,
};

/* Styles for individual list elements */
const listElement = StyleSheet.create({
  card: {
    ...allCards,
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: height / 5,
    // width,
    backgroundColor: 'white',
  },
  information: { // child of card
    flexDirection: 'column',
    alignItems: 'flex-start',
    // paddingLeft: 25,
    flex: 2,
  },
  imgContainer: { // child of card, holds image
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  img: {
    width: height / 8,
    height: height / 8,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    marginLeft: 'auto',
    // paddingRight: ,
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 5,
    right: 15,
  },
  Name: { // name of location
    ...text,
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#000',
    fontWeight: '300',
    paddingBottom: 10,
    paddingRight: 25,
  },
  Closed: {
    ...text,
    fontSize: 10,
    color: 'red',
    fontWeight: '300',
  },
  Open: {
    ...text,
    fontSize: 10,
    color: 'green',
    fontWeight: '300',
  },
  activityLevel: {
    paddingTop: 3,
    fontSize: 10,
    color: '#5e5b59',
    paddingBottom: 3,
    fontWeight: '300',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const expandedElement = StyleSheet.create({
  card: {
    ...allCards,
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: height / 2.5,
    // width,
    backgroundColor: 'white',
  },
});

export default withNavigation(LibraryCard);
