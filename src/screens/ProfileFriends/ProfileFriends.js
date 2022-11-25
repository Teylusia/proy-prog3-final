import React, { Component } from 'react';
import { auth, db} from '../../firebase/config';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator} from 'react-native';

import Post from '../../components/Post/Post';


class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mailFriend: props.route.params.email,
      allPosts: [],
      userInfo: [],
    }
  }

  componentDidMount(){
    db.collection('posts')
    .where('creator', '==', this.state.mailFriend)
    .onSnapshot(docs => {
        let posts = []
        docs.forEach(doc => posts.push({
            id:doc.id,
            data: doc.data()
        }))
        console.log(posts);
        this.setState({
            allPosts: posts
        })
    })

    db.collection('users')
    .where('email', '==', this.state.mailFriend)
    .onSnapshot( docs =>{
      let userInfo = []
      docs.forEach(doc =>{
        console.log(doc)
        userInfo.push({
          id: doc.id,
          data: doc.data()
        })
      })
      console.log(userInfo);
      console.log(this.state.mailFriend);
      this.setState({
        userInfo: userInfo
      })
    })
}
  render() {
    return (
      <View>
        {
          this.state.userInfo.length > 0 ?
          <View> 
        <Text style={styles.username}>{this.state.userInfo[0].username}</Text>
        <Text style={styles.email}>{this.state.userInfo[0].email}</Text>
        {
          this.state.userInfo[0].biography ?
          <Text style={styles.description}>{this.state.userInfo[0].biography}</Text>
          :
          <Text style={styles.description}>This user doesn't have a description</Text>
        }
        <Text>this user has {this.state.allPosts.length} posts</Text>
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
          :
          <ActivityIndicator size='large' color='green' />
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
