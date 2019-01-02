import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import Ionicon from 'react-native-vector-icons/Ionicons'
import {withNavigation, NavigationActions} from 'react-navigation'
class SelectedTest extends Component {
  static navigationOptions =  ({navigation}) => ({
    tabBarVisible: false,
    title: 'Your Test',
    headerStyle: {
      backgroundColor: '#4F87EC'
    },
    headerLeft: (
      <TouchableOpacity
        style={{marginLeft: 5}}
        onPress= {() => navigation.state.params.handleBack()}
      >
      <Ionicon name ='ios-arrow-back' color = 'white' size={25} />
      </TouchableOpacity>
    )
  });
  constructor(props) {
    super(props)
    this.test = this.props.navigation.getParam('test', 'lol');
    this.goBack = this.goBack.bind(this);
  }
  componentDidMount () {
    this.props.navigation.setParams({ handleBack: this.goBack })
  }
  goBack() {
    this.props.navigation.navigate('Tests', {categorySelected: 'Tests',} )
  }
  render() {
    const { test } = this.props;
    return (
      <ViewContainer>
        <Text>
         {this.test.courseName}
        </Text>
      </ViewContainer>
    )
  }

}

export default withNavigation(SelectedTest)