import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Game from '../screens/Game';
import Stats from '../screens/Stats';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Loading from '../screens/Loading';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Stats" component={Stats} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
