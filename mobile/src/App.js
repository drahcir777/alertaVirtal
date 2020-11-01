import React from 'react';
import { Image, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import UserCadastro from './pages/Cadastro'


// import { Container } from './styles';

const Stack = createStackNavigator();

function Logo() {
  return (
    <Image
      style={{ flex: 1, height: 1 }}
      source={require('./assets/logo.png')}
    />
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#2D2D2D" />
      <Stack.Navigator>
        <Stack.Screen name="CADASTRO" component={UserCadastro}
          options={{
            headerTitle: <Logo />, headerStyle: {
              backgroundColor: '#2D2D2D'
            }
          }}
        />

        <Stack.Screen name="MAIN" component={Main}
          options={{
            headerTitle: <Logo />, headerStyle: {
              backgroundColor: '#2D2D2D'
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
