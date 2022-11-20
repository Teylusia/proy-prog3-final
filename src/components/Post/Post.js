import React, { Component } from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {db, auth} from '../../firebase/config';
import firebase from 'firebase';

class Post extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentDidMount(){

  }

  render() {
    return (
      <View> 
        <Text>{this.props.data.description}</Text>
      </View>
    );
  }
}

export default Post;
