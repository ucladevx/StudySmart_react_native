'use strict'
import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity, StyleSheet, FlatList, SectionList, Image, Alert, Button} from 'react-native'
import { ListItem } from 'react-native-elements';
import LocationsDetailed from '../screens/LocationsDetailed';
import GlobalSearchBar from '../components/GlobalSearchBar';
import { StackNavigator } from 'react-navigation';

const Library_Data = [
    {Name: "Arts", Activity_Level: 4, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
    {Name: "Powell", Activity_Level: 95, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
    {Name: "Charles E Young Research", Activity_Level: 88, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
    {Name: "Science and Engineering (Boelter Location)", Activity_Level: 62, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
    {Name: "Law", Activity_Level: 12, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
  ]
  
  const StudyRoom_Data = [
    {Name: "Rieber", Activity_Level: 4, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
    {Name: "Hedrick", Activity_Level: 95, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
    {Name: "Hedrick Study", Activity_Level: 88, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
    {Name: "Sproul", Activity_Level: 62, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
  ]
  
  const InterestingLocations_Data = [
    {Name: "Boelter Roof", Activity_Level: 1, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
    {Name: "Botanical Gardens", Activity_Level: 7, Image_URI: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
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
                            source={{uri: item.Image_URI}}
                            />
                            <Text style={styles.Name}>{item.Name}</Text>
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

