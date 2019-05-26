import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Feedback from './Feedback';

const FeedbackContainer = createMaterialTopTabNavigator(
  {
    Bugs: { screen: () => <Feedback link="https://forms.gle/Wc2v4nQyqxj89oUq7" /> },
    Feedback: { screen: () => <Feedback link="https://forms.gle/khhjTShNv54Yif3B9" /> },
    Privacy: { screen: () => <Feedback link="https://app.termly.io/document/privacy-policy/022aff84-e92c-4f17-bcdc-fb43211733ba" /> },
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
