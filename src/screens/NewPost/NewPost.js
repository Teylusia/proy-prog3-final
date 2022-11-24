import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {auth, db} from '../../firebase/config'

import Camara from '../../components/Camara/Camara';


class NewPost extends Component {
  constructor(props){
    super(props)
    this.state = {
      description: '',
      showCamera: true,
      photoUrl: ''
    }
  }

  sendPost(description){
    db.collection('posts').add({
      creator: auth.currentUser.email,
      createdAt: Date.now(),
      description: description,
      photo: this.state.photoUrl,
      comments: [],
      likes: []
    })
    .then(() => 
      this.setState({
        description: '',
        showCamera: true,
        photoUrl: ''
      }, console.log(auth.currentUser.username))
      )
      .then(() => this.props.navigation.navigate('Home'))
    .catch( error => console.log(error))
  }

  imageUpload(url){
    this.setState({
      showCamera: false,
      photoUrl: url
    })
  }


  
  render() {
    console.log(this.state)
    return (
      <View>
        {
          this.state.showCamera ?
          <Camara imageUpload={(url) => this.imageUpload(url)} />
          :
          <View>
            <TextInput 
            style={styles.fieldInput}
            keyboardType='default'
            onChangeText={(text) => this.setState({description: text})}
            value={this.state.description}
            placeholder='description'
            />

            <TouchableOpacity onPress={() => this.sendPost(this.state.description)}>
              <Text style={styles.goToRegister}>Create Post</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  goToRegister: {
    color:  '#d7e3fc',
    backgroundColor: '#809bce',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 50,
    fontSize: 16,
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
  
})

export default NewPost;
