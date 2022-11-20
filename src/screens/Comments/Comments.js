import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import { Component } from 'react'
import { db, auth} from '../../firebase/config';
import { firebase } from 'firebase';

class Comments extends Component {
  constructor(props){
    super(props)
    this.state = {
      newComment: '',
      id: '',
      data:{}
    }
  }
  



  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Comments;
