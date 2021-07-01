
import React from 'react';
import {
 Text
} from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//bring in all screens
import Home from './screens/Home'
import Add from './screens/Add'
import Edit from './screens/Edit'

const Stack  = createStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle:{
            backgroundColor: "#E8EAED"
          },
          title: 'Todo List',
          headerTitleStyle: {
            textAlign: "center",
            color: "#46B2E0",
            fontFamily:"fantasy",
            fontWeight:"bold",
            fontSize:25,
          }
        }}
        >

        </Stack.Screen>
        <Stack.Screen
        name="Add"
        component={Add}
        options={{
          headerStyle:{
            backgroundColor: "#E8EAED"
          },
          headerTitleStyle: {
           
            color: "#E8EAED"
          }
         
        }}
        >

        </Stack.Screen>
        <Stack.Screen
        name="Edit"
        component={Edit}
        options={{
          headerStyle:{
            backgroundColor: "#E8EAED"
          },
          headerTitleStyle: {
           
            color: "#E8EAED"
          }
         
            
          
        }}
        >

        </Stack.Screen>
      </Stack.Navigator>
      
    </NavigationContainer>
  )
}

export default App;
