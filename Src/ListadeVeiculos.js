import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../Styles/Index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const STORAGE_KEY_VEICULOS = '@veiculos';
const STORAGE_KEY_MANUTENCAO = '@manutencao';

const ListaVeiculos = ({ navigation }) => {
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    loadVeiculos();
  }, []);
  
  const deletarVeiculo = async (id) => {
    Alert.alert(
      'Confirmar',
      'Você realmente deseja deletar este veículo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: async () => {
            const updatedVeiculos = veiculos.filter(v => v.id !== id);
            await AsyncStorage.setItem(STORAGE_KEY_VEICULOS, JSON.stringify(updatedVeiculos));
            Alert.alert('Sucesso', 'Veículo deletado com sucesso!');
            loadVeiculos();

          },
        },
      ],
    );
  };
  
    const loadVeiculos = async () => {
      try {
        const storedVeiculos = await AsyncStorage.getItem(STORAGE_KEY_VEICULOS);
        if (storedVeiculos) {
          setVeiculos(JSON.parse(storedVeiculos));
        }
      } catch (error) {
        console.error(error);
      }

    };

    return (
    <View style={styles.container}>

      <View style={Styles.sectionStyle}>
              <Image
                  style={Styles.image}
                  source={require('../assets/LogoGCM.png')}
              />
              <Text style={Styles.text}>GUARDA CIVIL MUNICIPAL</Text>
      </View>

      <FlatList
        data={veiculos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CadastroManutencao', { veiculo: item })}>
            <View style={styles.veiculoItem}>
              <Text>Placa: {item.placa}</Text>
              <Text>Marca e Modelo: {item.modelo}</Text>
              <Text>Prefixo: {item.prefixo}</Text>
              <MaterialIcons style={{alignSelf:'flex-end'}} name="delete" size={30} color="#ff0000" onPress={() => deletarVeiculo(item.id)} />
             
            </View>
          </TouchableOpacity>
        )}
        style={styles.list}
      />
      {veiculos.length === 0 && (
        <Text style={styles.noData}>Nenhum Veículo Cadastrado.</Text>
      )} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#ccc',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  veiculoItem: {
    padding: 12,
    borderBottomWidth: 1,
    height: 110,
    borderWidth: 3,
    marginBottom: 14,
    marginTop: 10,
    borderRadius: 15,
    borderColor: '#fff',
  },
  list: {
    marginTop: 10,
  },
  noData: {
    marginTop: 20,
    textAlign: 'left',
    fontStyle: 'italic',
  },
});

export default ListaVeiculos;
