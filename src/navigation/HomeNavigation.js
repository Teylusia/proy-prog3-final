import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home/Home';
import ProfileFriends from '../screens/ProfileFriends/ProfileFriends';

const Stack = createNativeStackNavigator();

function HomeNavigation(){
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name='Home'
      component={Home}
      options={{
        headerShown: false
      }}
      />
      <Stack.Screen 
      name='ProfileFriends'
      component={ProfileFriends}
      options={{
        headerShown: false
      }}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigation;
