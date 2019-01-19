import React, { Component } from 'react';
import {
  Text, TouchableOpacity
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import ViewContainer from '../components/ViewContainer';
import { changeCategory } from '../Actions/actions';

export class SelectedTest extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    title: 'Your Test',
    headerStyle: {
      backgroundColor: '#4F87EC'
    },
    headerLeft: (
      <TouchableOpacity
        style={{ marginLeft: 10 }}
        onPress={() => navigation.state.params.handleBack()}
      >
        <Ionicon name="ios-arrow-back" color="white" size={25} />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.test = this.props.navigation.getParam('test', 'lol');
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleBack: this.goBack });
  }

  goBack() {
    this.props.navigation.navigate('Tests');
    this.props.changeCategory('Tests');
  }

  render() {
    const { test } = this.props;
    return (
      <ViewContainer>
        <Text>
          {this.test.courseName}
        </Text>
      </ViewContainer>
    );
  }
}
const mapStateToProps = state => ({
  category: state.category,
});


const mapDispatchToProps = dispatch => ({
  changeCategory: (category) => {
    dispatch(changeCategory(category));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedTest);
