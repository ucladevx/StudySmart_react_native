import React from 'react';
import {
  View, StyleSheet, WebView
} from 'react-native';

export default function Feedback(props) {
  const { link } = props;
  return (
    <View style={styles.viewContainer}>
      <WebView source={{ uri: link }} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  }
});
