import React, { Component } from 'react'
import Home from '../screens/Home/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Stack =  createNativeStackNavigator()

export default class HomeNavigation extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
            component={Home}
            name='Home'
            options={{
                headerShown:false
            }}
        />
      </Stack.Navigator>
    )
  }
}