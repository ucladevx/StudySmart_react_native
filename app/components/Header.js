import GlobalSearchBar from './GlobalSearchBar'
import MainTopBar from './MainTopBar'
import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity,} from 'react-native';
import ViewContainer from './ViewContainer'
import { withNavigation, NavigationActions } from 'react-navigation';
import { changeCategory } from '../Actions/actions';
import {connect} from 'react-redux';
const Posts = [
    {courseName: "CS31", professor: "Smallberg", test: "Midterm 1", term:"Winter",year: 2018, rating: 4, ratingNum: 10, type: 'Test'},
    {courseName: "CS32",  professor: "Nachenberg", test: "Midterm 1", term: "Fall", year: 2015, rating: 3.5, ratingNum: 10, type: 'Test'},
    {courseName: "CS33",  professor: "Eggert", test: "Midterm 1", term: "Fall", year: 2016, rating: 3.5, ratingNum: 10, type: 'Test'},  
    {courseName: "CS131", professor: "Smallberg", test: "Midterm 1", term: "Winter", year: 2015, rating: 3.5, ratingNum: 4310, type: 'Notes'},
    {courseName: "CS13",  professor: "Nachenberg", test: "Final", term: "Fall", year: 2018, rating: 5, ratingNum: 10, type: 'Notes'},
    {courseName: "CS133",  professor: "Eggert", test: "Midterm 2", term: "Fall", year: 2018, rating: 3.5, ratingNum: 1000, type: 'Notes'},
    {courseName: "EE 3",  professor: "Potkonjak", test: "Midterm 1", term: "Fall", year: 2015,rating: 2.0, ratingNum: 10, type: 'Test'},
    {courseName: "M51A",  professor: "Potkonjak", term: "Fall", term: "Fall", year: 2018, rating: 3.5, ratingNum: 210, type: 'Test'},
    {courseName: "CS31",  professor: "Potkonjak", test: "Midterm 1", term: "Spring", year: 2018, rating: 1, ratingNum: 10, type: 'Notes'},
    {courseName: "MATH33",  professor: "Potkonjak", test: "Midterm 1", term: "Spring", year: 2018, rating: 1, ratingNum: 10, type: 'Notes'}
  ]  
  export class Header extends Component {
    constructor (props) {
        super(props)
        this.state = {
            Class: ' ',
            Test: ' ',
            Professor: ' ',
            categorySelected: this.props.category.category,
        }
        this.processPosts = this.processPosts.bind(this)
    }
    processPosts(e) {
        var i;
       searchedPosts = []
        var upperClass = e.toUpperCase()
        for (i =0 ; i<Posts.length; i++) {
              if (Posts[i]['courseName'].toUpperCase() == upperClass){
                searchedPosts.push(Posts[i]);
              }
        }

        const navigateAction = NavigationActions.navigate({
            routeName: 'Tests',
            params: {results: searchedPosts, reset: this.resetCategorySearch},
            action: NavigationActions.navigate({ routeName: 'Tests', params: {results: searchedPosts, }})
          })
        this.props.navigation.dispatch(navigateAction)
        this.props.changeCategory('Tests')
      }
    render() {
        return(
            <ViewContainer style={styles.header}>
            <GlobalSearchBar
            processPosts= {this.processPosts}/>
            <MainTopBar
            navigation={this.props.navigation}/>
            </ViewContainer>
        )
    }
}
const styles = StyleSheet.create({
    header:{
        top:0,
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '18%',
        zIndex: 10,
        backgroundColor: 'transparent'
    }
})
const mapStateToProps = state => {
    return {
      category: state.category,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      changeCategory: (category) =>{
        dispatch(changeCategory(category))
      }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Header)