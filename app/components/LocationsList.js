'use strict'
import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity, StyleSheet, FlatList, SectionList, Image, Alert, Button} from 'react-native'
import { ListItem } from 'react-native-elements';
import LocationsDetailed from '../screens/LocationsDetailed';

    export default class LocationsList extends Component {
        constructor(props){
          super(props);
          this.data = this.props.data
        }

      render() {
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
                    renderItem={ ({item}) => { return this._renderRow(item); }
                     }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

        )
      }

      _renderRow(item) {
        return (
          <View style={styles.card}>
            <Image
            style={{width: 120, height: 90, marginBottom:15}}
            source={{uri: item.Image_URI}}
            />
            <Text style={styles.Name}>{item.Name}</Text>
                <Text style={styles.Activity_Level}>{item.Activity_Level}%</Text>
                <Button
                onPress={()=> {
                    // Navigate to the List View Detailed screen and pass in item
                    Alert.alert(item.Name);
                }}
                title="View Details"
                color="#457ce9"
                accessibilityLabel="View more about this library"
            />
        </View>
        )
      }
    }
    
    /* Get width of window */
    const width = Dimensions.get('window').width

    const styles = StyleSheet.create({
    container: {
        marginTop: 50
    },
    scroll_style: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Section_Header: {
        fontSize: 24,
        backgroundColor: '#457ce9',
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

