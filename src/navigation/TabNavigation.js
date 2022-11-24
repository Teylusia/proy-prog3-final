import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

import HomeNavigation from './HomeNavigation';
import Profile from '../screens/Profile/Profile';
import NewPost from '../screens/NewPost/NewPost';

function TabNavigation(){
  return (
    <Tab.Navigator>
      <Tab.Screen 
      name='Home Navigation'
      component={HomeNavigation}
      options={{
        headerShown: false,
        tabBarIcon: () => <FontAwesome name='home' size={16} color='#809bce' />
      }}
      />
      <Tab.Screen 
      name='Profile'
      component={Profile}
      options={{
        headerShown: false,
        tabBarIcon: () => <FontAwesome name='user' size={16} color='#809bce' />
      }}
      />
      <Tab.Screen 
      name='New Post'
      component={NewPost}
      options={{
        headerShown: false,
        tabBarIcon: () => <FontAwesome name='plus' size={16} color='#809bce' />
      }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
