import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import {SearchBar} from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import MainFeed from '../screens/MainFeed';

class MainTopBar extends Component {
    constructor(props) {
        super(props)
       
      }
render () { 
   return ( 
<View style={styles.topBar}>
<SearchBar
placeholder='Search                                         '
inputStyle={{backgroundColor: 'white'}}
containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}} />
<View style = {styles.buttonsContainer}> 
<TouchableOpacity>
    <Button
      onPress = {() =>
        this.props.navigation.navigate('MainFeed')
      }
      title = "Main"
      color = "white"
      />
  </TouchableOpacity>
<TouchableOpacity>
    <Button
      onPress = {() =>
        this.props.navigation.navigate('Tests')
      }
      title = "Tests"
      color = "white"
      />
  </TouchableOpacity>
  <TouchableOpacity>
    <Button
      onPress = {() => 
        this.props.navigation.navigate('Notes')
      }
      title = "Notes"
      color = "white"
      />
  </TouchableOpacity>
  
  </View>
 </View>
   )}
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
    

 })

 export default withNavigation(MainTopBar);