import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../Styles/Index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Botao from './components/Button';


const STORAGE_KEY_MANUTENCAO = '@manutencao';

const CadastroManutencao = ({ route }) => {
  const { veiculo } = route.params;
  const [dataMnt, setDataMnt] = useState('');
  const [km, setKm] = useState('');
  const [descricao, setDescricao] = useState('');

  const [manutencoes, setManutencoes] = useState([]);

  useEffect(() => {
    loadManutencoes();
  }, []);

  const loadManutencoes = async () => {
    try {
      const storedManutencoes = await AsyncStorage.getItem(STORAGE_KEY_MANUTENCAO);
      const todasManutencoes = storedManutencoes ? JSON.parse(storedManutencoes) : [];
      const manutencoesVeiculo = todasManutencoes.filter(m => m.veiculoId === veiculo.id);
      setManutencoes(manutencoesVeiculo);
    } catch (error) {
      console.error('Erro ao carregar manutenções:', error);
    }
  };

  const cadastrarManutencao = async () => {
    if (descricao && dataMnt && km) {
      const manutencao = { id: Date.now().toString(), descricao, dataMnt, km, veiculoId: veiculo.id };

      try {
        const storedManutencoes = await AsyncStorage.getItem(STORAGE_KEY_MANUTENCAO);
        const manutencoes = storedManutencoes ? JSON.parse(storedManutencoes) : [];
        manutencoes.push(manutencao);
        await AsyncStorage.setItem(STORAGE_KEY_MANUTENCAO, JSON.stringify(manutencoes));
        setDescricao('');
        setDataMnt('');
        setKm('');
        Alert.alert('Sucesso', 'Manutenção cadastrada com sucesso!');
        loadManutencoes();
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível salvar a manutenção.');
      }
    } else {
      Alert.alert('Atenção', 'Por favor, preencha a descrição da manutenção.');
    }
  };

  const deletarManutencao = async (id) => {
    const updatedManutencoes = manutencoes.filter(m => m.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY_MANUTENCAO, JSON.stringify(updatedManutencoes));
    loadManutencoes();
    Alert.alert('Sucesso', 'Manutenção deletada com sucesso!');
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

      <Text style={styles.title}>CADASTRAR MANUTENÇÃO</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Data da Manutenção"
        value={dataMnt}
        onChangeText={setDataMnt}
      />
      <TextInput
        style={styles.input}
        placeholder="KM"
        keyboardType='numeric'
        value={km}
        onChangeText={setKm}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição da Manutenção"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Botao labelButton="Cadastrar Manutenção" onPress={cadastrarManutencao} />

      <Text style={styles.title2}>LISTA DE MANUTENÇÃO - {veiculo.placa}</Text>
      <FlatList
        data={manutencoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.manutencaoItem}>
           <Text>Data da Manutenção: {item.dataMnt}</Text>
           <Text>KM: {item.km}</Text>
            <Text>Descrição: {item.descricao}</Text>
            <View style={styles.buttonContainer}>
              <MaterialIcons name="delete" size={30} color="#ff0000" onPress={() => deletarManutencao(item.id)} />
            </View>
          </View>
        )}
        style={styles.list}
      />
      {manutencoes.length === 0 && (
        <Text style={styles.noData}>Nenhuma manutenção cadastrada.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
      padding: 10,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  manutencaoItem: {
    padding: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
  },
  buttonContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  list: {
    marginTop: 10,
  },
  noData: {
    marginTop: 20,
    textAlign: 'justify',
    fontStyle: 'italic',
  },
  input: {
    height: 40,
    borderWidth: 2,
    marginBottom: 5,
    paddingHorizontal: 16,
    marginTop: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderColor: '#000',
  }
});

export default CadastroManutencao;
