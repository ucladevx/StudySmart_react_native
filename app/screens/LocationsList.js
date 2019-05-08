
import React, { Component } from 'react';
import {
  Text, View, Dimensions, TouchableOpacity, StyleSheet, SectionList, Image,
} from 'react-native';
// import LocationHeader from '../components/LocationHeader';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ViewContainer from '../components/ViewContainer';


export const IMG_TEMP = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

/* Returns "closed" if library is closed, otherwise returns the hours */
export function getLibraryHours(library, day) {
  let status = 'Closed';
  try {
    status = library.department.L[0].M.time.L[`${day}`].M.dp_open_time.S;
  } catch (err) {
    console.log(library.name, 'does not have status');
  }

  // If valid status that begins with a number, check close time
  // if (status.match(/^\d/)){
  //   // replace colon with nothing
  //   var times = status.split(' - ');
  //   if ((times.length) != 2) {
  //     return status;
  //   }
  //   var open_time = times[0];
  //   var close_time = times[1];
  //   var close_hour = close_time.match(/\d+/g);
  //   var close_ampm = close_time.match(/\D+/g);
  //   if (close_hour.length != 1 || close_ampm.length != 1){
  //     return status;
  //   }
  //   if (close_ampm == "pm"){
  //     close_24 = close_time + 12;
  //   }
  //   else {
  //     close_24 = close_time;
  //   }
  //   // Special case for 12 am and 12 pm
  //   // Special case if it closes next day (am)
  //   var d = new Date();
  //   var current_hour = d.getHours();
  //   if (current_hour >= close_24) {
  //     return "Closed";
  //   }
  //   return "Closed";
  // }
  return status;
}

export default class LocationsList extends Component {
    
  // static navigationOptions= {
  //   header: props => <LocationHeader {...props}/>,
  //   headerStyle: {
  //     backgroundColor: 'transparent'
  //   },
  //   headerTitleStyle: {
  //     fontWeight: 'bold',
  //     color: '#fff',
  //   },
  //   headerTintColor: '#fff',
  //   animationEnabled: true
  // }

  constructor(props) {
    super(props);
    this.state = {
      // library_data: undefined
    };
  }


    async componentDidMount() {
      let temp;
      console.log('Requesting library info...');

      /* Fetch library data from API, store inside this.library_data */
      await fetch('http://studysmart-env-2.dqiv29pdi2.us-east-1.elasticbeanstalk.com/libinfo')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          temp = data;
        });

      /* Once the request is done, save library data to current state */
      this.setState({ library_data: temp.Items });
    }

  //   /* Fetch library data from API, store inside this.library_data */
  //   await fetch('http://studysmart-env-2.dqiv29pdi2.us-east-1.elasticbeanstalk.com/libinfo')
  //     .then((response) => { return response.json(); })
  //     .then((data) => {
  //       console.log(data.Items);
  //       temp = data;
  //     });
    
  //   /* Once the request is done, save library data to current state */
  //   this.setState({ library_data: temp.Items });
  // }

  render() {
    const millis = new Date();
    const day = millis.getDay();

    // const { library_data } = this.state;
    const { library_data } = this.props;

    /* Rendering temporary loading screen if http request is not done yet */
    if (library_data === undefined || library_data.length === 0) {
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
                { title: 'Libraries', data: library_data },

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
                      {/* <Text style={listElement.activityLevel}>
                        0%
                    </Text> */}
                      <Text style={getLibraryHours(item, day) === 'Closed' ? listElement.Closed : listElement.Open}>
                        Hours: {getLibraryHours(item, day)}
                      </Text>
                      <View style={listElement.buttonRow}>
                        <TouchableOpacity>
                          {/* Need to fix logo later  */}
                          <Ionicon color="black" name="ios-locate" size={25} style={{marginRight: 10}}/>
                        </TouchableOpacity>
                          {/* Check the state, if state is non-expanded use down */}
                          {/* NO touchable opacity around the arrow since the whole card should trigger expansion */}
                          <Ionicon color="black" name="ios-arrow-down" size={25}/>
                          {/*Else, use down */}
                          {/* <Ionicon color="black" name="ios-arrow-up" size={25}/> */}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ViewContainer>
    );
  }
}

/* Get width of window */
const { width, height } = Dimensions.get('window');
const headerHeight = 80;

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
    zIndex: 2,
    height: height-headerHeight,
  },
  scroll_style: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    zIndex: 20,
    // TODO: NEED TO FIX THIS:
    bottom: -400,
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
    textAlign: 'center',
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
