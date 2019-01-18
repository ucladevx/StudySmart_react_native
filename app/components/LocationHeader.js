import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Autocomplete from 'react-native-autocomplete-input';

const locationsData = [
    {Name: "Arts", Activity_Level: 4, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.07432", Longitude: "-118.4413624", MondayOpen: 8, MondayClosed: 23, TuesdayOpen: 0, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Powell", Activity_Level: 95, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.071613", Longitude: "-118.442181", MondayOpen: -1, MondayClosed: -1, TuesdayOpen: 9, TuesdayClosed: 24, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Charles E Young Research", Activity_Level: 88, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.074969", Longitude: "-118.441466", MondayOpen: 4, MondayClosed: 19, TuesdayOpen: -1, TuesdayClosed: -1, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Science and Engineering - Boelter", Activity_Level: 62, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.068987", Longitude: "-118.442659", MondayOpen: 8, MondayClosed: 10, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Law", Activity_Level: 12, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0729138", Longitude: "-118.4384435", MondayOpen: 0, MondayClosed: 0, TuesdayOpen: 0, TuesdayClosed: 0, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Rieber", Activity_Level: 4, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0716799", Longitude: "-118.4536875", MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Hedrick", Activity_Level: 95, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0731836", Longitude: "-118.4545039", MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Hedrick Study", Activity_Level: 88, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0730785", Longitude: "-118.4542834", MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Sproul", Activity_Level: 62, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0724491", Longitude: "-118.4523096", MondayOpen: 13, MondayClosed: 16, TuesdayOpen: 13, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Boelter Roof", Activity_Level: 1, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0692143", Longitude: "-118.445385", MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Botanical Gardens", Activity_Level: 7, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.066584", Longitude: "-118.4437107", MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Panda Express", Activity_Level: 1, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.0692143", Longitude: "-118.445385", MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
    {Name: "Denny's", Activity_Level: 7, Image_URL: "https://facebook.github.io/react-native/docs/assets/favicon.png", Latitude: "34.066584", Longitude: "-118.4437107", MondayOpen: 8, MondayClosed: 16, TuesdayOpen: 9, TuesdayClosed: 20, WednesdayOpen: 5, WednesdayClosed: 22, ThursdayOpen: 9, ThursdayClosed: 22, FridayOpen: 0, FridayClosed: 0, SaturdayOpen: 11, SaturdayClosed: 22, SundayOpen: 14, SundayClosed: 20},
  ]
  
  
class LocationHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Location: '',
            Result: []
        }
        this.setInputState = this.setInputState.bind(this);
        this.handleSearchSuggestions = this.handleSearchSuggestions.bind(this)
      }

      // Shirly's code from GlobalSearchBar.js
      setInputState(e){
        this.setState({ Location: e });
      }

      // Shirly's code from GlobalSearchBar.js
      handleSearchSuggestions(e) {
        const { Location } = this.state; 
        if (Location.length == 0) {
            return []
        }
        var index, value;
        var result = []; 
        for (index = 0; index < locationsData.length; ++index) {
        value = locationsData[index].Name.toUpperCase();
        var currentLocation = Location.toUpperCase();
        if (value.substring(0, Location.length) == currentLocation) {
                result.push(value)
            }
        }
        return result
      }

      render() {
        const classesData = this.handleSearchSuggestions(this.state.Location)
        const {navigate} = this.props.navigation;
        const currentRouteKey = this.props.navigation.state.routes[this.props.navigation.state.index].routeName;

        if (currentRouteKey == "List"){
            right_icon = <Ionicon color="white" name="ios-map" size={25} backgroundColor="#4F87EC">
            </Ionicon>
            right_navigate = "Map"
        }
        else if (currentRouteKey == "Map"){
            right_icon = <Ionicon color="white" name="md-list" size={25} backgroundColor="#4F87EC">
            </Ionicon>
            right_navigate = "List"
        }

        return (
            <View style = {styles.bar}>
                <TouchableOpacity style={styles.buttonLeft} onPress ={() => {
                        navigate("List")
                    }}>
                {currentRouteKey == "Detailed" && 
                <Ionicon color ="white"name="ios-arrow-back" size={25} backgroundColor="#4F87EC">
                </Ionicon>
                }
                </TouchableOpacity>   
                { (currentRouteKey == "List") && 
                // Code from Shirly
                <Autocomplete
                data = {classesData} // this should be an API call or huge list eventually 
                defaultValue={this.state.Class}
                onChangeText={(e) => this.setInputState(e)}
                containerStyle={{backgroundColor: 'white', marginTop: 20, }} 
                inputContainerStyle = {{width: 250 }}
                renderItem={item => (
                    <TouchableOpacity onPress={() => navigate('Detailed', { item: locationsData.find(x => x.Name.toUpperCase() === item) })}>
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  )}
                /> }
                { currentRouteKey != "Detailed" &&
                <TouchableOpacity style={styles.buttonRight} onPress ={() => {
                        navigate(right_navigate)
                    }}>
                {right_icon}
                </TouchableOpacity>   }
             </View>

        )



      }
      

}

const styles = StyleSheet.create({
    buttonLeft: {
        marginTop: 15,
        marginLeft:30

    },
    buttonRight: {
        marginTop: 15,
        marginRight:30

    },
    bar: {
        height: 80, 
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4F87EC', 
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }


  })
export default withNavigation(LocationHeader);