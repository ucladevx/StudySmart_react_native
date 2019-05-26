import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Search from '../../components/Search';

export default function LocationHeader(props) {
  const { onPress, getSearchQuery, currentPage } = props;

  return (
    <View style={currentPage === 'List' ? styles.topBar : styles.topBarMap}>
      <View style={styles.bar}>
        <View style={styles.leftViewAbs}>
          <Text style={styles.searchText}>
            {' '}
          Study Spots
            {' '}
          </Text>
        </View>
        <TouchableOpacity style={styles.rightButtonAbs} onPress={() => onPress()}>
          <Ionicon color="#108BF8" name={currentPage === 'List' ? 'ios-map' : 'ios-list'} size={25} backgroundColor="#4F87EC" />
        </TouchableOpacity>
      </View>
      {currentPage === 'List'
        && (
          <Search
            // Searchbar itself does not actually show any data so pass in nothing
            data={[]}
            placeholder="Search places to study..."
            onChangeText={(e) => { getSearchQuery(e); }}
            inputContainerStyle={styles.inputContainer}
            style={styles.searchContainer}
            renderItem={() => (
              <TouchableOpacity onPress={() => null} />
            )}
          />
        )
      }
    </View>
  );
}

const text = {
  fontFamily: 'System',
  letterSpacing: 1.92,
};
const titleText = {
  fontFamily: 'System',
  fontSize: 18,
  fontWeight: '300',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: '#108BF8',
  width: '80%',
  padding: 5,
  textAlign: 'center'
};

const styles = StyleSheet.create({
  titleText,
  searchText: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '800',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: 'black',
    textAlign: 'left',
  },
  topBar: {
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
  topBarMap: {
    alignItems: 'center',
    width: '100%',
    height: 65,
  },
  bar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',

  },
  searchContainer: {
    zIndex: 5,
    flexDirection: 'row',
    width: '95%',
    height: 35,
    marginLeft: '5%',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    zIndex: 5,
    height: 40,
    width: '95%',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0.5,
      height: 0.5
    },
    shadowRadius: 1,
    shadowOpacity: 0.8,
  },
  leftViewAbs: {
    width: '70%',
    height: 30,
    position: 'absolute',
    left: '2%',
    marginTop: '1%',
    zIndex: 10,
  },
  rightButtonAbs: {
    width: 30,
    height: 30,
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    right: 10,
    top: '15%'
  },


});
