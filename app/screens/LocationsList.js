'use strict'
import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity, StyleSheet, Alert, SectionList, Image, Button} from 'react-native'
import { ListItem } from 'react-native-elements';
import LocationsDetailed from './LocationsDetailed';
import { StackNavigator } from 'react-navigation';

const Library_Data = [
    {Name: "Arts", Activity_Level: 4, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.07432", Longitude: "-118.4413624", MondayOpen: 8, MondayClosed: 23, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Powell", Activity_Level: 95, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.071613", Longitude: "-118.442181", MondayOpen: -1, MondayClosed: -1, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Charles E Young Research", Activity_Level: 88, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.074969", Longitude: "-118.441466", MondayOpen: 4, MondayClosed: 19, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Science and Engineering - Boelter", Activity_Level: 62, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.068987", Longitude: "-118.442659", MondayOpen: 8, MondayClosed: 10, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Law", Activity_Level: 12, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0729138", Longitude: "-118.4384435", MondayOpen: 0, MondayClosed: 0, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
  ]
  
  const StudyRoom_Data = [
    {Name: "Rieber", Activity_Level: 4, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0716799", Longitude: "-118.4536875", MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Hedrick", Activity_Level: 95, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0731836", Longitude: "-118.4545039", MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Hedrick Study", Activity_Level: 88, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0730785", Longitude: "-118.4542834", MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Sproul", Activity_Level: 62, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0724491", Longitude: "-118.4523096", MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
  ]
  
  const InterestingLocations_Data = [
    {Name: "Boelter Roof", Activity_Level: 1, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0692143", Longitude: "-118.445385", MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Botanical Gardens", Activity_Level: 7, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.066584", Longitude: "-118.4437107", MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
  ]
  
  let Locations_Data = {Libraries: Library_Data, StudyRooms: StudyRoom_Data, InterestingLocations: InterestingLocations_Data}

    export default class LocationsList extends Component {
        constructor(props){
          super(props);
          this.data = Locations_Data;
          
        }

    // static navigation options
    // customizes the header for the nav bar for the Locations 

      render() {
        const {navigate} = this.props.navigation;
        
        // Gets the day of the week 
        var options = { weekday: 'long'};
        const current = new Date();
        var hour_only = current.getHours();
        var prnDt = current.toLocaleTimeString('en-us', options);
        var DayOfTheWeek = prnDt.substring(0, prnDt.indexOf(" "));

        // get the hour string, determine if open or not
        return (
            <View style={styles.container}> 
            {/* TEMPORARY BUTTON  -- TEMPORARY BUTTON */}
            <Button
                onPress={()=> 
                    // Navigate to the List View Detailed screen and pass in item
                    navigate('Map')
                }
                title="Switch to Map"
                color="#4F87EC"
                accessibilityLabel="Switch to Map"
            />
             {/* TEMPORARY BUTTON  -- TEMPORARY BUTTON */}
                <SectionList  
                    contentContainerStyle = {styles.scroll_style}
                    sections = {[
                        {title: "Libraries", data: this.data.Libraries},
                        {title: "Study Rooms", data: this.data.StudyRooms},
                        {title: "Interesting Locations", data: this.data.InterestingLocations}
                    ]}
                    renderSectionHeader={ ({section}) => <Text style={styles.Section_Header}>{section.title}</Text> }
                    renderItem={ ({item}) =>  
                    <TouchableOpacity onPress ={() => {
                        navigate('Detailed', { item: item })
                    }}>
                        <View style={styles.card}>
                            <Image
                            style={{width: 120, height: 90, marginBottom:15}}
                            source={{uri: item.Image_URL}}
                            />
                            <View style={styles.information}>
                                <Text style={styles.Name}>{item.Name}</Text>
                                {/* NEED TO CHANGE TO A PROGRESS BAR  */}
                                <Text style={styles.Activity_Level}>{item.Activity_Level}%</Text>  
                                <Text style={this._currentOpenorClose(item[DayOfTheWeek+"Open"], item[DayOfTheWeek+"Closed"], hour_only) === "CLOSED" ? styles.Closed : styles.Open}>{this._determineHours(item[DayOfTheWeek+"Open"], item[DayOfTheWeek+"Closed"], hour_only)}</Text>       
                            </View>
                        </View>
                    </TouchableOpacity>
                     }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
      }

      // determine if library is currently open or closed 
      _currentOpenorClose(openTime, closeTime, currentHour){
         // if not open today
         let status = "";
         if (parseInt(openTime) == -1 || parseInt(closeTime) == -1){
             status = "CLOSED"
         }
         // 24 hours
         else if (parseInt(openTime) == 0 && parseInt(closeTime) == 0){
             status =  "OPEN"
         }
         // normal
         else if (parseInt(openTime) <= currentHour && currentHour < parseInt(closeTime)){
             status =  "OPEN"
         }
         // closed
         else {
             status =  "CLOSED"
         }
         return status
      }

      // uses the open and close time of library to print the hour string
      _determineHours(openTime, closeTime, currentHour) {
          // if not open today
        let status = "";
        if (parseInt(openTime) == -1 || parseInt(closeTime) == -1){
            status = "CLOSED"
        }
        // 24 hours
        else if (parseInt(openTime) == 0 && parseInt(closeTime) == 0){
            status =  "OPEN"
        }
        // normal
        else if (parseInt(openTime) <= currentHour && currentHour < parseInt(closeTime)){
            status =  "OPEN"
        }
        // closed
        else {
            status =  "CLOSED"
        }

        let hour_string = ""
        if (openTime == 0 && closeTime == 0){
            return "OPEN: 24 Hours";
        }
        if (openTime >= 0 && openTime < 11){
            hour_string += openTime
            hour_string += " am - "
        }
        else if (openTime == -1){
            // closed for the day
            return "CLOSED TODAY"
        }
        else {
            // convert 24 hour time to 12 hour
            if (openTime > 12){
                openTime -= 12
            }
            hour_string += openTime
            hour_string += " pm - "
        }

        if (closeTime >= 0 && closeTime < 11){
            hour_string += closeTime
            hour_string += " am"
        }
        else if (closeTime == -1){
            // closed for the day
            return "CLOSED TODAY"
        }
        else {
            // convert 24 hour time to 12 hour
            if (closeTime > 12){
                closeTime -= 12
            }
            hour_string += closeTime
            hour_string += " pm"
        }

        // if closed just say closed 
        if (status === "CLOSED"){
            return "NOW CLOSED"
        }
        // return OPEN: hours
        return "OPEN: " + hour_string
      }
    }

    /* Get width of window */
    const width = Dimensions.get('window').width

    const styles = StyleSheet.create({
    container: {
        
    },
    scroll_style: {
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
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    information:{
        flexDirection: 'column',
        width: width/2-15,
    },
    Name: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },
    Closed:{
        fontSize: 13,
        color: 'red',
        textAlign: 'center'
    },
    Open: {
        fontSize: 13,
        color: 'green',
        textAlign: 'center'
    },
    Activity_Level: {
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center',
    },
  });

