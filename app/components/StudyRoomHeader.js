import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons'
import Search from './Search';
import Sorter from './Sorter';


const fakeVal = [];
class StudyRoomHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Location: '',
    };
    this.setInputState = this.setInputState.bind(this);
    this.goBack = this.goBack.bind(this);
    this.showResults = this.showResults.bind(this);
  }

  // Shirly's code from GlobalSearchBar.js
  setInputState(e) {
    this.setState({ Location: e });
  }

  // Shirly's code from GlobalSearchBar.js
  goBack() {
    this.props.navigation.navigate('Booking');
  }

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

  processSelection(e) {
    /* const {
      exam, professor, changeCategory, storeResources, navigation
    } = this.props;
    const examCheck = exam.length > 0;
    const professorCheck = professor.length > 0;
    let i;
    const searchedPosts = [];
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
    */
  }

  render() {
    const { navigate } = this.props.navigation;
    const { date, time } = this.props;
    return (
      <View style={styles.bar}>
        <View style={styles.leftView}>
          <TouchableOpacity
            style={styles.buttonLeft}
            onPress={() => navigate('List')}
          >
            <Ionicon name="ios-list" color="white" size={30} />
          </TouchableOpacity>
        </View>
        <Search
          data={fakeVal} // this should be an API call or huge list eventually
          defaultValue={date != '' || time != '' ? `${date} ${time}` : ''}
          onFocus={this.goBack}
          onChangeText={e => this.setInputState(e)}
          style={styles.searchContainer}
          inputContainerStyle={styles.inputContainer}
          renderItem={item => (
            <TouchableOpacity onPress={() => this.handleSelection(item)} />
          )}
        />
        <View style={styles.rightView}>
          <TouchableOpacity
            style={styles.buttonRight}
            onPress={() => this.showSorter()}
          >
            <AntIcon name="filter" color="white" size={30} />
          </TouchableOpacity>
          { this.state.visible ? (
            <Sorter
              showResults={this.showResults}
            />
          ) : null }
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  buttonLeft: {
    marginLeft: 15

  },
  buttonRight: {
    marginRight: 15
  },
  rightView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 40
  },
  leftView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 40
  },
  bar: {
    height: 80,
    paddingTop: 10,
    backgroundColor: '#4F87EC',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',

  },
  searchContainer: {
    flex: 1,
    zIndex: 5,
    marginLeft: '5%'
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
const mapStateToProps = state => ({

  time: state.study.time,
  date: state.study.date
});

export default connect(mapStateToProps)(StudyRoomHeader);
