import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {auth, db} from '../../firebase/config'
import Camara from '../../components/Camera/Camera'

class Posts extends Component { 
  constructor(){
    super()
    this.state= {
      showCamera: true,
    }
  }
  newPost(description){
    db.collection('posts').add({
      owner: auth.currentUser.email,
      createdAt: Date.now(),
      description: description,
      likes:[],
      comments: []
    })
  }

  uploadPhoto(url){
    this.setState({
      urlPhoto: url,
      showCamera: false
    })
  }

  render(){
    return(
      <View>
        {
        this.state.showCamera
        ?
            <Camara uploadPhoto = {(url) => this.uploadPhoto(url)}/>
            :
            <div>
              <TextInput 
              keyboardType='default'
              onChangeText={ text => this.setState({ description: text})}
              placeholder='Descripcion'
              />
              <TouchableOpacity onPress={ () =>{this.newPost(this.state.description)}}>
              <Text>Submit</Text>
              </TouchableOpacity>
            </div>
        }
      </View>
    )
  }
}

export default Posts