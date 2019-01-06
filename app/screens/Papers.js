import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import TestsList from '../components/TestsList'
import {connect} from 'react-redux';
import ViewContainer from '../components/ViewContainer'
import { changeCategory, storeResources} from '../Actions/actions';

class Papers extends Component {

  static navigationOptions = {
    header: () => {
        visible : false 
    },
    transitionConfig : () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),
  };
  constructor(props) {
    super(props)
    this.state = {
      Class : ' '
    }
  }

  processPosts(e) {
    var i;
    var PapersResources = [];
    for (i =0; i<e.length; i++) {
          if ( e[i].type == 'Papers' ){
            PapersResources.push(e[i]);
          }
    }
    return PapersResources
  }

  render() {
    const { resources } = this.props;
    return (
      <ViewContainer>
       {resources.length == 0 ? <Text style= {{top: '24%', zIndex: 10, position: 'absolute', width:'100%'}}> Search for classes! </Text> :
         <TestsList data={this.processPosts(resources)}/>
        }
        </ViewContainer>
        
    )
  }

}
const mapStateToProps = state => {
  return {
    category: state.resources.category,
    class: state.resources.class,
    resources: state.resources.resources
  }
}

export default connect(mapStateToProps)(Papers)