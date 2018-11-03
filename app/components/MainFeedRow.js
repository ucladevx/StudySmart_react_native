'use strict'
import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class MainFeedRow extends Component {
    constructor(props){
        super(props);
        this.courseName = this.props.courseName;
        this.professor = this.props.professor;
      }
    render() {
    return
    (<View style={styles.container}>
        <View style={styles.container_text}>
            <Text style={styles.courseName}>
                {this.courseName}
            </Text>
            <Text style={styles.professor}>
                {this.professor}
            </Text>
        </View>

    </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    courseName: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    professor: {
        fontSize: 11,
        fontStyle: 'italic',
    },

});

module.exports = MainFeedRow