import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, NavigatorIOS } from 'react-native';
import Login from '../components/Login.js';

export default class Signup extends React.Component {
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

  signup() {

   // Make a call to firebase to create a new user.
   this.props.firebaseApp.auth().createUserWithEmailAndPassword(
     this.state.email,
     this.state.password).then(() => {
       // then and catch are methods that we call on the Promise returned from
       // createUserWithEmailAndPassword
       alert('Your account was created!');
       this.setState({
         // Clear out the fields when the user logs in and hide the progress indicator.
         email: '',
         password: '',
         loading: false
       });
   }).catch((error) => {
     // Leave the fields filled when an error occurs and hide the progress indicator.
     this.setState({
       loading: false
     });
     alert("Account creation failed: " + error.message );
   });
 }

 goToLogin(){
   this.props.navigator.push({
     component: Login
   })
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
        <TouchableHighlight onPress={this.signup.bind(this)} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Signup</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.goToLogin.bind(this)} style={styles.transparentButton}>
          <Text style={styles.transparentButtonText}>Already have an account?</Text>
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
