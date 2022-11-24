import React, { Component } from 'react';
import { auth, db} from '../../firebase/config';
import { View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

import Post from '../../components/Post/Post';


class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allPosts: []
    }
  }

  componentDidMount(){
    db.collection('posts')
    .where('creator', '==', auth.currentUser.email)
    .onSnapshot(docs =>{
      let posts = []
      docs.forEach(doc =>{
        posts.push({
          id: doc.id,
          data: doc.data()
        })
      })

      this.setState({
        allPosts: posts
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
        <Text>{auth.currentUser.username}</Text>
        <Text>{auth.currentUser.email}</Text>
        {
          auth.currentUser.biography ?
          <Text>{auth.currentUser.biography}</Text>
          :
          <Text>This user doesn't have a description</Text>
        }
        <Text>this user has {this.state.allPosts.length} posts</Text>
        <TouchableOpacity onPress={() => this.signOut()}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
        {
          this.state.allPosts.length > 0 ?
          <FlatList 
          data={this.state.allPosts}
          keyExtractor={item => item.id.toString()}
          renderItem={ ({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data} />}
          />
          :
          <Text>This user hasn't posted anything.</Text>
        }

      </View>
    );
  }
}

export default Profile;
