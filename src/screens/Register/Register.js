import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { auth, db } from '../../firebase/config';



class Register extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
      biography: ''
    }
  }
  componentDidMount(){
    auth.onAuthStateChanged( user => {
      console.log(user)
    })
  }

  SignIn(username, email, password, biography){
    auth.createUserWithEmailAndPassword(email, password)
    .then(()=> {
        return(
            db.collection('users').add({
                email: email,
                username: username,
                biography: biography,
                createdAt: Date.now()
            })
        )
    })
    .then( () => {
      this.props.navigation.navigate('TabNavigation')
    })
    .catch(error => console.log(error))      
}



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.FormTitle}>Sign up!</Text>

        <Text style={styles.fieldName}>email</Text>
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
        <Text style={styles.fieldName}>Username</Text>
        <TextInput 
          style={styles.fieldInput}
          keyboardType='default'
          placeholder='username'
          onChangeText={ text => this.setState({username: text})}
          value={this.state.username}
        />
        <Text style={styles.fieldName}>Biography</Text>
        <TextInput 
          style={styles.fieldInput}
          keyboardType='default'
          placeholder='biography'
          onChangeText={ text => this.setState({biography: text})}
          value={this.state.biography}
        />

        <TouchableOpacity onPress={() => this.SignIn(this.state.username, this.state.email, this.state.password, this.state.biography)}>
          <Text style={styles.signInButton}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
        <Text style={styles.goToRegister}>Already got an account?</Text>
        </TouchableOpacity>
      </View>
    );
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

export default Register;
