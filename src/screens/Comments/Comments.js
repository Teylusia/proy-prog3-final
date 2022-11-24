import React, { Component } from 'react';
import { View, TextInput, StyleSheet,   FlatList, TouchableOpacity, Text }  from 'react-native';
import {db, auth} from '../../firebase/config';
import firebase from 'firebase'; 

import Comment from '../../components/Comment/Comment';

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newComment: '',
      data: {},
      id: ''
    }
  }
  componentDidMount(){
    db.collection('posts')
    .doc(this.props.route.params.id)
    .onSnapshot( doc => {
      this.setState({
        id: doc.id,
        data: doc.data(),
      })
    })
  }

  addComment(idDoc, text){
    db.collection('posts')
    .doc(idDoc)
    .update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        creator: auth.currentUser.email,
        createdAt: Date.now(),
        comment: text
      })
    })
  }

  render() {
    return (
      <View>
        <View>
        <FlatList 
          style={styles.commentList}
          data={this.state.data.comments}
          keyExtractor={item => item.createdAt.toString()}
          renderItem={({item}) => <Comment comment={item.comment} creator={item.creator} />}
          />
        </View>
        <View>
        <TextInput
            style={styles.commentInput}
            onChangeText={text => this.setState({newComment: text})}
            keyboardType='default'
            placeholder='comment now!'
            value={this.state.nuevoComentario}
          />
          <TouchableOpacity onPress={()=> this.addComment(this.state.id, this.state.newComment)}>
            <Text style={styles.postComment}>Enviar comentario</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  commentInput: {
    margin: 10, 
    color: '#ccdbfd',
    fontSize: 16,
    backgroundColor: '#809bce',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minWidth: 25
  },
  commentList: {
    width: '90%'
  },
  postComment: {
    color: '#d7e3fc',
    backgroundColor: '#809bce',
    borderRadius: 50,
    fontSize: 26,
    paddingHorizontal: 25,
    paddingVertical: 2,
    marginTop: 20,
  }
})

export default Comments;
