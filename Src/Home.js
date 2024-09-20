import React, { useState } from 'react';
import { View,Text, TextInput, Alert, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../Styles/Index';
import Botao from './components/Button';



const Home = ({ navigation }) => {
  
  return (
    <View style={Styles.container}>
      <View style={Styles.sectionStyle}>
      <Image
        style={Styles.image}
        source={require('../assets/LogoGCM.png')}
      />
      <Text style={Styles.text}>GUARDA CIVIL MUNICIPAL</Text>
      </View>
         <Image
          style={styles.imageTela}
          source={require('../assets/Logo.png')}
        />
      <View>
        <Botao labelButton ="Cadastrar Veículo" onPress={() => navigation.navigate('Cadastro')}/>
        <Botao labelButton ="Lista de Veículo" onPress={() => navigation.navigate('ListadeVeiculos')}/>

      </View>

    </View>
    
  );
};

const styles = StyleSheet.create({
  imageTela: {
        marginTop: 50,
        height: 320,
        width: 320,
        justifyContent:"center",
        padding: 3,
        marginHorizontal:'auto',
        alignItems: 'center',
      },

});

export default Home;
