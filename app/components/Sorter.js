import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Dimensions, Modal} from 'react-native';
import MainTopBar from '../components/MainTopBar'
import ViewContainer from '../components/ViewContainer'
import GlobalSearchBar from '../components/GlobalSearchBar'; 
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class Sorter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedType: ' ',
            selectedProf: ' ',
        }
    }

  _renderProfessors(item) {
    return (
   <TouchableOpacity
   style={styles.professor_cell}
   onPress = { () => this.setProfessor(item.name)}
   > 
     <Text style = { this.state.selectedProf == item.name ? styles.category_textSelected : styles.category_text}> {item.name} </Text> 
     </TouchableOpacity>
    )
}

setTest(e) {
    this.setState({
        selectedType: e
    })
    this.props.setTest(e)
}
setProfessor(e) {
    this.setState({
        selectedProf: e
    })
    this.props.setProfessor(e)
}
    render() {
    return (
    <Modal 
        animationType="fade"
        style={styles.modal}
        transparent={true}
    >
        <View style={[styles.modalContainer, styles.boxWithShadow]}>
        <Text style = {styles.sort_text}> Sort </Text>
        <View style={styles.divider}/>
        <View style ={styles.left_text} >
        <Text style ={styles.title_text}> Exams </Text>
        <View style ={styles.container_row}>
        <View style ={styles.container_column}>
        <TouchableOpacity
        style = {styles.container_row}
        onPress = { () => this.setTest('Midterm 1')}
        > 
            <MaterialCommunityIcon color = {this.state.selectedType == 'Midterm 1' ?  '#4F87EC' : 'gray'} name="circle-slice-8" size={25} backgroundColor="#4F87EC"> </MaterialCommunityIcon>
            <Text style = {this.state.selectedType == 'Midterm 1' ?  styles.category_textSelected : styles.category_text}> Midterm 1 </Text> 
       </TouchableOpacity>
       <TouchableOpacity
        style = {styles.container_row}
        onPress = { () => this.setTest('Quiz')}
        > 
        <MaterialCommunityIcon color = {this.state.selectedType == 'Quiz' ? '#4F87EC' : 'gray'} name="circle-slice-8" size={25} backgroundColor="#4F87EC"> </MaterialCommunityIcon>
            <Text style = {this.state.selectedType == 'Quiz' ?  styles.category_textSelected : styles.category_text}> Quiz </Text> 
       </TouchableOpacity>
         </View>
         <View style ={[styles.container_column, {marginLeft: '10%'}]}>
         <TouchableOpacity
        style = {[styles.container_row]}
        onPress = { () => this.setTest('Midterm 2')}
        > 
        <MaterialCommunityIcon color = {this.state.selectedType == 'Midterm 2' ? '#4F87EC' : 'gray'}name="circle-slice-8" size={25} backgroundColor="#4F87EC"> </MaterialCommunityIcon>
            <Text style = {this.state.selectedType == 'Midterm 2' ?  styles.category_textSelected : styles.category_text}> Midterm 2 </Text> 
       </TouchableOpacity>
       <TouchableOpacity
        style = {styles.container_row}
        onPress = { () => this.setTest('Final')}
        > 
        <MaterialCommunityIcon color = {this.state.selectedType == 'Final' ? '#4F87EC' : 'gray'}name="circle-slice-8" size={25} backgroundColor="#4F87EC"> </MaterialCommunityIcon>
             <Text style = {this.state.selectedType == 'Final' ?  styles.category_textSelected : styles.category_text}> Final </Text> 
       </TouchableOpacity>
       </View>
       </View>
            <Text style ={styles.title_text}> Professors </Text>
       <FlatList
                    data={this.props.availableProfessors}
                    extraData={this.state}
                    renderItem={({item}) =>{return this._renderProfessors(item) }}
                    keyExtractor={(item, index) => index.toString()}
        />
         </View>
         <View style={styles.divider}/>
           <TouchableOpacity
            onPress = { () => this.props.showResults()}
            > 
       <Text style ={styles.title_text}> Show Results </Text> 
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
        flex: 0,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      container_row: {
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 5,
        alignItems: 'center',
      },
      container_left: {
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
      },
      divider: {
        height: 2,
        backgroundColor: '#e0e0e0',
        width: '95%',
        marginTop: 5,
        marginBottom: 5
      },
  big_text: {
      fontSize: 16,
      color: '#000',
      marginLeft: 5,
      marginRight: 5
  },
  container_column: {
      flexDirection: 'column',
      flex: 0,
      width: '40%',
      height: '100%',
      marginLeft: 5,

  },
  sort_text: {
    fontFamily: "System",
    fontSize: 30,
    fontWeight: "700",
    fontStyle: "normal",
    letterSpacing: 1.92,
    color:  "#4a4a4a",
    marginTop: 5,
  }, 
  title_text: {
    fontFamily: "System",
        fontSize: 20,
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 1.92,
        color:  "#4a4a4a",
        padding: 5
  },
  category_text: {
        fontFamily: "System",
            fontSize: 18,
            fontWeight: "500",
            fontStyle: "normal",
            letterSpacing: 1.92,
            color:  "gray",
  },
  category_textSelected: {
    fontFamily: "System",
        fontSize: 18,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 1.92,
        color:  '#4F87EC',
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
  professor_cell: {
      alignItems: 'center',
      padding: 5
  }
});
export default Sorter;