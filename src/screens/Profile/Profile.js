import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { auth, db } from '../../firebase/config'


class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentDidMount(){
    db.collection('posts').onSnapshot(docs =>{
      let comments = []
      docs.forEach(doc =>{
        comments.push({
          id: doc.id,
          data: doc.data()
        })
      })

      this.setState({
        Comments: comments
      })
    })
  }

  signOut(){
    auth.signOut()
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <View>
      <Text>Profile</Text> 
      <TouchableOpacity>
        <Text>Sign Out</Text>
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
})

export default Profile;
