import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Navigator } from 'react-native';
import * as firebase from "firebase";
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import Account from './components/Account.js';
import List from './components/List.js';

const firebaseConfig = {
  apiKey: "AIzaSyCmae0n_mIBE2Z6dInYGuQDfoo9ELYJOak",
  authDomain: "auth-test-857dc.firebaseapp.com",
  databaseURL: "https://auth-test-857dc.firebaseio.com",
  storageBucket: "auth-test-857dc.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
       // the page is the screen we want to show the user, we will determine that
       // based on what user the firebase api returns to us.
       page: null
     };
     this.renderScene = this.renderScene.bind(this)
  }

  componentWillMount(){
     // We must asynchronously get the auth state, if we use currentUser here, it'll be null
     const unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
       // If the user is logged in take them to the accounts screen
       if (user != null) {
         this.setState({page: 'List'});
         console.log("logged in")
         console.log(this.state.page)
         return;
       }
       // otherwise have them login
       this.setState({page: 'Login'});
       console.log(this.state.page)
       // unsubscribe this observer
       unsubscribe();
     });
   }

   renderScene(route, navigator) {
     if (route.name === 'List') {
       return <List navigator ={navigator} firebaseApp={firebaseApp} />
     } else if (route.name === 'Account') {
       return <Account navigator={navigator} firebaseApp={firebaseApp } />
     }  else if (route.name === 'Login') {
       return <Login navigator={navigator} firebaseApp={firebaseApp } />
     }
   }

  render() {

     if (this.state.page) {

      return (
        // For now our navigator will always take us to the signup page.
        // We will use a transition where the new page will slide in from the right.
        <Navigator
          initialRoute={{name: this.state.page}}
          renderScene={this.renderScene} />
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Waiting</Text>
        </View>
      )
    }
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
