import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Search from './Search';

const fakeVal = [];
class StudyRoomHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Location: '',
    };
    this.setInputState = this.setInputState.bind(this);
  }

  // Shirly's code from GlobalSearchBar.js
  setInputState(e) {
    this.setState({ Location: e });
  }

  // Shirly's code from GlobalSearchBar.js

  handleSelection(item) {
    const { navigate } = this.props.navigation;
    this.setState({
      Location: '',
      visible: false
    });
  }

  showSorter() {
    this.setState({
      visible: true
    });
  }

  showResults() {
    this.setState({
      visible: false
    });

    this.processSelection(this.info);
  }

  processPosts(e) {
    const { exam, professor, changeCategory, storeResources, navigation } = this.props;
    const examCheck = exam.length > 0;
    const professorCheck = professor.length > 0;
    let i;
    let searchedPosts = [];
    const upperClass = e.toUpperCase();
    for (i = 0; i < Posts.length; i++) {
      if (Posts[i].courseName.toUpperCase() === upperClass) {
        if (examCheck && professorCheck) {
          if (Posts[i].test === exam && Posts[i].professor === professor) {
            searchedPosts.push(Posts[i]);
          }
        } else if (examCheck && !professorCheck) {
          if (Posts[i].test === exam) {
            searchedPosts.push(Posts[i]);
          }
        } else if (professorCheck && !examCheck) {
          if (Posts[i].professor === professor) {
            searchedPosts.push(Posts[i]);
          }
        } else {
          searchedPosts.push(Posts[i]);
        }
      }
    }
    const navigateAction = NavigationActions.navigate({
      routeName: 'Tests',
      params: { results: searchedPosts, reset: this.resetCategorySearch },
      action: NavigationActions.navigate({ routeName: 'Tests', params: { results: searchedPosts, } })
    });
    navigation.dispatch(navigateAction);
    changeCategory('Tests');
    storeResources(searchedPosts);
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.bar}>
        <Search
          data={fakeVal} // this should be an API call or huge list eventually
          defaultValue={this.state.Location}
          onChangeText={e => this.setInputState(e)}
          style={styles.searchContainer}
          inputContainerStyle={styles.inputContainer}
          renderItem={item => (
            <TouchableOpacity onPress={() => this.handleSelection(item)} />
          )}
        />
        <TouchableOpacity
          style={styles.buttonRight}
          onPress={() => this.showSorter()}
        >
          <AntIcon name="filter" color="white" size={30} />
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  buttonLeft: {
    marginTop: 15,
    marginLeft: 30

  },
  buttonRight: {
    marginTop: 15,
    marginRight: 30

  },
  bar: {
    height: 80,
    paddingTop: 10,
    backgroundColor: '#4F87EC',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchContainer: {
    flex: 1,
    zIndex: 5
  },
  inputContainer: {
    width: 250,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1
  }


});
export default withNavigation(StudyRoomHeader);
