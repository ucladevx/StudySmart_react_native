import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity, TouchableWithoutFeedback, Modal} from 'react-native';
import ViewContainer from './ViewContainer'
import { withNavigation } from 'react-navigation';
import Sorter from './Sorter'
import Ionicon from 'react-native-vector-icons/Ionicons';
const categories = [{name:'Main'}, {name:'Tests'} , {name:'Notes'},{name:'Guides'},{name: 'Papers'}]
const Professors = [{name:'Smallberg'}, {name:'Potkonjak'}, {name: 'Liu'} ]
import { changeCategory } from '../Actions/actions';
import {connect} from 'react-redux';
export class MainTopBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
          categorySelected: 'Main',
          visible: false,
          test: ' ',
          professor: ' ',
        }
        this.showResults= this.showResults.bind(this)
      }

      _renderRow(item) {
        var selected = this.props.category;
        if (selected == ' ') {
          selected= 'Main'
        }
        return (
          <TouchableWithoutFeedback
          onPress={() => this.handleSelectCategory(item.name)}>
          <View style = {selected == item.name ? styles.categorySelected : styles.category}>
          <Text
          style = {selected == item.name ? styles.textSelected : styles.text}>
          {item.name}
          </Text>
          </View>
        </TouchableWithoutFeedback>
        )
      }
      handleSelectCategory(item){
        this.props.navigation.navigate(item)
        this.props.changeCategory(item)
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

        this.props.processPosts(this.props.class)
      }

render () { 
   return ( 
  <View style={styles.topBar}>
    <View
    style={{ height: '85%', width:'100%', marginTop: 10,}}>
    <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={categories}
        extraData={this.props.category}
        renderItem={({item}) =>{ return this._renderRow(item) }}
        keyExtractor={(item, index) => index.toString()}
    />
    </View>
    {this.props.category == 'Main' ? null : <View
    style={styles.right}>
      <TouchableOpacity
      style = {[styles.sort, styles.boxWithShadow]}
      onPress = { () =>  this.showSorter() }> 
     <Text style= {styles.sort_text}> Sort </Text> 
     <Ionicon color ="white"name="ios-arrow-back" size={15} backgroundColor="#4F87EC">
                </Ionicon>
     </TouchableOpacity>
     {this.state.visible ?  <Sorter
          availableProfessors={this.availableProfessors()}
          showResults={this.showResults}
          /> : null }
    </View> }
 </View>
   )}

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
  marginTop: 10,
  height: 35,
  justifyContent: 'center',
  alignItems: 'center',
  width: 85
}
const text = {
  fontFamily: "System",
  fontSize: 14,
  fontWeight: "500",
  fontStyle: "normal",
  letterSpacing: 1.92,
  color: '#9B9B9B',
}

 const styles = StyleSheet.create({
      topBar: {
        width: '100%',
        height: '48%', 
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginBottom: 20,
        flex: 0,
        zIndex: 15,
        position: 'absolute',
        top: '70%',
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
    borderRadius: 8,
    backgroundColor: '#4F87EC',
    height: '110%',
    width: '20%',
    marginLeft: '78%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
  },
  sort_text: {
    ...text,
    letterSpacing: 1.54,
    color: 'white',
  },
  right: {
    flexDirection: 'row',
    marginTop: 10
  }

 })

 const mapStateToProps = state => {
  return {
    category: state.resources.category,
    class: state.resources.class
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCategory: (category) =>{
      dispatch(changeCategory(category))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTopBar)