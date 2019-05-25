import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Feedback from './Feedback';

const FeedbackContainer = createMaterialTopTabNavigator(
  {
    Bugs: { screen: () => <Feedback link="https://forms.gle/FEVruhjkQUX8ZtwY8" /> },
    Feedback: { screen: () => <Feedback link="https://forms.gle/khhjTShNv54Yif3B9" /> },
  },
  {
    swipeEnabled: true,
    tabBarOptions: {
      tabStyle: { backgroundColor: 'white' },
      activeTintColor: '#108BF8',
      inactiveTintColor: 'grey',
      style: { backgroundColor: 'white', borderTopColor: 'transparent' },
    }
  }
);

export default FeedbackContainer;
