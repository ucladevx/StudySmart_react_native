import React from 'react';
import {
  View, StyleSheet, WebView
} from 'react-native';

export default function Feedback() {
  return (
    <View style={styles.viewContainer}>
      <WebView source={{ uri: 'https://forms.gle/qP3DZVirq9Ne9VSt7' }} />
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
