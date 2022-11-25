import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../../firebase/config'

import Post from '../../components/Post/Post';
import SearchResult from '../../components/SearchResult/SearchResult';

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      allPosts: [],
      users: [],
      search: '',
      allUsers: [],
      msg: '',
    }
  }

  componentDidMount(){
    db.collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(5)
    .onSnapshot( docs =>{
      let posts = []
      docs.forEach(doc =>{
        posts.push({
          id:doc.id,
          data:doc.data()
        })

      })

      this.setState({
        allPosts: posts
      })
    })

    db.collection('users')
    .onSnapshot( docs =>{
      let users = []
      docs.forEach( doc =>{
        users.push({
          id: doc.id,
          data: doc.data()
        })
      })
      console.log(users);
      this.setState({
        allUsers: users
      })
    })
  }
  searchFunction(search){


    let filteringResults = this.state.allUsers.filter( user => {
      if(user.data.email.toLowerCase().includes(search)){
        return user
      }
    })

    if(filteringResults.length > 0){
      this.setState({
        users: filteringResults
      })
    }else{
      this.setState({
        msg: 'No hay usuarios con ese email',
        users: []
      })
    }
    console.log(this.state.users.length);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.homeTitle}>Home</Text>
        <View>
        <TextInput
        placeholder='Search users!'
        keyboardType='default'
        onChangeText={ text => this.setState({search: text})}
        value={this.state.password}
        />

        <TouchableOpacity onPress={ () => this.searchFunction(this.state.search)}>
          <FontAwesome name='search'  size={16} color='grey' />
        </TouchableOpacity>
        
        {
          this.state.users.length > 0 ? 
          <FlatList 
          data={this.state.users}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => { <SearchResult id={item.id} navigation={this.props.navigation} data={item.data} />}}
          />
          :
          <Text>{this.state.msg}</Text>
        }
      </View>
        <FlatList
        style={styles.postsList}
          data={this.state.allPosts}
          keyExtractor={ item => item.id.toString()}
          renderItem={ ({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%'
  },
  postsList:{
    flex: 1,
    width: '80%'
  },
  homeTitle: {
    fontSize: 26,
    textAlign: 'center',
    backgroundColor: '#809bce',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 20,
    paddingTop: 10,
    color: '#d7e3fc',
    width: '100%'
  }
})

export default Home;
