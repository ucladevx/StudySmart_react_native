import React, { Component } from 'react';
import {Text, TextInput, View, Button, TouchableOpacity, Alert} from 'react-native';
import {GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin'
import {StyleSheet} from 'react-native';
import {config} from '../../config.js';

const GOOGLE_API_KEY = config.GOOGLE_API_KEY;

export default class LoginPage extends Component {

  render() {
    return (
      <View style={studySmart.container}>

        {/* STUDYSMART TITLE */}
        <View style={studySmart.titleContainer}>
          <Text style={studySmart.title}>STUDYSMART</Text>
        </View>

        {/* LOGIN AND SIGNUP BUTTONS */}
        <View style={studySmart.loginButtonContainer}>
          <TouchableOpacity onPress={this.signIn.bind(this)} style={studySmart.loginButton} >
              <Text style={studySmart.loginText}>LOG IN WITH GMAIL</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.signIn.bind(this)} style={studySmart.signupButton}>
              <Text style={studySmart.loginText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /* Called when component is mounted */
  componentDidMount() {
  this.setupGoogleSignin();
  }

  /* Sets up sign-in */
  async setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        webClientId: GOOGLE_API_KEY,
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
    }
    catch (err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  /* Called when user presses sign in button */
  signIn = async () => {
    try {
      console.log("Attempting User Sign-in");
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
    } catch (error) {
      /* If sign in cancelled */
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("ERROR: Sign-in cancelled.");
        return;
      /* If sign in already in progess */
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("ERROR: Sign-in already in progess.");
        return;
      /* If device doesn't have playservices */
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("ERROR: Device does not have play services.");
        return;
      /* Other error */
      } else {
        console.log("ERROR: Unknown");
      }
    }

    /* Check for valid email before continuing */
    if(this.state.userInfo){
      await this.checkEmail(this.state.userInfo.user.email);
    }

    /* If email was valid, continue to app */
    if(this.state.userInfo){
      /* TODO: API call to see if user is new */
      /* For now, assume user is new */
      console.log("Sign-in successfull: Email is valid.");
      console.log(this.state.userInfo);

      this.props.navigation.navigate("List");
      this.signOut();
    }
  };

  /* Signs current user out */
  signOut = async () => {
    console.log("Attempting User Sign-out");
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null });
    } catch (error) {
      console.error(error);
    }
  };

  /* Check user email for @g.ucla.edu or @ucla.edu, sign out if invalid */
  checkEmail = async (email) => {
    if(!(email.includes("@g.ucla.edu") || email.includes("ucla.edu"))){
      await this.signOut();
      Alert.alert("Email must be \"@g.ucla.edu\" format.");
    }
  }
}

export const studySmart = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white',
  },
  loginButton:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d95040',
    flex: 1,
  },
  signupButton:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#f2bd42",
    flex: 1,
  },
  loginText:{
    color: 'white',
    letterSpacing: 1.92,
    fontFamily: "System",
    fontSize: 28,
  },
  title:{
    color:'black',
    fontFamily: "System",
    fontSize: 40,
    letterSpacing: 3.52,
  },

  titleContainer:{
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButtonContainer:{
    flex: 1,
  },

});
