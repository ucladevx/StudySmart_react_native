import React, { Component } from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableWithoutFeedback,
} from 'react-native';
import Sorter from './Sorter';

import { changeCategory } from '../Actions/actions';

const categories = [{ name: 'Main' }, { name: 'Tests' }, { name: 'Notes' }, { name: 'Guides' }, { name: 'Papers' }];
const Professors = [{ name: 'Smallberg' }, { name: 'Potkonjak' }, { name: 'Liu' }];

export class MainTopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.showResults = this.showResults.bind(this);
  }

  handleSelectCategory(item) {
    const { changeCategory, navigation } = this.props;
    navigation.navigate(item);
    changeCategory(item);
  }

  showSorter() {
    this.setState({
      visible: true
    });
  }

  showResults() {
    const { processPosts } = this.props;
    this.setState({
      visible: false
    });

    processPosts(this.props.class);
  }

  availableProfessors() {
    // API call here to fill
    const array = [];
    return Professors;
  }

  renderRow(item) {
    const { category } = this.props;
    let selected = category;
    if (selected === ' ') {
      selected = 'Main';
    }
    return (
      <TouchableWithoutFeedback
        onPress={() => this.handleSelectCategory(item.name)}
      >
        <View style={selected === item.name ? styles.categorySelected : styles.category}>
          <Text
            style={selected === item.name ? styles.textSelected : styles.text}
          >
            {item.name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { visible } = this.state;
    const { category } = this.props;
    return (
      <View style={styles.topBar}>
        <View
          style={{ height: '85%', width: '100%', marginTop: 10, }}
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            extraData={category}
            renderItem={({ item }) => this.renderRow(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {category === 'Main' ? null : (
          <View
            style={styles.right}
          >
            <TouchableOpacity
              style={[styles.sort, styles.boxWithShadow]}
              onPress={() => this.showSorter()}
            >
              <Text style={styles.sortText}> Sort </Text>
              <Ionicon color="white" name="ios-arrow-back" size={15} backgroundColor="#4F87EC" />
            </TouchableOpacity>
            {visible ? (
              <Sorter
                availableProfessors={this.availableProfessors()}
                showResults={this.showResults}
              />
            ) : null }
          </View>
        ) }
      </View>
    );
  }
}

const category = {
  borderRadius: 15,
  backgroundColor: '#e0e0e0',
  marginLeft: 4,
  marginRight: 4,
  marginTop: 10,
  height: 35,
  justifyContent: 'center',
  alignItems: 'center',
  width: 85
};
const text = {
  fontFamily: 'System',
  fontSize: 14,
  fontWeight: '500',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: '#9B9B9B',
};

const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    height: '48%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 20,
    flex: 0,
    zIndex: 15,
    position: 'absolute',
    top: '70%',
  },
  category,
  categorySelected: {
    ...category,
    backgroundColor: '#4F87EC',
  },
  text,
  textSelected: {
    ...text,
    color: 'white'
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  containerText: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',

  },
  sort: {
    borderRadius: 8,
    backgroundColor: '#4F87EC',
    height: '110%',
    width: '20%',
    marginLeft: '78%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
  },
  sortText: {
    ...text,
    letterSpacing: 1.54,
    color: 'white',
  },
  right: {
    flexDirection: 'row',
    marginTop: 10
  }

});

const mapStateToProps = state => ({
  category: state.resources.category,
  class: state.resources.class
});

const mapDispatchToProps = dispatch => ({
  changeCategory: (category) => {
    dispatch(changeCategory(category));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainTopBar);
