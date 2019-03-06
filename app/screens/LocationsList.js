
import React, { Component } from 'react';
import {
  Text, View, Dimensions, TouchableOpacity, StyleSheet, SectionList, Image,
} from 'react-native';
import LocationHeader from '../components/LocationHeader';
import ViewContainer from '../components/ViewContainer';

export var IMG_TEMP = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

/* Returns "closed" if library is closed, otherwise returns the hours */
export function _getHours(library, day){
  var status = "Closed";
  try{
      status = library.department.L[0].M.time.L[`${day}`].M.dp_open_time.S;
  }
  catch(err){
    console.log(library.name, "does not have status")
  }
  return status;
}

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
      this.state = {
        library_data: undefined
      };
    }

    async componentDidMount(){
      var temp;
      console.log("Requesting library info...");

      /* Fetch library data from API, store inside this.library_data */
      await fetch('http://studysmart-env-2.dqiv29pdi2.us-east-1.elasticbeanstalk.com/libinfo')
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data.Items);
          temp = data;
        });

        /* Once the request is done, save library data to current state */
        this.setState({library_data: temp.Items});
    }

    render() {
      const millis = new Date();
      const day = millis.getDay();

      /* Rendering temporary loading screen if http request is not done yet */
      if(this.state.library_data === undefined || this.state.library_data.length == 0){
        return (
            <Text> Attempting to get library data . . . </Text>
        );
      }

      return (
        <ViewContainer>
          <View style={styles.container}>
            <SectionList
              bounces={false}
              contentContainerStyle={styles.scroll_style}
              sections={[
                { title: 'Libraries', data: this.state.library_data },

              ]}
              renderSectionHeader={({ section }) => <Text style={styles.Section_Header}>{section.title}</Text>}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate('Detailed', { locationClicked: item });
                }}
                >
                  {/* Individual list elements */}
                  <View style={listElement.card}>
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
                    <Text style={listElement.activityLevel}>
                        0%
                      </Text>
                      <Text style={_getHours(item, day) === "Closed" ? listElement.Closed : listElement.Open}>
                            {_getHours(item, day)}
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
