import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import DropdownMenu from 'react-native-dropdown-menu'
import MainTopBar from '../components/MainTopBar'
//sample data for Dropdown Menu 
var data = [["Class","CS31", "CS32", "CS33", "CS111"], ["Professor","Smallberg", "Eggert"], ["Term","Fall", "Spring"], ["Year","2017", "2018"], ["Test", "Midterm 1", "Midterm 2", "Final"]];
export default class Tests extends Component {
  static navigationOptions = {
    title: 'Tests',
    headerStyle: {
      backgroundColor: '#1DB8F0'
    }
  };
  constructor(props) {
    super(props)
    this.state = {
      text: 'Nothing',
      Class: '',
      Professor: '',
      Term: '',
      Year: '',
      Test: '', 
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ViewContainer>
        <MainTopBar/>
        <DropdownMenu
          style={{flex: 1}}
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'blue'}
          handler={(selection, row) => this.handleSelection(selection,row)}
          data={data} >
          <View style= {styles.container}>
            <Text>
              {this.state.text}
            </Text>
          </View>
        </DropdownMenu>
        <TouchableOpacity>
               <Button
                   onPress = {() =>
                   this.handleFinish()
                    }
                  title = "Search"
                  color = "green"/>
              </TouchableOpacity>
      </ViewContainer>
    )
  }
  handleSelection(selection,row){
    const name = data[selection][0]
    val = ''
    if (row != 0) {
     val = data[selection][row]
    }
   
      if (name == "Class")
        this.setState({Class: val})
      if (name == "Professor")
        this.setState({Professor: val})
      if (name == "Term")
        this.setState({Term: val})
      if (name == "Year")
        this.setState({Year: val})
      if (name == "Test")
        this.setState({Test: val})
    

  }
  handleFinish() {
    if(this.state.Test.length >0 && this.state.Class.length >0 &&this.state.Professor.length >0&&this.state.Term.length >0&&this.state.Year.length >0){
      this.setState({text: "All fields completed. Will now search."})
    } else {
      this.setState({text: "Not all fields completed."})
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});

module.exports = Tests