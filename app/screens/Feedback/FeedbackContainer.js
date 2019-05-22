import { createMaterialTopTabNavigator } from 'react-navigation';
import Feedback from './Feedback';

const FeedbackContainer = createMaterialTopTabNavigator(
  {
    Form1: { screen: Feedback },
    Form2: { screen: Feedback },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
  }
);

export default FeedbackContainer;
