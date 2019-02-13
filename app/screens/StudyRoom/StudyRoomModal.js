import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList, Modal
} from 'react-native';
import { withNavigation } from 'react-navigation';


class StudyRoomModal extends Component {
  render() { 
      return (
    <Modal style={styles.modal}
    transparent
    animationType="fade"
    >
      <View style={styles.modalContainer} />

    </Modal>
      )
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


});

export default withNavigation(StudyRoomModal);
