import React, { useState } from 'react';
import { View,Text, TextInput, Alert, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../Styles/Index';
import Botao from './components/Button';


const STORAGE_KEY = '@veiculos';

const CadastroVeiculo = ({ navigation }) => {
  const [placa, setPlaca] = useState('');
  const [prefixo, setPrefixo] = useState('');
  const [modelo, setModelo] = useState('');


  const cadastrarVeiculo = async () => {
    if (placa && prefixo && modelo) {
      const novoVeiculo = { id: Date.now().toString(), placa, prefixo, modelo };
      try {
        const storedVeiculos = await AsyncStorage.getItem(STORAGE_KEY);
        const veiculos = storedVeiculos ? JSON.parse(storedVeiculos) : [];
        veiculos.push(novoVeiculo);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(veiculos));
        setPlaca('');
        setPrefixo('');
        setModelo('');
        Alert.alert('Sucesso', 'Veículo cadastrado com sucesso!');
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível salvar o veículo.');
      }
    } else {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.sectionStyle}>
      <Image
        style={Styles.image}
        source={require('../assets/LogoGCM.png')}
      />
      <Text style={Styles.text}>GUARDA CIVIL MUNICIPAL</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Placa"
        autoCapitalize='characters'
        value={placa}
        onChangeText={setPlaca}
      />
      <TextInput
        style={styles.input}
        placeholder="Marca e Modelo"
        autoCapitalize='words'
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        style={styles.input}
        placeholder="Prefixo"
        autoCapitalize='words'
        value={prefixo}
        onChangeText={setPrefixo}
         
      />

      <View>
        <Botao labelButton ="Cadastrar Veículo" onPress={cadastrarVeiculo} />
        <Botao labelButton ="Ver Lista de Veículos" onPress={() => navigation.navigate('ListadeVeiculos')}/>
              
      </View>
      
      
    </View>
    
  );
};

const styles = StyleSheet.create({
  
  input: {
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 18,
    paddingHorizontal: 12,
    marginBottom: 14,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderColor: '#000',
    
},

});

export default CadastroVeiculo;
