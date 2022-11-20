import {FontAwesome} from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

import HomeNavigation from './HomeNavigation';
import Profile from '../screens/Profile/Profile';
import Posts from '../screens/Posts/Posts';

function TabNavigation(){
  return (
    <Tab.Navigator>
        <Tab.Screen 
        name='TabHome' 
        component={HomeNavigation}
        options={{
            tabBarIcon: () => <FontAwesome name='home' size={16} color='blue' />,
            headerShown:false
        }}
        />
        <Tab.Screen
        name='Perfil'
        component={Profile}
        options={{
            tabBarIcon: () => <FontAwesome name='music' size={16} color='blue' />
        }}
        />
        <Tab.Screen
        name='NewPost'
        component={Posts}
        />
    </Tab.Navigator>
  );
}

export default TabNavigation;
