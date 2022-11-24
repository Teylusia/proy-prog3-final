import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';



class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myLike: false,
      likeCount: 0
    }
  }
    componentDidMount(){
      let myLike = this.props.data.likes.includes(auth.currentUser.email)
      if(myLike){
        this.setState({
          myLike: true
        })
      }
    }
    deletePosts(){
      db.collection('posts')
      .docs(this.props.id)
      .delete()
    }

  like(){
    db.collection('posts')
    .doc(this.props.id)
    .update({
      likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then( () => {
      this.setState({
        myLike: true,
        likeCount: this.state.likeCount + 1
      })
    })
  }

  unlike(){
    db.collection('posts')
    .doc(this.props.id)
    .update({
      likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then( () =>{
      this.setState({
        myLike: false,
        likeCount: this.state.likeCount - 1
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity  
        onPress={()=> this.props.navigation.navigate(
          'Home Navigation', 
          {
            screen: 'ProfileFriends',
            params:{
              email:this.props.data.creator
            }
          }
        )}>
          <Text style={styles.userName}>{this.props.data.creator}</Text>
        </TouchableOpacity>
        <Image 
        source={this.props.data.photo}
        style={styles.image}
        />
        <Text style={styles.description}>{this.props.data.description}</Text>
        <Text>{this.state.likeCount}</Text>  
        {
           this.state.myLike ?
                <TouchableOpacity onPress={()=> this.unlike()}>
                    <FontAwesome name='heart' color='black' size={16} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=> this.like()}>
                    <FontAwesome name='heart-o' color='red' size={16} />
                </TouchableOpacity>

        }
        <TouchableOpacity onPress={() => this.props.navigation.navigate(
            'Comments',
            {id:this.props.id}
            )}>
            <Text style={styles.viewComments}>Agregar comentario</Text>
          </TouchableOpacity>
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
  display:'flex',
  justifyContent: 'center',
  marginVertical: 20,
  backgroundColor: '#e1ecf7',
  width: '100%',
 },
 image: {
  height: 300,
  alignSelf: 'center',
  width: '100%',
},
 userName: {
  fontSize: 20,
  color: '#ccdbfd',
  backgroundColor: '#809bce',
  textAlign: 'left',
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  paddingHorizontal: 5,
  paddingBottom: 5
 },
 description: {
  color: '#ccdbfd',
  backgroundColor: '#809bce',
  fontSize: 16,
  textAlign: 'left',
  paddingBottom: 5
 },
 viewComments: {
  colo: '#ccdbfd',
  backgroundColor: '#809bce',
  textAlign: 'left',
  fontSize: 12,
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
  paddingBottom: 3,
  paddingLeft: 5
 }
})

export default Post;
