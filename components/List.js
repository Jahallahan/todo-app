import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ListView,
  AlertIOS
} from 'react-native';
import React, {Component} from 'react';
import Login from '../components/Login.js';
import Account from '../components/Account.js';
import StatusBar from '../components/StatusBar.js'
import ActionButton from '../components/ActionButton.js'
import ListItem from '../components/ListItem.js'

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };

    this.itemsRef = this.props.firebaseApp.database().ref(this.props.firebaseApp.auth().currentUser.uid + '/list/');

    this.navigate = this.navigate.bind(this)
  }

  componentWillMount() {
    // get the current user from firebase
    const userData = this.props.firebaseApp.auth().currentUser;
    this.setState({
      user: userData,
    });
  }


  componentDidMount() {
      this.listenForItems(this.itemsRef);
    }


  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  renderItem(item) {
    const onPress = () => {
      AlertIOS.prompt(
        'Complete',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancel')}
        ],
        'default'
      );
    };

      return (
        <ListItem item={item} onPress={onPress} />
      );
    }

    addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
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
          <View style={styles.container}>

            <StatusBar title="Grocery List" />

          <ListView dataSource={this.state.dataSource} renderRow={this.renderItem.bind(this)} style={styles.listview} enableEmptySections={true} />

            <ActionButton title="Add" onPress={this.addItem.bind(this)}>
            </ActionButton>
            <TouchableHighlight onPress={() => this.navigate('Account')} style={styles.transparentButton}>
              <Text style={styles.transparentButtonText}>Account</Text>
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
