import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ToolbarAndroid
} from 'react-native';
import React, {Component} from 'react';
import Login from '../components/Login.js';
import List from '../components/List.js';

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

    this.navigate = this.navigate.bind(this)
  }

  componentWillMount() {
    // get the current user from firebase
    const userData = this.props.firebaseApp.auth().currentUser;
    this.setState({
      user: userData,
    });
  }

  logout() {
    // logout, once that is complete, return the user to the login screen.
    this.props.firebaseApp.auth().signOut().then(() => {
      this.props.navigator.push({
        component: Login
      });
    });
  }

  navigate(name){
    this.props.navigator.push({
      name
    });
  }

  render() {
    return (
      <View style={styles.container}>

      <View style={styles.body}>
        {this.state.user &&
        <View>
          <View style={accountStyles.email_container}>
            <Text style={accountStyles.email_text}>{this.state.user.email}</Text>
          </View>

          <TouchableHighlight onPress={this.logout.bind(this)} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Logout</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.props.navigator.pop()} style={styles.transparentButton}>
            <Text style={styles.transparentButtonText}>Back</Text>
          </TouchableHighlight>
        </View>
      }
      </View>
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

const accountStyles = StyleSheet.create({
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});
