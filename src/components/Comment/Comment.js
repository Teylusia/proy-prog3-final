import React from 'react';
import { View, Text, StyleSheet} from 'react-native';


function Comment(props){
  return (
    <View style={styles.container}>
    <Text style={styles.userComment}>{props.creator}</Text>
    <Text style={styles.textComment}>{props.comment}</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#809bce',
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 15,
    width: '100%',
  },
  userComment: {
    fontSize: 16,
    color: 'ccdbfd',
  },
  textComment: {
    fontSize: 12,
    color: 'ccdbfd',
  }
})

export default Comment;
