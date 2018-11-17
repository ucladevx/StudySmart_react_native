import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import { withNavigation } from 'react-navigation';
import MainFeed from '../screens/MainFeed';

class MainTopBar extends Component {
    constructor(props) {
        super(props)
        const page = this.props.navigation.getParam('categorySelected', 'MainFeed');
        this.state = {
          categorySelected: page
        }
      }

render () { 
  const { navigate } = this.props.navigation;
   return ( 
<View style={styles.topBar}>
<View style={styles.buttonsContainer}> 
<TouchableOpacity
style = {this.state.categorySelected == 'MainFeed' ? styles.categorySelected: styles.category}>
    <Button 
      onPress = {() =>
        navigate('MainFeed',{categorySelected:'MainFeed'})
      }
      title = "Main"
      color = "white"
      />
  </TouchableOpacity>
<TouchableOpacity
style = {this.state.categorySelected == 'Tests' ? styles.categorySelected: styles.category}>
    <Button
      onPress = {() =>
        navigate('Tests',{categorySelected:'Tests'})
      }
      title = "Tests"
      color = "white"
      />
  </TouchableOpacity>
  <TouchableOpacity
  style = {this.state.categorySelected == 'Notes' ? styles.categorySelected: styles.category}>
    <Button
      onPress = {() => 
        navigate('Notes',{categorySelected:'Notes'})
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
        height: '8%', 
        alignItems: 'center',
        backgroundColor: 'transparent',
        
      },
      buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      category: {
        backgroundColor: '#CAC9C8',
        borderRadius: 25,
        marginLeft: 4,
        marginRight: 4, 
        width: 80,
        marginTop: 8,
        marginBottom: -6,
      },
      categorySelected: {
        backgroundColor: '#0539C4',
        borderRadius: 25,
        marginLeft: 4,
        marginRight: 4, 
        width: 80,
        marginTop: 8,
        marginBottom: -6,
      }
    

 })

 export default withNavigation(MainTopBar);