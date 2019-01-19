import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Search from './Search';
import { changeClass } from '../Actions/actions';

const classes = [
  { name: 'CS31' }, { name: 'CS32' }, { name: 'CS33' }, { name: 'Computer Science 31' }, { name: 'Computer Science 32' }, { name: 'CS111' },
  { name: 'MATH61' }, { name: 'MATH33' }, { name: 'PHYSICS 1A' },
];
const Posts = [
  { courseName: 'CS31', professor: 'Smallberg', test: 'Midterm 1', term:'Winter',year: 2018, rating: 4, ratingNum: 10 },
  { courseName: 'CS32', professor: 'Nachenberg', test: 'Midterm 1', term: 'Fall', year: 2015, rating: 3.5, ratingNum: 10 },
  { courseName: 'CS33', professor: 'Eggert', test: 'Midterm 1', term: 'Fall', year: 2016, rating: 3.5, ratingNum: 10 }, 
  { courseName: 'CS131', professor: 'Smallberg', test: 'Midterm 1', term: 'Winter', year: 2015, rating: 3.5, ratingNum: 4310 },
  { courseName: 'CS13', professor: 'Nachenberg', test: 'Final', term: 'Fall', year: 2018, rating: 5, ratingNum: 10 },
  { courseName: 'CS133', professor: 'Eggert', test: 'Midterm 2', term: 'Fall', year: 2018, rating: 3.5, ratingNum: 1000 },
  { courseName: 'EE 3', professor: 'Potkonjak', test: 'Midterm 1', term: 'Fall', year: 2015, rating: 2.0, ratingNum: 10 },
  { courseName: 'M51A', professor: 'Potkonjak', term: 'Fall', year: 2018, rating: 3.5, ratingNum: 210 },
  { courseName: 'CS31', professor: 'Potkonjak', test: 'Midterm 1', term: 'Spring', year: 2018, rating: 1, ratingNum: 10 },
  { courseName: 'MATH33', professor: 'Potkonjak', test: 'Midterm 1', term: 'Spring', year: 2018, rating: 1, ratingNum: 10 }
];
class GlobalSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Class: '',
      searching: false
    };
    this.setInputState = this.setInputState.bind(this);
    this.handleSearchSuggestions = this.handleSearchSuggestions.bind(this);
  }

  setInputState(e) {
    this.setState({ Class: e });
    this.setState({
      searching: false
    });
  }

  handleSearchSuggestions(e) {
    let index;
    let value;
    let result = [];
    const { Class } = this.state;
    if (Class.length === 0) {
      return [];
    }
    for (index = 0; index < classes.length; ++index) {
      const currentClass = Class.toUpperCase();
      value = classes[index].name.toUpperCase();
      if (value.substring(0, Class.length) === currentClass) {
        result.push(classes[index]);
      }
    }
    return result;
  }

  handleClick(chosenClass) {
    const { changeClass, processPosts } = this.props;
    changeClass(chosenClass);
    processPosts(chosenClass);
    this.setState({
      searching: true,
      Class: chosenClass,
    });
  }

  handleUpload() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    navigate('CameraScreen');
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const { Class, searching } = this.state;
    const classesData = this.handleSearchSuggestions(Class);
    return (
      <View style={[styles.bar, styles.boxWithShadow]}>
        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={() => this.handleUpload()}
        >
          <Icon color="white" name="upload" size={30} backgroundColor="#4F87EC" />
        </TouchableOpacity>
        <Search
          style={styles.searchContainer}
          value={Class}
          data={classesData} // this should be an API call or huge list eventually
          defaultValue={this.props.class}
          onChangeText={e => this.setInputState(e)}
          inputContainerStyle={styles.inputContainer}
          hideResults={searching}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.handleClick(item.name)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.buttonRight}>
          <Ionicon color="white" name="ios-chatbubbles" size={30} backgroundColor="#4F87EC" />
        </TouchableOpacity> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonLeft: {
    marginLeft: 10
  },
  buttonRight: {
    marginRight: 10
  },
  bar: {
    height: '60%',
    alignItems: 'center',
    backgroundColor: '#4F87EC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    position: 'absolute',
    top: 20,
    width: '100%',
    zIndex: 20
  },
  searchContainer: {
    flex: 1,
    zIndex: 5
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
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
const mapStateToProps = (state) => {
  return {
    class: state.resources.class
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeClass: (course) => {
      dispatch(changeClass(course));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalSearchBar);
