import React, { Component } from 'react';

import { View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import { auth } from '../../firebase/config';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  Login(email, pass){
    auth.signInWithEmailAndPassword(email, pass)
    .then( () => this.props.navigation.navigate('TabNavigation'))
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.fieldName}>Logueate!</Text>
        <TextInput style={styles.infoInput}
        keyboardType='email-address'
        placeholder='email'
        onChangeText={ text => this.setState({email: text}) }
        value={this.state.email}
        />
        <TextInput style={styles.infoInput}
        keyboardType='default'
        placeholder='password'
        onChangeText={ text => this.setState({password: text}) }
        value={this.state.password}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.Login(this.state.email, this.state.password)}>
          <Text  style={styles.buttonName}>Aceptar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register')}>
        <Text style={styles.fieldName}>Registrate</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#031926',
    display: 'flex',
    alignItems:'center',
    justifyContent: 'center',
    height: 500,
  },
  fieldName:{
    marginTop: 10, 
    color: '#9DBEBB',
    fontSize: 16,

  },
  infoInput: {
    backgroundColor: '#468189',
    width: 200,
    borderRadius: 50,
    padding: 'offset',
    margin: 10
  },
  button: {
    width: 75,
    marginTop: 20, 
    backgroundColor: '#77ACA2',
    borderRadius: 25,
  },
  buttonName: {
    color: '#468189',
    textAlign: 'center',
  }
})
export default Login;
