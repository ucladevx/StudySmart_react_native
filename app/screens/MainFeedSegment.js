import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import MainFeedList from '../components/MainFeedList'
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';
class MainFeedSegment extends Component {
shouldComponentUpdate(nextProps) {
    if (this.props.processPosts === nextProps) {
        return false
    } else
    return true 
}
render() {
    return(
        <View style = {styles.container}>
        <View style = {[styles.createClass,styles.boxWithShadow]}>
        <Text style={styles.title_text}>
                Create Your Classes
                </Text>
        <TouchableOpacity
         style= {styles.button}
        onPress = { () => console.log('hey')}
        > 
            <MaterialCommunityIcon color = 'gray' name="pencil" size={30}/>
       </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title_text}>
                CS31
                </Text>
        <MainFeedList
        data={this.props.loadMain}
        />
          <Text style={styles.title_text}>
                CS32
                </Text>
        <MainFeedList
         data={this.props.loadMain}
        />
        </View>
       </View>
    )
}


    
}
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    title_text: {
      fontFamily: "System",
      fontSize: 24,
      fontWeight: "500",
      fontStyle: "normal",
      letterSpacing: 1.52,
      color: "#4a4a4a",
      marginLeft: 16,
      marginTop: 16,
    }, 
    boxWithShadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 1,  
      elevation: 5,
  },
  createClass: {
    zIndex: 10,
    width : '100%',
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  button : {
  marginTop: 15,
   marginLeft: 40
  }
  });

  export default withNavigation(MainFeedSegment)