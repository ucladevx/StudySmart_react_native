import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { changeCategory, storeResources } from '../Actions/actions';
import GlobalSearchBar from './GlobalSearchBar';
import MainTopBar from './MainTopBar';
import ViewContainer from './ViewContainer';

const Posts = [
  {
    courseName: 'CS31', professor: 'Smallberg', test: 'Midterm 1', term: 'Winter', year: 2018, rating: 4, ratingNum: 10, type: 'Tests'
  },
  {
    courseName: 'CS31', professor: 'Smallberg', test: 'Midterm 2', term: 'Fall', year: 2015, rating: 3.5, ratingNum: 10, type: 'Tests'
  },
  {
    courseName: 'CS31', professor: 'Eggert', test: 'Midterm 2', term: 'Fall', year: 2016, rating: 3.5, ratingNum: 10, type: 'Tests'
  },
  {
    courseName: 'CS131', professor: 'Smallberg', test: 'Midterm 1', term: 'Winter', year: 2015, rating: 3.5, ratingNum: 4310, type: 'Tests'
  },
  {
    courseName: 'CS13', professor: 'Nachenberg', test: 'Final', term: 'Fall', year: 2018, rating: 5, ratingNum: 10, type: 'Notes'
  },
  {
    courseName: 'CS133', professor: 'Eggert', test: 'Midterm 2', term: 'Fall', year: 2018, rating: 3.5, ratingNum: 1000, type: 'Notes'
  },
  {
    courseName: 'EE 3', professor: 'Potkonjak', test: 'Midterm 1', term: 'Fall', year: 2015, rating: 2.0, ratingNum: 10, type: 'Tests'
  },
  {
    courseName: 'M51A', professor: 'Potkonjak', term: 'Fall', year: 2018, rating: 3.5, ratingNum: 210, type: 'Tests'
  },
  {
    courseName: 'CS31', professor: 'Potkonjak', test: 'Midterm 1', term: 'Spring', year: 2018, rating: 1, ratingNum: 10, type: 'Notes'
  },
  {
    courseName: 'MATH33', professor: 'Potkonjak', test: 'Midterm 1', term: 'Spring', year: 2018, rating: 1, ratingNum: 10, type: 'Notes'
  }
];
export class Header extends Component {
  constructor(props) {
    super(props);
    this.processPosts = this.processPosts.bind(this);
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
    const { navigation } = this.props;
    return (
      <ViewContainer style={styles.header}>
        <GlobalSearchBar
          processPosts={this.processPosts}
          navigation={navigation}
        />
        <MainTopBar
          processPosts={this.processPosts}
          navigation={navigation}
        />
      </ViewContainer>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    top: 0,
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '18%',
    zIndex: 10,
    backgroundColor: 'transparent'
  }
});
const mapStateToProps = state => ({
  category: state.resources.category,
  class: state.resources.class,
  resources: state.resources.resources,
  professor: state.resources.professor,
  exam: state.resources.exam
});

const mapDispatchToProps = dispatch => ({
  changeCategory: (category) => {
    dispatch(changeCategory(category));
  },
  storeResources: (resources) => {
    dispatch(storeResources(resources));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);
