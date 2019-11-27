import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Feedback from './Feedback';

const FeedbackContainer = createMaterialTopTabNavigator(
  {
    Bugs: { screen: () => <Feedback link="https://docs.google.com/forms/d/e/1FAIpQLSfvXDqcr7ZVeYExWY4wjNaLWOtLf5MPdpr4P9roO0YJnAYugA/viewform" /> },
    Feedback: { screen: () => <Feedback link="https://docs.google.com/forms/d/e/1FAIpQLSdHako4AkbD_xvBkLuUGnXEbYVwGKhIJ7ww_rVvBpRu6ppJSQ/viewform" /> },
    Privacy: { screen: () => <Feedback link="https://drive.google.com/open?id=1Dk2bhsjwfZ6p_PoX3WAPMvlrdnCP7ujK" /> },
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
