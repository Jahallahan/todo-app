import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, NavigatorIOS } from 'react-native';
import Signup from '../components/Signup.js';
import Account from '../components/Account.js';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // used to display a progress indicator if waiting for a network response.
      loading: false,
      // entered credentials
      email: '',
      password: ''
    }
  }

  login(){
    // Log in and display an alert to tell the user what happened.
    this.props.firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password
    ).then((userData) =>
      {
        console.log("Success")

        this.props.navigator.push({
          name: Account
        });
      }
    ).catch((error) =>
        {
        alert('Login Failed. Please try again');
    });
  }

  goToSignup(){
    this.props.navigator.push({
      component: Signup
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
          placeholder={"Email Address"} />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          secureTextEntry={true}
          placeholder={"Password"} />
        <TouchableHighlight onPress={this.login.bind(this)} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.goToSignup.bind(this)} style={styles.transparentButton}>
          <Text style={styles.transparentButtonText}>New here?</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
        height: 56,
    backgroundColor: '#e9eaed',
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: 'red',
    borderWidth: 1
  },
  transparentButton: {
    marginTop: 10,
    padding: 15
  },
  transparentButtonText: {
    color: '#0485A9',
    textAlign: 'center',
    fontSize: 16
  },
  primaryButton: {
    margin: 10,
    padding: 15,
    backgroundColor: '#529ecc'
  },
  primaryButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18
  },
  image: {
    width: 100,
    height: 100
  }
});
