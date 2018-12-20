import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Dimensions, Modal} from 'react-native';
import MainTopBar from '../components/MainTopBar'
import ViewContainer from '../components/ViewContainer'
import GlobalSearchBar from '../components/GlobalSearchBar'; 

class Sorter extends Component {
    constructor(props) {
        super(props)
    }

  _renderProfessors(item) {
    return (
   <TouchableOpacity
   onPress = { () => this.props.setProfessor(item.name)}
   > 
     <Text> {item.name} </Text> 
     </TouchableOpacity>
    )
}
    render() {
    return (
    <Modal 
        style={styles.modal}
        transparent={true}
    >
        <View style={[styles.modalContainer, styles.boxWithShadow]}>
        <Text style = {styles.sort_text}> Sort </Text>
        <View style={styles.divider}/>
        <View style ={styles.left_text} >
        <Text style ={styles.title_text}> Exams </Text>
        <View style ={styles.container_row}>
        <TouchableOpacity
        onPress = { () => this.props.setTest('Midterm 1')}
        > 
            <Text> Midterm 1 </Text> 
       </TouchableOpacity>
       <TouchableOpacity
        onPress = { () => this.props.setTest('Midterm 2')}
        > 
            <Text> Midterm 2 </Text> 
       </TouchableOpacity>
       </View>
       <View style ={styles.container_row}>
       <TouchableOpacity
        onPress = { () => this.props.setTest('Final')}
        > 
             <Text> Final </Text> 
       </TouchableOpacity>
       <TouchableOpacity
        onPress = { () => this.props.setTest('Quiz')}
        > 
            <Text> Quiz </Text> 
       </TouchableOpacity>
       </View>
            <Text style ={styles.title_text}> Professors </Text>
       <FlatList
                    data={this.props.availableProfessors}
                    renderItem={({item}) =>{return this._renderProfessors(item) }}
                    keyExtractor={(item, index) => index.toString()}
        />
         </View>
           <TouchableOpacity
            onPress = { () => this.props.showResults()}
            > 
       <Text> Show Results </Text> 
       </TouchableOpacity>
     
                  </View>
              </Modal>
        )
    }

}

const styles = StyleSheet.create({
    modalContainer: {
        height: '70%',
        width: '90%',
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:50,
        marginLeft:20,
        marginRight: 30,
        borderRadius: 10,
        flex: 0,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      container_row: {
        flexDirection: 'row',
        marginBottom: 5,
      },
      container_left: {
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
      },
      divider: {
        height: 2,
        backgroundColor: '#e0e0e0',
        width: '95%',
        marginTop: 10,
        marginBottom: 10
      },
  big_text: {
      fontSize: 16,
      color: '#000',
      marginLeft: 5,
      marginRight: 5
  },
  container_text: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 12,
      justifyContent: 'center',

  },
  sort_text: {
    fontFamily: "System",
    fontSize: 30,
    fontWeight: "800",
    fontStyle: "normal",
    letterSpacing: 1.92,
    color:  "#4a4a4a",
  }, 
  title_text: {
    fontFamily: "System",
        fontSize: 24,
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 1.92,
        color:  "#4a4a4a",
  },
  small_text: {
      fontSize: 11,
      fontStyle: 'italic',
      marginLeft: 5,
      marginRight: 5
  },
  right_text: {
      textAlign : 'right',
      flex: 1
  },
  left_text: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: 5
},
boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
},
rounded_button: {
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    marginLeft: 4,
    marginRight: 4, 
    width: 55,
    marginTop: 5,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
export default Sorter;