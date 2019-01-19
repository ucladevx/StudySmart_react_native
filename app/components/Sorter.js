import React, { Component } from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity, Modal
} from 'react-native';
import { changeExam, changeProfessor } from '../Actions/actions';

class Sorter extends Component {
  setTest(e) {
    this.setState({
      selectedType: e
    });
    this.props.changeExam(e);
  }

  setProfessor(e) {
    this.setState({
      selectedProf: e
    });
    this.props.changeProfessor(e);
  }

  _renderProfessors(item) {
    return (
      <TouchableOpacity
        style={styles.professorCell}
        onPress={() => this.setProfessor(item.name)}
      >
        <Text style={this.props.prof === item.name ? styles.categoryTextSelected : styles.categoryText}> {item.name} </Text>
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
                  onPress={() => this.setTest('Midterm 1')}
                >
                  <MaterialCommunityIcon color={this.props.exam === 'Midterm 1' ? '#4F87EC' : 'gray'} name="circle-slice-8" size={25} backgroundColor="#4F87EC" />
                  <Text style={this.props.exam == 'Midterm 1' ? styles.categoryTextSelected : styles.categoryText}> Midterm 1 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.containerRow}
                  onPress={() => this.setTest('Quiz')}
                >
                  <MaterialCommunityIcon color={this.props.exam === 'Quiz' ? '#4F87EC' : 'gray'} name="circle-slice-8" size={25} backgroundColor="#4F87EC" />
                  <Text style={this.props.exam == 'Quiz' ? styles.categoryTextSelected : styles.categoryText}> Quiz </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.containerColumn, { marginLeft: '10%' }]}>
                <TouchableOpacity
                  style={[styles.containerRow]}
                  onPress={() => this.setTest('Midterm 2')}
                >
                  <MaterialCommunityIcon color={this.props.exam === 'Midterm 2' ? '#4F87EC' : 'gray'} name="circle-slice-8" size={25} backgroundColor="#4F87EC" />
                  <Text style={this.props.exam == 'Midterm 2' ? styles.categoryTextSelected : styles.categoryText}> Midterm 2 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.containerRow}
                  onPress={() => this.setTest('Final')}
                >
                  <MaterialCommunityIcon color={this.props.exam === 'Final' ? '#4F87EC' : 'gray'} name="circle-slice-8" size={25} backgroundColor="#4F87EC" />
                  <Text style={this.props.exam == 'Final' ? styles.categoryTextSelected : styles.categoryText}> Final </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.titleText}> Professors </Text>
            <FlatList
              data={this.props.availableProfessors}
              extraData={this.props.prof}
              renderItem={({ item }) => this._renderProfessors(item)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={styles.divider} />
          <TouchableOpacity
            onPress={() => this.props.showResults()}
          >
            <Text style={styles.titleText}> Show Results </Text>
          </TouchableOpacity>

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
  professorCell: {
    alignItems: 'center',
    padding: 5
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
  changeExam: (exam) => {
    dispatch(changeExam(exam));
  },
  changeProfessor: (professor) => {
    dispatch(changeProfessor(professor));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sorter);
