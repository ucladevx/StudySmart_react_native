import React, { Component } from 'react';
import {
  StyleSheet, Dimensions, View, Text, Image, TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Hours from './Hours';

const icon = require('../../assets/mapIcon.png');

const powellLibIcon = require('../../assets/Libraries/PowellLibrar.jpg');
const researchLibIcon = require('../../assets/Libraries/ResearchLibr.jpg');
const biomedLibIcon = require('../../assets/Libraries/BiomedicalLi.jpg');
const lawLibIcon = require('../../assets/Libraries/LawLibraryHu.jpg');
const musicLibIcon = require('../../assets/Libraries/MusicLibrary.jpg');
const scienceEngLibIcon = require('../../assets/Libraries/ScienceandEn.jpg');
const eastAsianLibIcon = require('../../assets/Libraries/EastAsianLib.jpg');
const southernLibIcon = require('../../assets/Libraries/SouthernRegi.jpg');
const specLibIcon = require('../../assets/Libraries/LibrarySpeci.jpg');
const managementLibIcon = require('../../assets/Libraries/ManagementLi.jpg');
const artsLibIcon = require('../../assets/Libraries/ArtsLibrary.jpg');

const libImages = {
  PowellLibrar: powellLibIcon,
  ResearchLibr: researchLibIcon,
  BiomedicalLi: biomedLibIcon,
  LawLibraryHu: lawLibIcon,
  MusicLibrary: musicLibIcon,
  ScienceandEn: scienceEngLibIcon,
  EastAsianLib: eastAsianLibIcon,
  SouthernRegi: southernLibIcon,
  LibrarySpeci: specLibIcon,
  ManagementLi: managementLibIcon,
  ArtsLibrary: artsLibIcon,
};

class LibraryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  /* Returns "closed" if library is closed, otherwise returns the hours */
  getLibraryHours = (library, day) => {
    let status = 'Closed';
    try {
      status = library.department.L[0].M.time.L[`${day}`].M.dp_open_time.S;
    } catch (err) {
      // console.log(library.name, 'does not have status');
    }
    return status;
  }

  handleExpandPress() {
    const { collapsed } = this.state;
    if (collapsed) {
      this.setState({ collapsed: false });
    } else {
      this.setState({ collapsed: true });
    }
  }

  render() {
    const {
      item, goToMap, navigation, currentPage
    } = this.props;
    const { collapsed } = this.state;
    const { navigate } = navigation;

    const millis = new Date();
    const day = millis.getDay();

    let arrowIcon;

    if (currentPage === 'Map') {
      // Inverted arrows for map page
      if (collapsed) {
        arrowIcon = <Ionicon color="black" name="ios-arrow-up" size={25} />;
      } else {
        arrowIcon = <Ionicon color="black" name="ios-arrow-down" size={25} />;
      }
    } else if (currentPage === 'List') {
      if (collapsed) {
        arrowIcon = <Ionicon color="black" name="ios-arrow-down" size={25} />;
      } else {
        arrowIcon = <Ionicon color="black" name="ios-arrow-up" size={25} />;
      }
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
                source={libImages[item.image]}
              />
            </View>
            <View style={listElement.information}>
              <Text style={listElement.name}>
                {item.name.S}
              </Text>
              {/* Special Case for when Hours are 'Closed' */}
              {
                this.getLibraryHours(item, day) === 'Closed'
                  ? (
                    <Text style={this.getLibraryHours(item, day) === 'Closed' ? listElement.closed : listElement.open}>
                      Closed
                    </Text>
                  )
                  : (
                    <Text style={this.getLibraryHours(item, day) === 'Closed' ? listElement.closed : listElement.open}>
                      Hours:
                      {' '}
                      {this.getLibraryHours(item, day)}
                    </Text>
                  )
              }

              {/* NEED TO CHANGE TO A PROGRESS BAR, THIS IS TEMPORARY PLACEHOLER  */}
              <Text style={listElement.activityLevel}>
                Activity Level:
                {' '}
                {item.currentBusyness}
              </Text>
            </View>
          </View>

          {/* Absolutely positioned bottom button row */}
          <View style={listElement.buttonRow}>
            {goToMap !== undefined && (
              <TouchableOpacity onPress={() => {
                goToMap(item);
                navigate('LocationsContainer');
              }}
              >
                {/* Need to fix map logo later  */}
                <Image source={icon} style={{ height: 20, width: 20, marginRight: 3 }} />
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

          {/* Conditional rendering of expanded data  */}
          <View>
            {!collapsed
              && <Hours item={item} getLibraryHours={this.getLibraryHours} />
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const { width, height } = Dimensions.get('window');

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
    minHeight: 150,
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
    width: height / 8,
    height: height / 8,
    borderRadius: 5,
  },
  buttonRow: {
    position: 'absolute',
    flexDirection: 'row',
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 5,
    right: 15,
  },
  name: { // name of location
    ...text,
    fontSize: 16,
    color: '#000',
    fontWeight: '300',
    paddingBottom: 10,
    paddingRight: 25,
  },
  closed: {
    ...text,
    fontSize: 10,
    color: 'red',
    fontWeight: '300',
  },
  open: {
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
    minHeight: 280,
    backgroundColor: 'white',
  },
});

export default withNavigation(LibraryCard);
