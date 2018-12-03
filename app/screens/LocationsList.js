'use strict'
import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity, StyleSheet, FlatList, SectionList, Image, Button} from 'react-native'
import { ListItem } from 'react-native-elements';
import LocationsDetailed from './LocationsDetailed';
import GlobalSearchBar from '../components/GlobalSearchBar';
import { StackNavigator } from 'react-navigation';

const Library_Data = [
    {Name: "Arts", Activity_Level: 4, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.07432", Longitude: "-118.4413624"},
    {Name: "Powell", Activity_Level: 95, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.071613", Longitude: "-118.442181"},
    {Name: "Charles E Young Research", Activity_Level: 88, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.074969", Longitude: "-118.441466"},
    {Name: "Science and Engineering - Boelter", Activity_Level: 62, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.068987", Longitude: "-118.442659"},
    {Name: "Law", Activity_Level: 12, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0729138", Longitude: "-118.4384435"},
  ]
  
  const StudyRoom_Data = [
    {Name: "Rieber", Activity_Level: 4, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0716799", Longitude: "-118.4536875"},
    {Name: "Hedrick", Activity_Level: 95, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0731836", Longitude: "-118.4545039"},
    {Name: "Hedrick Study", Activity_Level: 88, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0730785", Longitude: "-118.4542834"},
    {Name: "Sproul", Activity_Level: 62, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0724491", Longitude: "-118.4523096"},
  ]
  
  const InterestingLocations_Data = [
    {Name: "Boelter Roof", Activity_Level: 1, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0692143", Longitude: "-118.445385"},
    {Name: "Botanical Gardens", Activity_Level: 7, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.066584", Longitude: "-118.4437107"},
  ]
  
  let Locations_Data = {Libraries: Library_Data, StudyRooms: StudyRoom_Data, InterestingLocations: InterestingLocations_Data}

    export default class LocationsList extends Component {
        constructor(props){
          super(props);
          this.data = Locations_Data;
          
        }

    // static navigation options

      render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}> 
                <SectionList  
                    contentContainerStyle = {styles.scroll_style}
                    sections = {[
                        {title: "Libraries", data: this.data.Libraries},
                        {title: "Study Rooms", data: this.data.StudyRooms},
                        {title: "Interesting Locations", data: this.data.InterestingLocations}
                    ]}
                    renderSectionHeader={ ({section}) => <Text style={styles.Section_Header}>{section.title}</Text> }
                    renderItem={ ({item}) =>  
                        <View style={styles.card}>
                            <Image
                            style={{width: 120, height: 90, marginBottom:15}}
                            source={{uri: item.Image_URL}}
                            />
                            <Text style={styles.Name}>{item.Name}</Text>
                                {/* NEED TO CHANGE TO A PROGRESS BAR  */}
                                <Text style={styles.Activity_Level}>{item.Activity_Level}%</Text>
                                <Button
                                onPress={()=> 
                                    // Navigate to the List View Detailed screen and pass in item
                                    navigate('Detailed', { item: item })
                                }
                                title="View Details"
                                color="#4F87EC"
                                accessibilityLabel="View more about this library"
                                />
                            </View>
                     }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
      }
    }
    
    const Navigation = StackNavigator({
        Home:{screen: LocationsList},
        Details:{ screen: LocationsDetailed},
    });

    // Add stack navigation Header styling later

    /* Get width of window */
    const width = Dimensions.get('window').width

    const styles = StyleSheet.create({
    container: {
        
    },
    scroll_style: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Section_Header: {
        fontSize: 24,
        backgroundColor: '#4F87EC',
        color: '#F5FCFF',
        padding: 5,
        textAlign: 'center',
        width: width,
    },
    card: {
        width: (width/2)-15,
        // backgroundColor: '#FFF',
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: '#F5FCFF',
    },
    Name: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },
    Activity_Level: {
        fontSize: 11,
        fontStyle: 'italic',
        textAlign: 'center',
    },
  });

