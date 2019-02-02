import React, { Component } from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity, Modal
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
// import { changeExam, changeProfessor } from '../Actions/actions';

class Sorter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDurations: 0,
      selectedLocation: 0,
    };
    this.availableLocations = this.availableLocations.bind(this);
  }

  availableLocations() {
    const locations = [{ name: 'North Campus' }, { name: 'South Campus' }, { name: 'Hill' }, { name: 'Libaries Only' },];
    return locations;
  }

  setDurations(e) {
    this.setState({
      selectedDurations: e
    });
    // this.props.changeExam(e);
  }

  setLocation(e) {
    this.setState({
      selectedLocation: e
    });
    // this.props.changeProfessor(e);
  }

  // we can make sorter reusable for resources and locations but I am lazy rn

  renderLocations(item) {
    return (
      <TouchableOpacity
        style={styles.locationCell}
        onPress={() => this.setLocation(item.name)}
      >
        <Text style={this.state.selectedLocation === item.name ? styles.categoryTextSelected : styles.categoryText}>
          {' '}
          {item.name}
          {' '}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Modal
        animationType="fade"
        style={styles.modal}
        transparent
      >
        <View style={[styles.modalContainer, styles.boxWithShadow]}>
          <Text style={styles.sortText}> Sort </Text>
          <View style={styles.divider} />
          <View style={styles.left_text}>
            <Text style={styles.titleText}> Exams </Text>
            <View style={styles.containerRow}>
              <View style={styles.containerColumn}>
                <TouchableOpacity
                  style={styles.containerRow}
                  onPress={() => this.setDurations('1 hr')}
                >
                  <MaterialCommunityIcon color={this.state.selectedDurations === '1 hr' ? '#4F87EC' : 'gray'} name="circle-slice-8" size={25} backgroundColor="#4F87EC" />
                  <Text style={this.state.selectedDurations === '1 hr' ? styles.categoryTextSelected : styles.categoryText}> 1 hr </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.containerRow}
                  onPress={() => this.setDurations('2 hrs')}
                >
                  <MaterialCommunityIcon color={this.state.selectedDurations === '2 hrs' ? '#4F87EC' : 'gray'} name="circle-slice-8" size={25} backgroundColor="#4F87EC" />
                  <Text style={this.state.selectedDurations === '2 hrs' ? styles.categoryTextSelected : styles.categoryText}> 2 hrs </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.containerColumn, { marginLeft: '10%' }]}>
                <TouchableOpacity
                  style={[styles.containerRow]}
                  onPress={() => this.setDurations('3 hrs')}
                >
                  <MaterialCommunityIcon color={this.state.selectedDurations === '3 hrs' ? '#4F87EC' : 'gray'} name="circle-slice-8" size={25} backgroundColor="#4F87EC" />
                  <Text style={this.state.selectedDurations === '3 hrs' ? styles.categoryTextSelected : styles.categoryText}> 3 hrs </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.containerRow}
                  onPress={() => this.setDurations('4 hrs')}
                >
                  <MaterialCommunityIcon color={this.state.selectedDurations === '4 hrs' ? '#4F87EC' : 'gray'} name="circle-slice-8" size={25} backgroundColor="#4F87EC" />
                  <Text style={this.state.selectedDurations === '4 hrs' ? styles.categoryTextSelected : styles.categoryText}> 4 hrs </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.titleText}> Locations </Text>
            <View style={styles.list}>
            <FlatList
              data={this.availableLocations()}
              extraData={this.availableLocations()}
              renderItem={({ item }) => this.renderLocations(item)}
              keyExtractor={(item, index) => index.toString()}
              style={{flex: 1}}
            />
            </View>
            <View style={styles.divider} />
            <TouchableOpacity
              onPress={() => this.props.showResults()}
            >
              <Text style={styles.titleText}> Show Results </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    height: '70%',
    width: '90%',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 20,
    marginRight: 30,
    flex: 0,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerRow: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  divider: {
    height: 2,
    backgroundColor: '#e0e0e0',
    width: '95%',
    marginTop: 5,
    marginBottom: 5
  },
  bigText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
    marginRight: 5
  },
  containerColumn: {
    flexDirection: 'column',
    flex: 0,
    width: '40%',
    height: '100%',
    marginLeft: 5,

  },
  sortText: {
    fontFamily: 'System',
    fontSize: 30,
    fontWeight: '700',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: '#4a4a4a',
    marginTop: 5,
  },
  titleText: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: '#4a4a4a',
    padding: 5
  },
  categoryText: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: 'gray',
  },
  categoryTextSelected: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: '#4F87EC',
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  locationCell: {
    alignItems: 'center',
    padding: 5
  },
  list: {
    height: '45%'
  }
});
const mapStateToProps = state => ({

  time: state.study.time,
  date: state.study.date
});


export default connect(mapStateToProps)(Sorter);
