
import React, { Component } from 'react';
import {
  Text, View, Dimensions, TouchableOpacity, StyleSheet, SectionList, Image,
} from 'react-native';
import LocationHeader from '../components/LocationHeader';
import ViewContainer from '../components/ViewContainer';

const Library_Data = [
  {
    Name: 'Arts', activityLevel: 4, Image_URL: 'https://facebook.github.io/react-native/docs/assets/favicon.png', Latitude: '34.07432', Longitude: '-118.4413624', MondayOpen: 8, MondayClosed: 23, TuesdayOpen: 0, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20
  },
  {
    Name: 'Powell', activityLevel: 95, Image_URL: 'https://facebook.github.io/react-native/docs/assets/favicon.png', Latitude: '34.071613', Longitude: '-118.442181', MondayOpen: -1, MondayClosed: -1, TuesdayOpen: 9, TuesdayClosed: 24, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20
  },
  {
    Name: 'Charles E Young Research', activityLevel: 88, Image_URL: 'https://facebook.github.io/react-native/docs/assets/favicon.png', Latitude: '34.074969', Longitude: '-118.441466', MondayOpen: 4, MondayClosed: 19, TuesdayOpen: -1, TuesdayClosed: -1, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20
  },
  {
    Name: 'Science and Engineering - Boelter', activityLevel: 62, Image_URL: 'https://facebook.github.io/react-native/docs/assets/favicon.png', Latitude: '34.068987', Longitude: '-118.442659', MondayOpen: 8, MondayClosed: 10, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20
  },
  {
    Name: 'Law', activityLevel: 12, Image_URL: 'https://facebook.github.io/react-native/docs/assets/favicon.png', Latitude: '34.0729138', Longitude: '-118.4384435', MondayOpen: 0, MondayClosed: 0, TuesdayOpen: 0, TuesdayClosed: 0, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20
  },
];

const StudyRoom_Data = [
  {
    Name: 'Rieber', activityLevel: 4, Image_URL: 'https://facebook.github.io/react-native/docs/assets/favicon.png', Latitude: '34.0716799', Longitude: '-118.4536875', MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20
  },
  {
    Name: 'Hedrick', activityLevel: 95, Image_URL: 'https://facebook.github.io/react-native/docs/assets/favicon.png', Latitude: '34.0731836', Longitude: '-118.4545039', MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20
  },
  {
    Name: 'Hedrick Study', activityLevel: 88, Image_URL: 'https://facebook.github.io/react-native/docs/assets/favicon.png', Latitude: '34.0730785', Longitude: '-118.4542834', MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20
  },
  {
    Name: 'Sproul', activityLevel: 62, Image_URL: 'https://facebook.github.io/react-native/docs/assets/favicon.png', Latitude: '34.0724491', Longitude: '-118.4523096', MondayOpen: 13, MondayClosed: 16, TuesdayOpen: 13, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20
  },
];

const InterestingLocations_Data = [
  {
    Name: 'Boelter Roof', activityLevel: 1, Image_URL: 'https://facebook.github.io/react-native/docs/assets/favicon.png', Latitude: '34.0692143', Longitude: '-118.445385', MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20
  },
  {
    Name: 'Botanical Gardens', activityLevel: 7, Image_URL: 'https://facebook.github.io/react-native/docs/assets/favicon.png', Latitude: '34.066584', Longitude: '-118.4437107', MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20
  },
];

const EatingPlaces_Data = [
  {
    Name: 'Panda Express', activityLevel: 1, Image_URL: 'https://facebook.github.io/react-native/docs/assets/favicon.png', Latitude: '34.0692143', Longitude: '-118.445385', MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20
  },
  {
    Name: "Denny's", activityLevel: 7, Image_URL: 'https://facebook.github.io/react-native/docs/assets/favicon.png', Latitude: '34.066584', Longitude: '-118.4437107', MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20
  },
];

const Locations_Data = {
  Libraries: Library_Data, StudyRooms: StudyRoom_Data, InterestingLocations: InterestingLocations_Data, EatingPlaces: EatingPlaces_Data
};


export default class LocationsList extends Component {
    // static navigation options
    static navigationOptions= {
      header: props => <LocationHeader {...props} />,
      headerStyle: {
        backgroundColor: 'transparent'
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff',
      },
      headerTintColor: '#fff',
      animationEnabled: true
    }

    constructor(props) {
      super(props);
      this.data = Locations_Data;
    }

    // determine if library is currently open or closed
    _currentOpenorClose(openTime, closeTime, currentHour) {
      // if not open today
      let status = '';
      if (parseInt(openTime) == -1 || parseInt(closeTime) == -1) {
        status = 'CLOSED';
      }
      // 24 hours
      else if (parseInt(openTime) == 0 && parseInt(closeTime) == 0) {
        status = 'OPEN';
      }
      // normal
      else if (parseInt(openTime) <= currentHour && currentHour < parseInt(closeTime)) {
        status = 'OPEN';
      }
      // closed
      else {
        status = 'CLOSED';
      }
      return status;
    }

