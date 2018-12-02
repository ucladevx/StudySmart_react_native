import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import ViewContainer from './ViewContainer'
import { withNavigation } from 'react-navigation';

const categories = [{name:'Main'}, {name:'Tests'} , {name:'Notes'},{name:'Guides'},{name: 'Papers'}]
class MainTopBar extends Component {
    constructor(props) {
        super(props)
        const page = this.props.navigation.getParam('categorySelected', 'Main');
        this.state = {
          categorySelected: page
        }

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
 </View>
   )}
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
        height: '10%', 
        alignItems: 'center',
        backgroundColor: 'transparent',
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
    }
    

 })

 export default withNavigation(MainTopBar);