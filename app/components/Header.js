import GlobalSearchBar from './GlobalSearchBar'
import MainTopBar from './MainTopBar'
import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity, TouchableWithoutFeedback, Modal} from 'react-native';
import ViewContainer from './ViewContainer'
import { withNavigation } from 'react-navigation';

class Header extends Component {
    render() {
        return(
            <ViewContainer style={styles.header}>
            <GlobalSearchBar/>
            <MainTopBar/>
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
        height: 170,
        zIndex: 10
    }
})
export default withNavigation(Header)