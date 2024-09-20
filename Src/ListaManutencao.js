import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_MANUTENCAO = '@manutencao';

const ListaManutencao = ({ route }) => {
  const { veiculo } = route.params; 
  const [manutencoes, setManutencoes] = useState([]);

  useEffect(() => {
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

    loadManutencoes();
  }, [veiculo.id]); 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MANUTENÇOES - {veiculo.placa}</Text>
      <View>
      <FlatList
        data={manutencoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.manutencaoItem}>
            <Text>Data da Manutenção: {item.dataMnt}</Text>
            <Text>KM: {item.km}</Text>
            <Text>Descrição: {item.descricao}</Text>
          </View>
        )}
        style={styles.list}
      />
      {manutencoes.length === 0 && (
        <Text style={styles.noData}>Nenhuma manutenção cadastrada.</Text>
      )}   
      </View>
      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  manutencaoItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    
  },
  list: {
    marginTop: 20,
    
  },
  noData: {
    marginTop: 20,
    textAlign: 'left',
    fontStyle: 'italic',

  },
});

export default ListaManutencao;
