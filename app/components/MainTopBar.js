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
        this.setTest= this.setTest.bind(this)
        this.setProfessor= this.setProfessor.bind(this)
      //  this.availableProfessors= this.availableProfessors.bind(this)
        this.showResults= this.showResults.bind(this)
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
          visible : true 
        })
       }
       showResults() {
        this.setState({
          visible: false
        })
      }

render () { 
   return ( 
  <View style={styles.topBar}>
    <View
    style={{flex:1,height:50, marginBotton: 5, marginTop: 5}}>
    <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({item}) =>{ return this._renderRow(item) }}
        keyExtractor={(item, index) => index.toString()}
    />
    </View>
    <View
    style={styles.right}>
      <TouchableOpacity
      style = {styles.sort}
      onPress = { () =>  this.showSorter() }> 
     <Text> Sort </Text> 
     </TouchableOpacity>
     {this.state.visible ?  <Sorter
          setTest={this.setTest}
          setProfessor={this.setProfessor}
          availableProfessors={this.availableProfessors()}
          showResults={this.showResults}
          /> : null }
    </View>
 </View>
   )}

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

  availableProfessors(){
    //API call here to fill 
    var array = [] 
    return Professors
  }

}

const category = {
  borderRadius: 15,
  backgroundColor: "#e0e0e0",
  marginLeft: 4,
  marginRight: 4, 
  width: 80,
  marginTop: 10,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center'
}
const text = {
  fontFamily: "System",
  fontSize: 14,
  fontWeight: "500",
  fontStyle: "normal",
  letterSpacing: 1.92,
  color: '#9B9B9B'
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
        flex: 0
      },
      buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      category,
      categorySelected: {
        ...category,
        backgroundColor: '#4F87EC',
      },
      text, 
      textSelected: {
        ...text,
        color: 'white'
      },
      boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    container_text: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 12,
      justifyContent: 'center',

  },
  sort: {
    borderRadius: 15,
    backgroundColor: '#4F87EC',
    height: 25,
    justifyContent: 'center',
    marginLeft: '85%',
    flex: 1
  },
  right: {
    flexDirection: 'row'
  }

 })

 export default withNavigation(MainTopBar);