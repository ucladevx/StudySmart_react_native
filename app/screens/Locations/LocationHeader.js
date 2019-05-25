import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Search from '../../components/Search';

export default function LocationHeader(props) {
  const { onPress, getSearchQuery, currentPage } = props;
  let rightButton;

  if (currentPage === 'List') {
    rightButton = (
      <TouchableOpacity onPress={() => onPress()}>
        <Ionicon color="#108BF8" name="ios-map" size={25} backgroundColor="#4F87EC" />
      </TouchableOpacity>
    );
  } else if (currentPage === 'Map') {
    rightButton = (
      <TouchableOpacity onPress={() => onPress()}>
        <Ionicon color="#108BF8" name="ios-list" size={25} backgroundColor="#4F87EC" />
      </TouchableOpacity>
    );
  }

  return (
    <View style={currentPage === 'List' ? styles.topBar : styles.topBarMap}>
      <View style={styles.bar}>
        <Text style={styles.titleText}>
          {' '}
          Libraries
          {' '}
        </Text>
        {rightButton}
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
  buttonLeft: {
    marginLeft: 15
  },
  buttonRight: {
    marginRight: 15
  },
  rightView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 40
  },
  leftView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 40
  },
  bar: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
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
  input: {
    ...text,
    fontSize: 14,
    fontWeight: '300',
    color: '#000',
  },


});
