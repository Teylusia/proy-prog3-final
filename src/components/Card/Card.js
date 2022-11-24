import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native'


function Card(props){
  return (
    <View>
      <Image 
      style={styles.container}
      source={{uri: props.info.image}}
      resizeMode='contain'
      />
      <Text>{props.description}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
 container: {
  height: 400,
  width: 400,

 }
})

export default Card;
