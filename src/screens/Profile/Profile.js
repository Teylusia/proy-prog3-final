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
        <Text style={styles.username}>{auth.currentUser.username}</Text>
        <Text style={styles.email}>{auth.currentUser.email}</Text>
        {
          auth.currentUser.biography ?
          <Text style={styles.description}>{auth.currentUser.biography}</Text>
          :
          <Text style={styles.description}>This user doesn't have a description</Text>
        }
        <Text style={styles.description}>this user has {this.state.allPosts.length} posts</Text>
        <TouchableOpacity onPress={() => this.signOut()}>
          <Text style={styles.signOut}>Sign Out</Text>
        </TouchableOpacity>
        {
          this.state.allPosts.length > 0 ?
          <FlatList 
          data={this.state.allPosts}
          keyExtractor={item => item.id.toString()}
          renderItem={ ({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data} deletePost={(() => this.deletePosts())} />}
          />
          :
          <Text>This user hasn't posted anything.</Text>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  email: {
    textAlign: 'center',
    color: '#d7e3fc',
    backgroundColor: '#809bce',
    fontSize: 16,
  },
  username: {
    textAlign: 'center',
    color: '#d7e3fc',
    backgroundColor: '#809bce',
    fontSize: 16,
  },
  description: {
    textAlign: 'center',
    color: '#d7e3fc',
    backgroundColor: '#809bce',
    fontSize: 16,
  },
  signOut:{
    color: '#d7e3fc',
    backgroundColor: '#809bce',
    borderRadius: 50,
    fontSize: 26,
    paddingHorizontal: 25,
    paddingVertical: 2,
    marginTop: 20,
  }
})
export default Profile;
