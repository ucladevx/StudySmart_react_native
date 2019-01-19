

import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList
} from 'react-native';
import { withNavigation } from 'react-navigation';
import StarRating from 'react-native-star-rating';

class TestsList extends Component {

  handleSelectTest(item) {
    const { navigation, setSelected } = this.props;
    navigation.navigate('SelectedTest', { test: item, setSelected: this.props.setSelected });
  }

  renderRow(item) {
    return (
      <TouchableOpacity
        onPress={() => this.handleSelectTest(item)}
      >
        <View style={styles.cell}>
          <View
            style={styles.containerRow}
          >
            <View style={styles.circleIcon}>
              <Text style={styles.circleText}>{item.courseName.charAt(0)}</Text>
            </View>
            <View
              style={styles.containerText}
            >
              <View style={styles.containerRow}>
                <Text style={[styles.bigText, styles.leftText]}>
                  {item.courseName}
                  {' '}
|
                  {' '}
                  {item.professor}
                </Text>
              </View>
              <View style={styles.containerRow}>
                <Text style={[styles.text, styles.leftText]}>
                  {item.test}
                  {' '}
|
                  {' '}
                  {item.term}
                  {' '}
                  {item.year}
                </Text>
              </View>
              <View style={styles.containerRow}>
                <StarRating
                  disabled
                  maxStars={5}
                  starSize={10}
                  fullStarColor="#417505"
                  rating={item.rating}
                />
                <Text style={[styles.text, { marginLeft: 8 }]}>
                  {item.ratingNum}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <FlatList
        ref={(ref) => { this._flatList = ref; }}
        data={data}
        extraData={data}
        renderItem={({ item }) => this.renderRow(item)}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    );
  }
}

const text = {
  fontFamily: 'System',
  fontSize: 12,
  fontWeight: '500',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: '#4a4a4a'
};
const styles = StyleSheet.create({
  list: {
    position: 'absolute',
    zIndex: 1,
    top: '22%',
    flex: 1,
    bottom: 0,
    backgroundColor: 'transparent'
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    padding: 10,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  containerText: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15,
    justifyContent: 'center',
    width: '100%',
  },
  containerRow: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
    alignItems: 'center',
    width: '100%'
  },
  category: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  circleIcon: {
    borderRadius: 25,
    height: 50,
    width: 50,
    backgroundColor: 'green',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text,
  bigText: {
    ...text,
    height: 20,
    fontSize: 17,
    letterSpacing: 1.92,
    color: 'black',
  },
  leftText: {
    textAlign: 'left',
    flex: 0
  },
  circleText: {
    ...text,
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
});

export default withNavigation(TestsList);
