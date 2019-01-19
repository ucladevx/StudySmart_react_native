import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import ViewContainer from '../components/ViewContainer';
import TestsList from '../components/TestsList';

export default class Tests extends Component {
  static navigationOptions = {
    header: () => {
      false;
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),

  };

  processPosts(e) {
    let i;
    const testsResources = [];
    for (i = 0; i < e.length; i++) {
      if (e[i].type == 'Tests') {
        testsResources.push(e[i]);
      }
    }
    return testsResources;
  }

  render() {
    const classes = this.props.navigation.getParam('results', ' ');
    return (
      <ViewContainer>
        {classes === ' ' ? (
          <Text style={{
            top: '24%', zIndex: 10, position: 'absolute', width: '100%'
          }}
          >
            {' '}
Search for classes!
            {' '}

          </Text>
        )
          : (
            <TestsList
              data={this.processPosts(classes)}
            />
          )
        }
      </ViewContainer>

    );
  }
}

module.exports = Tests;
