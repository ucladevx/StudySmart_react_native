import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList, Modal
} from 'react-native';
import { connect } from 'react-redux';


class StudyRoomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: '',
    };
  }

  availableDurations() {
    return [{ name: "1" }];
  }

  renderList(item) {
    const { room } = this.state;
    return (
      <TouchableOpacity
        style={styles.listCell}
        onPress={() => this.setState({ room: item.link })}
      >
        <Text style={room === item.link ? styles.categoryTextSelected : styles.categoryText}>
          {' '}
          {item.details}
          {' '}
        </Text>
      </TouchableOpacity>
    );
  }

  renderDurationList(item) {
    const { duration } = this.props;
    return (
      <TouchableOpacity
        style={styles.listCell}
        onPress={() => this.setState({ room: item.name })}
        disabled={duration > 0}
      >
        <Text style={duration === item.name ? styles.categoryTextSelected : styles.categoryText}>
          {' '}
          {item.name}
          {' '}
        </Text>
      </TouchableOpacity>
    );
  }


  render() {
    const { handleModal, handleReserve } = this.props;
    return (
      <Modal
        style={styles.modal}
        transparent
        animationType="fade"
      >
        <View style={[styles.modalContainer, styles.boxWithShadow]}>
          <Text style={styles.titleText}> Available Durations </Text>
          <View style={styles.list}>
            <FlatList
              data={this.availableDurations()}
              extraData={this.availableDurations()}
              renderItem={({ item }) => this.renderDurationList(item)}
              keyExtractor={(item, index) => index.toString()}
              style={{ flex: 1, backgroundColor: 'transparent' }}
            />
          </View>
          <Text style={styles.titleText}> Select a Room </Text>
          <View style={styles.list}>
            <FlatList
              data={this.props.rooms.available}
              extraData={this.props.rooms.available}
              renderItem={({ item }) => this.renderList(item)}
              keyExtractor={(item, index) => index.toString()}
              style={{ flex: 1, backgroundColor: 'transparent' }}
            />
          </View>
          <View style={styles.containerRow}>
            <TouchableOpacity
              onPress={() => handleReserve(this.state.room)}
            >
              <Text style={styles.titleText}> Reserve </Text>
            </TouchableOpacity>
            <View style={styles.verticalDivider} />
            <TouchableOpacity
              onPress={() => handleModal(null)}
            >
              <Text style={styles.titleText}> Cancel </Text>
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
  titleText: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: '#4a4a4a',
    padding: 5
  },
  divider: {
    height: 2,
    backgroundColor: '#e0e0e0',
    width: '95%',
    marginTop: 5,
    marginBottom: 2
  },
  verticalDivider: {
    height: 30,
    backgroundColor: '#e0e0e0',
    width: 2,
    marginBottom: 2,
    marginRight: '10%',
    marginLeft: '10%',
  },
  containerRow: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  list: {
    height: '35%'
  },
  listCell: {
    alignItems: 'center',
    padding: 5
  },
  categoryText: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: 'gray',
  },
  categoryTextSelected: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: '#4F87EC',
  },


});
const mapStateToProps = state => ({
  time: state.study.time,
  date: state.study.date,
  duration: state.study.duration,
});


export default connect(mapStateToProps)(StudyRoomModal);
