import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements'
import StatusBarBackground from '../components/StatusBarBackground'
import ViewContainer from '../components/ViewContainer'
import MainFeedList from '../components/MainFeedList'

// sample information for the 'posts' 
const Posts = [
  {courseName: "CS31", professor: "Smallberg", roomNumber: 3400},
  {courseName: "CS32",  professor: "Nachenberg", roomNumber: 289},
  {courseName: "CS33",  professor: "Eggert", roomNumber: 4000},  
  {courseName: "CS131", professor: "Smallberg", roomNumber: 3400},
  {courseName: "CS132",  professor: "Nachenberg", roomNumber: 289},
  {courseName: "CS133",  professor: "Eggert", roomNumber: 4000},
  {courseName: "EE 3",  professor: "Potkonjak", roomNumber: 4000},
  {courseName: "M51A",  professor: "Potkonjak", roomNumber: 4000},
  {courseName: "EE 3",  professor: "Potkonjak", roomNumber: 4000}
]


export default class MainFeed extends Component {
  // customizes the header for the nav bar for the MainFeed 
  static navigationOptions = {
    title: 'Main Feed',
    headerStyle: {
      backgroundColor: '#1DB8F0'
    }
  };
  constructor(props) {
    super(props)
   
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ViewContainer>
        <View style={styles.topBar}>
        <SearchBar
        placeholder='Search                                         '
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}} />
        <View style = {styles.buttonsContainer}> 
        <TouchableOpacity>
            <Button
              onPress = {() =>
                navigate('MainFeed')
              }
              title = "Main"
              color = "white"
              />
          </TouchableOpacity>
        <TouchableOpacity>
            <Button
              onPress = {() =>
                navigate('Tests')
              }
              title = "Tests"
              color = "white"
              />
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              onPress = {() =>
                navigate('Notes')
              }
              title = "Notes"
              color = "white"
              />
          </TouchableOpacity>
          
          </View>
         </View>
        <MainFeedList
        items={Posts}
        />
      </ViewContainer>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  topBar: {
    width: '100%',
    height: '20%', 
    alignItems: 'center',
    backgroundColor: "#1DB8F0",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

});
