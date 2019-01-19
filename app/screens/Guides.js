import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import TestsList from '../components/TestsList';
import ViewContainer from '../components/ViewContainer';
import { changeCategory, storeResources } from '../Actions/actions';

class Guides extends Component {
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
    const GuidesResources = [];
    for (i = 0; i < e.length; i++) {
      if (e[i].type == 'Guides') {
        GuidesResources.push(e[i]);
      }
    }
    return GuidesResources;
  }

  render() {
    const { resources } = this.props;
    return (
      <ViewContainer>
        {resources.length === 0 ? (
          <Text style={{
            top: '24%', zIndex: 10, position: 'absolute', width: '100%'
          }}
          >
            {' '}
Search for classes!
            {' '}

          </Text>
        )
          : <TestsList data={this.processPosts(resources)} />
        }
      </ViewContainer>

    );
  }
}
const mapStateToProps = state => ({
  category: state.resources.category,
  class: state.resources.class,
  resources: state.resources.resources
});

export default connect(mapStateToProps)(Guides);
