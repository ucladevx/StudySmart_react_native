import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import DropdownMenu from 'react-native-dropdown-menu';
//sample data for Dropdown Menu 
var data = [["CS31", "CS32", "CS33", "CS111"], ["Smallberg", "Eggert"], ["Fall", "Spring"]];
export default class Tests extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'Nothing'
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ViewContainer>
        <DropdownMenu
          style={{flex: 1}}
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'blue'}
          handler={(selection, row) => this.setState({text: data[selection][row]})}
          data={data} >
          <View style= {styles.container}>
            <Text>
              {this.state.text} is the chosen test
            </Text>
          </View>
        </DropdownMenu>
      </ViewContainer>
    )
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