import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import TabNavigation from './TabNavigation';
import Comments from '../screens/Comments/Comments';


function MainNavigation(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Login'
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='Register'
          component={Register}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='TabNavigation'
          component={TabNavigation}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Comments'
          component={Comments}
        />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
