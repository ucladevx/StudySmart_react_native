import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Search from '../components/Search';

const Posts = [
  {
    courseName: 'CS31', professor: 'Smallberg', test: 'Midterm 1', term: 'Winter', year: 2018, rating: 4, ratingNum: 10
  },
  {
    courseName: 'CS32', professor: 'Nachenberg', test: 'Midterm 1', term: 'Fall', year: 2015, rating: 3.5, ratingNum: 10
  },
  {
    courseName: 'CS33', professor: 'Eggert', test: 'Midterm 1', term: 'Fall', year: 2016, rating: 3.5, ratingNum: 10
  },
  {
    courseName: 'CS131', professor: 'Smallberg', test: 'Midterm 1', term: 'Winter', year: 2015, rating: 3.5, ratingNum: 4310
  },
  {
    courseName: 'CS13', professor: 'Nachenberg', test: 'Final', term: 'Fall', year: 2018, rating: 5, ratingNum: 10
  },
  {
    courseName: 'CS133', professor: 'Eggert', test: 'Midterm 2', term: 'Fall', year: 2018, rating: 3.5, ratingNum: 1000
  },
  {
    courseName: 'EE 3', professor: 'Potkonjak', test: 'Midterm 1', term: 'Fall', year: 2015, rating: 2.0, ratingNum: 10
  },
  {
    courseName: 'M51A', professor: 'Potkonjak', term: 'Fall', term: 'Fall', year: 2018, rating: 3.5, ratingNum: 210
  },
  {
    courseName: 'CS31', professor: 'Potkonjak', test: 'Midterm 1', term: 'Spring', year: 2018, rating: 1, ratingNum: 10
  },
  {
    courseName: 'MATH33', professor: 'Potkonjak', test: 'Midterm 1', term: 'Spring', year: 2018, rating: 1, ratingNum: 10
  }
];
class CreateClasses extends Component {
    static navigationOptions = ({ navigation }) => ({
      tabBarVisible: false,
      headerStyle: {
        backgroundColor: '#4F87EC'
      },
      headerLeft: (
        <TouchableOpacity
          style={{ marginLeft: 10, marginBottom: 10 }}
          onPress={() => navigation.state.params.handleBack()}
        >
          <Ionicon name="ios-arrow-round-back" color="white" size={50} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: 10, marginBottom: 10 }}
          onPress={() => navigation.state.params.handleBack()}
        >
          <Ionicon name="ios-checkmark" color="white" size={50} />
        </TouchableOpacity>
      )
    });

    constructor(props) {
      super(props);
      this.state = {
        Class: '',
        searching: false
      };
      this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
      this.props.navigation.setParams({ handleBack: this.goBack });
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
      for (index = 0; index < Posts.length; ++index) {
        value = Posts[index].courseName.toUpperCase();
        const currentClass = Class.toUpperCase();
        if (value.substring(0, Class.length) === currentClass) {
          result.push(Posts[index]);
        }
      }
      return result;
    }

    handleClick(chosenClass) {
      this.setState({
        Class: chosenClass
      });
      this.setState({
        searching: true
      });
    }

    goBack() {
      this.props.navigation.navigate('Main');
    }

    renderRow(item) {
      return (
        <TouchableOpacity
          onPress={() => this.handleClick(item.courseName)}
        >
          <Text style={styles.row}>{item.courseName}</Text>
        </TouchableOpacity>
      );
    }

    render() {
      const { Class, searching } = this.state;
      const classesData = this.handleSearchSuggestions(Class);
      return (
        <View style={styles.container}>
          <Text style={styles.createYourClasses}>CREATE YOUR CLASSES</Text>
          <Search
            style={styles.input}
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInputContainer}
            listContainerStyle={styles.listContainer}
            data={classesData} // this should be an API call or huge list eventually
            placeholder="Enter class titles"
            onChangeText={e => this.setInputState(e)}
            hideResults={searching}
            renderItem={({ item }) => this.renderRow(item)}
          />
        </View>
      );
    }
}
const createYourClasses = {
  width: '80%',
  height: 100,
  fontFamily: 'System',
  fontSize: 36,
  fontWeight: 'bold',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: 'black',
  marginTop: '12%',
  marginLeft: '5%',
  marginBottom: '5%'
};

const styles = StyleSheet.create({
  createYourClasses,
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  searchContainer: {
    flex: 1,
    zIndex: 5,
    marginLeft: '5%'
  },
  searchInputContainer: {
    width: '95%',
    height: 60,
    backgroundColor: 'white',
    borderWidth: 0,
  },
  input: {
    height: 60,
    fontSize: 25,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  listContainer: {
    width: '95%'
  },
  row: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'System'

  }
});
export default withNavigation(CreateClasses);
