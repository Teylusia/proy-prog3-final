import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { auth } from '../../firebase/config';


class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }
  componentDidMount(){
    auth.onAuthStateChanged( user => {
      console.log(user)
    })
  }

  SignIn(email, password){
    auth.signInWithEmailAndPassword(email, password)
    .then( () => { 
      this.props.navigation.navigate('TabNavigation')
    })
    .catch( error => console.log(error))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.FormTitle}>Sign in!</Text>

        <Text style={styles.fieldName}>Email</Text>
        <TextInput 
          style={styles.fieldInput}
          keyboardType='email-address'
          placeholder='email'
          onChangeText={ text => this.setState({email: text})}
          value={this.state.email}
        />

        <Text style={styles.fieldName}>Password</Text>
        <TextInput 
          style={styles.fieldInput}
          keyboardType='default'
          placeholder='password'
          onChangeText={ text => this.setState({password: text})}
          value={this.state.password}
        />
        {
          this.state.email === '' || this.state.password === '' ?
          <TouchableOpacity>
            <Text style={styles.greySignInButton}>Sign In</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => this.SignIn(this.state.email, this.state.password)}>
            <Text style={styles.signInButton}>Sign In</Text>
          </TouchableOpacity>
        }

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.goToRegister}>Create an account now!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 600,
    backgroundColor: '#edf2fa',
    display: 'flex',
    alignItems:'center',
    justifyContent: 'center',
  },
  FormTitle: {
    fontSize: 45,
    color: '#95b8d1'
  },
  fieldInput: {
    margin: 10, 
    color: '#ccdbfd',
    fontSize: 16,
    backgroundColor: '#809bce',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minWidth: 25
  },
  fieldName:{
    fontSize: 20,
    color: '#74a892',
    paddingHorizontal: 20,
    paddingVertical: 2,
    margin: 10,
    borderRadius: 50,
  },
  signInButton: {
    color: '#d7e3fc',
    backgroundColor: '#809bce',
    borderRadius: 50,
    fontSize: 26,
    paddingHorizontal: 25,
    paddingVertical: 2,
    marginTop: 20,
  },
  greySignInButton: {
    color: '#d7d7d7',
    backgroundColor: '#A0A0A0',
    borderRadius: 50,
    fontSize: 26,
    paddingHorizontal: 25,
    paddingVertical: 2,
    marginTop: 20,
  },
  goToRegister: {
    color:  '#d7e3fc',
    backgroundColor: '#809bce',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 50,
    fontSize: 16,
  }
})


export default Login;
