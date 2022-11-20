import React, { Component } from 'react';

import { Text, View, TouchableOpacity, FlatList, StyleSheet} from 'react-native'
import {db} from '../../firebase/config'
import Post from '../../components/Post/Post';


class Home extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    db.collection('posts').orderBy('createdAt', 'desc').limit(5)
    .onSnapshot( docs =>{
      let posts = [];
      docs.forEach(doc =>{
        posts.push({
          id: doc.id,
          data: doc.data()
        })
      })
    this.setState({
      allPosts: posts,
    })
    
    })
  }

  render() {
    return (
      <View> 
        <View>
          <Text>Home</Text>  
        </View>
        <View>
        <FlatList 
          data={this.state.allPosts}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data} />}
        />
        </View>
      </View>

    );
  }
}

export default Home;
