import React, { Component } from 'react';
import {
  View, StyleSheet, WebView, Button
} from 'react-native';

const FORM_ONE = 'form1';
const FORM_TWO = 'form2';

export default class Feedback extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      currentForm: FORM_ONE
    };
  }

  handlePress = (form) => {
    if (form === FORM_ONE) this.setState({ currentForm: FORM_ONE });
    else if (form === FORM_TWO) this.setState({ currentForm: FORM_TWO });
  };

  render() {
    const { currentForm } = this.state;
    let form;
    if (currentForm === FORM_ONE) form = <WebView source={{ uri: 'https://forms.gle/FEVruhjkQUX8ZtwY8' }} />;
    else form = <WebView source={{ uri: 'https://forms.gle/khhjTShNv54Yif3B9' }} />;

    return (
      <View style={styles.viewContainer}>
        <View style={styles.header}>
          <Button
            onPress={() => this.handlePress(FORM_ONE)}
            title="Feedback"
            disabled={currentForm === FORM_ONE}
          />
          <Button
            onPress={() => this.handlePress(FORM_TWO)}
            title="Improvements"
            disabled={currentForm === FORM_TWO}
          />

        </View>
        {form}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 90,
    padding: 5
  }

});
