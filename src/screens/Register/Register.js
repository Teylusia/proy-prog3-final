import React, { Component } from 'react';

import { Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import { auth, db } from '../../firebase/config' 

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  Register(email, user, pass, minibio){
    auth.createUserWithEmailAndPassword(email, pass)
    .then( () =>{
      db.collection('usuarios').add({
        email: email,
        user: user,
        password: pass,
        minibio: minibio,
        createdAt: Date.now(),
      })}
    ).then( (res) =>{
      this.props.navigation.navigate('Home')
    }).catch(err => console.log(err))
  }
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.fieldName}>Registrate!</Text>
         <Text style={styles.fieldName}>Email</Text>
        <TextInput style={styles.infoInput}
        keyboardType='email-address'
        placeholder='email'
        onChangeText={ text => this.setState({email: text}) }
        value={this.state.email}
        />
        <Text style={styles.fieldName}>Usuario</Text>
        <TextInput style={styles.infoInput}
        keyboardType='default'
        placeholder='usuario'
        onChangeText={ text => this.setState({userName: text}) }
        value={this.state.userName}
        />
        <Text style={styles.fieldName}>Password</Text>
        <TextInput style={styles.infoInput}
        keyboardType='default'
        placeholder='password'
        onChangeText={ text => this.setState({password: text}) }
        value={this.state.password}
        />
        <Text style={styles.fieldName}>Mini Bio</Text>
        <TextInput style={styles.infoInput}
        keyboardType='default'
        placeholder='mini bio'
        onChangeText={ text => this.setState({bio: text}) }
        value={this.state.bio}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.Register(this.state.email, this.state.userName, this.state.password, this.state.bio)}>
          <Text style={styles.buttonName}>Aceptar</Text>
        </TouchableOpacity>
        <Text style={styles.fieldName}>Ya tienes Cuenta</Text>
        <TouchableOpacity onPress={ () => {this.props.navigation.navigate('Login')}}>
          <Text style={styles.fieldName}>Logueate</Text>
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
    height: 550,
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
    padding: 'offset'
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

export default Register;
