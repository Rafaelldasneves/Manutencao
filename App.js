import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastroVeiculo from './Src/CadastroVeiculo'; 
import ListaVeiculos from './Src/ListadeVeiculos'; 
import CadastroManutencao from './Src/CadastroManutencao';
import ListaManutencao from './Src/ListaManutencao';
import Home from './Src/Home';
import * as SplashScreen from 'expo-splash-screen';



SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{title:'Inicial'}} />
        <Stack.Screen name="Cadastro" component={CadastroVeiculo} options={{title:'Cadastro de Veículos'}} />
        <Stack.Screen name="ListadeVeiculos" component={ListaVeiculos} options={{title:'Lista de Veículos'}} />
        <Stack.Screen name="CadastroManutencao" component={CadastroManutencao} options={{title:'Cadastro de Manuenção'}} />
        <Stack.Screen name="ListaManutencao" component={ListaManutencao} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
