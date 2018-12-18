import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Modal} from 'react-native';
import ViewContainer from './ViewContainer'
import { withNavigation } from 'react-navigation';
import Sorter from './Sorter'

const categories = [{name:'Main'}, {name:'Tests'} , {name:'Notes'},{name:'Guides'},{name: 'Papers'}]
const Professors = [{name:'Smallberg'}, {name:'Potkonjak'}, {name: 'Liu'} ]
class MainTopBar extends Component {
    constructor(props) {
        super(props)
        const page = this.props.navigation.getParam('categorySelected', 'Main');
        this.state = {
          categorySelected: page,
          visible: false,
          test: ' ',
          professor: ' ',
        }
      }

      _renderRow(item) {
        return (
          <TouchableOpacity
          onPress ={() => this.handleSelectCategory(item.name)}
          style = {this.state.categorySelected == item.name ? styles.categorySelected : styles.category}>
          <Text
          style = {this.state.categorySelected == item.name ? styles.textSelected : styles.text}>
          {item.name}
          </Text>
        </TouchableOpacity>
        )
      }
      handleSelectCategory(item){
        const { navigate } = this.props.navigation;
        navigate(item, {categorySelected: item} )
    
      }
      showSorter() {
        this.setState({
          visible:true 
        })
       }

render () { 
   return ( 
  <View style={styles.topBar}>
    <FlatList 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({item}) =>{return this._renderRow(item) }}
        keyExtractor={(item, index) => index.toString()}
    />
    <View
    style={styles.right}>
   <TouchableOpacity
   style = {styles.sort}
   onPress = { () => this.showSorter()}
   > 
     <Text> Sort </Text> 
     </TouchableOpacity>
     </View>
     <Modal 
      style={styles.modal}
      visible={this.state.visible}
      transparent={true}
      >
   <View style={[styles.modalContainer, styles.boxWithShadow]}>
   <Text style ={styles.title_text}
   > Exams </Text>
   <View style ={styles.container_row}>
    <TouchableOpacity
   onPress = { () => this.setTest('Midterm 1')}
   > 
     <Text> Midterm 1 </Text> 
     </TouchableOpacity>
     <TouchableOpacity
   onPress = { () => this.setTest('Midterm 2')}
   > 
     <Text> Midterm 2 </Text> 
     </TouchableOpacity>
     </View>
     <View style ={styles.container_row}>
     <TouchableOpacity
   onPress = { () => this.setTest('Final')}
   > 
     <Text> Final </Text> 
     </TouchableOpacity>
     <TouchableOpacity
   onPress = { () => this.setTest('Quiz')}
   > 
     <Text> Quiz </Text> 
     </TouchableOpacity>
     </View>
     <Text style ={styles.title_text}
     > Professors </Text>
     <FlatList
                  data={this.availableProfessors()}
                  renderItem={({item}) =>{return this._renderProfessors(item) }}
                  keyExtractor={(item, index) => index.toString()}
      />
         <TouchableOpacity
   onPress = { () => this.showResults()}
   > 
     <Text> Show Results </Text> 
     </TouchableOpacity>
                </View>
            </Modal>
 </View>
   )}
   _renderProfessors(item) {
     return (
    <TouchableOpacity
    onPress = { () => this.setProfessor(item.name)}
    > 
      <Text> {item.name} </Text> 
      </TouchableOpacity>
     )
   }
   setTest(e) {
     console.log(e)
     this.setState({
       test: e
     })
   }
   setProfessor(e) {
     console.log(e)
    this.setState({
      professor: e
    })
  }

  showResults() {
    this.setState({
      visible: false
    })
  }

  availableProfessors(){
    //API call here to fill 
    var array = [] 
    return Professors
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
        height: '12%', 
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginBottom: 20,
      },
      buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      category: {
        borderRadius: 15,
        backgroundColor: "#e0e0e0",
        marginLeft: 4,
        marginRight: 4, 
        width: 70,
        marginTop: 10,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
      },
      categorySelected: {
        backgroundColor: '#4F87EC',
        borderRadius: 15,
        marginLeft: 4,
        marginRight: 4, 
        width: 70,
        marginTop: 10,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
      },
      text: {
        fontFamily: "System",
        fontSize: 14,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 1.92,
        color: '#9B9B9B'
      },
      textSelected: {
        fontFamily: "System",
        fontSize: 14,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 1.92,
        color: 'white'
      },
      boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    modalContainer: {
      height: '70%',
      width: '90%',
      backgroundColor: 'white',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:50,
      marginLeft:20,
      marginRight: 30,
      borderRadius: 10,
  },
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    container_text: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 12,
      justifyContent: 'center',

  },
  container_row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  title_text: {
    fontFamily: "System",
        fontSize: 24,
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 1.92,
        color: '#9B9B9B',
  },
  sort: {
    borderRadius: 15,
    backgroundColor: '#4F87EC',
    height: 30,
    justifyContent: 'center',
    marginLeft: '85%',
    flex:1
  },
  right: {
    flex: 1,
    flexDirection: 'row'
  }

 })

 export default withNavigation(MainTopBar);