    // uses the open and close time of library to print the hour string
    _determineHours(openTime, closeTime, currentHour) {
      // if not open today
      let status = '';
      if (parseInt(openTime) == -1 || parseInt(closeTime) == -1) {
        status = 'CLOSED';
      }
      // 24 hours
      else if (parseInt(openTime) == 0 && parseInt(closeTime) == 0) {
        status = 'OPEN';
      }
      // normal
      else if (parseInt(openTime) <= currentHour && currentHour < parseInt(closeTime)) {
        status = 'OPEN';
      }
      // closed
      else {
        status = 'CLOSED';
      }

      let hour_string = '';
      if (openTime == 0 && closeTime == 0) {
        return 'OPEN: 24 Hours';
      }
      if (openTime >= 0 && openTime < 11) {
        if (openTime == 0) {
          openTime = 12;
        }
        hour_string += openTime;
        hour_string += ' am - ';
      } else if (openTime == -1) {
        // closed for the day
        return 'CLOSED TODAY';
      } else {
        // convert 24 hour time to 12 hour
        if (openTime > 12 && openTime < 24) {
          openTime -= 12;
          hour_string += openTime;
          hour_string += ' pm - ';
        } else if (openTime == 24) {
          hour_string += '12 am - ';
        }
      }

      if (closeTime >= 0 && closeTime < 11) {
        hour_string += closeTime;
        hour_string += ' am';
      } else if (closeTime == -1) {
        // closed for the day
        return 'CLOSED TODAY';
      } else {
        // convert 24 hour time to 12 hour
        if (closeTime > 12 && closeTime < 24) {
          closeTime -= 12;
          hour_string += closeTime;
          hour_string += ' pm';
        } else if (closeTime == 24) {
          hour_string += '12 am';
        }
      }

      // if closed just say closed
      if (status === 'CLOSED') {
        return 'NOW CLOSED';
      }
      // return OPEN: hours
      return `OPEN: ${hour_string}`;
    }

    render() {
      const { navigate } = this.props.navigation;

      // Gets the day of the week
      const options = { weekday: 'long' };
      const current = new Date();
      const hour_only = current.getHours();
      const prnDt = current.toLocaleTimeString('en-us', options);
      const DayOfTheWeek = prnDt.substring(0, prnDt.indexOf(' '));


      return (
        <ViewContainer>
          <View style={styles.container}>
            <SectionList
              bounces={false}
              contentContainerStyle={styles.scroll_style}
              sections={[
                { title: 'Libraries', data: this.data.Libraries },
                { title: 'Study Rooms', data: this.data.StudyRooms },
                { title: 'Interesting Locations', data: this.data.InterestingLocations },
                { title: 'Eating Places', data: this.data.EatingPlaces }
              ]}
              renderSectionHeader={({ section }) => <Text style={styles.Section_Header}>{section.title}</Text>}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                  navigate('Detailed', { item });
                }}
                >
                  {/* Individual list elements */}
                  <View style={listElement.card}>
                    <View style={listElement.imgContainer}>
                      <Image
                        style={listElement.img}
                        source={{ uri: item.Image_URL }}
                      />
                    </View>
                    <View style={listElement.information}>
                      <Text style={listElement.Name}>
                        {item.Name}
                      </Text>
                      {/* NEED TO CHANGE TO A PROGRESS BAR  */}
                      <Text style={listElement.activityLevel}>
                        {item.activityLevel}
                        %
                      </Text>
                      <Text
                        style={this._currentOpenorClose(item[`${DayOfTheWeek}Open`], item[`${DayOfTheWeek}Closed`], hour_only) === 'CLOSED' ? listElement.Closed : listElement.Open}
                      >
                        {this._determineHours(item[`${DayOfTheWeek}Open`],
                          item[`${DayOfTheWeek}Closed`], hour_only)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          {/* Study room booking button */}
          <View style={styles.floatingButton}>
            <TouchableOpacity
              style={[styles.boxWithShadow, styles.studyRoom]}
              onPress={() => navigate('Booking')}
            >
              <Text style={styles.titleText}>
                Book a study room
              </Text>
            </TouchableOpacity>
          </View>
        </ViewContainer>
      );
    }
}

/* Get width of window */
const width = Dimensions.get('window').width;


/* Standardized text used throughout code */
const text = {
  fontFamily: 'System',
  letterSpacing: 1.92,
};

/* Styles for general screen */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 2

  },
  scroll_style: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    zIndex: 20,
    bottom: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  studyRoom: {
    backgroundColor: '#4F87EC',
    height: 50,
    width: '65%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    ...text,
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 1.52,
    color: 'white',
    width: '80%',
    padding: 5
  },
  Section_Header: {
    ...text,
    fontSize: 24,
    backgroundColor: '#4F87EC',
    color: '#F5FCFF',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    width,
  },
});

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
    width: 75,
    height: 75,
    borderRadius: 75 / 2
  },
  Name: { // name of location
    ...text,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    paddingBottom: 10,
  },
  Closed: {
    ...text,
    fontSize: 10,
    color: 'red',
  },
  Open: {
    ...text,
    fontSize: 10,
    color: 'green',
  },
  activityLevel: {
    fontSize: 12,
    color: '#5e5b59',
    paddingBottom: 3,
  },

});
