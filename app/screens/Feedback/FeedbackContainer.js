import { createMaterialTopTabNavigator } from 'react-navigation';
import Feedback from './Feedback';
import LocationsMap from '../LocationsContainer';

const FeedbackContainer = createMaterialTopTabNavigator(
  {
    Form1: { screen: Feedback },
    Form2: { screen: LocationsMap },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
  }
);

export default FeedbackContainer;
