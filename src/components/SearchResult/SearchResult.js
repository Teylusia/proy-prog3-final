import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';


function SearchResult(props){
  return (
    <View>
      <TouchableOpacity>
      <TouchableOpacity onPress={()=> this.props.navigation.navigate(
          'Home Navigation', 
          {
            screen: 'ProfileFriends',
            params:{
              email:this.props.data.creator
            }
          }
        )}>
          <Text>{props.email}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

export default SearchResult;
