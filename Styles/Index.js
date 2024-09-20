import * as React from 'react';
import { StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignSelf:'stretch',
      backgroundColor: '#ccc',
      padding: 10,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
    
    },
    text: {
      color: '#1414b8',
      fontSize: 24,
      fontStyle:'italic',
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: 1,
      paddingHorizontal: 2,
      marginRight: 10,
      
    },
    buttonstyle: {
      backgroundColor: '#fff',
      width: 380,
      height: 290,
      justifyContent:'center',
      alignItems: 'center',
      marginBottom: 30,

    
    },
    title: {
      flex: 0,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
    },
    sectionStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#000',
      height: 70,
      borderRadius: 15,
      margin: 2,
    },
    image: {
      padding: 3,
      margin: 1,
      height: 75,
      width: 75,
      resizeMode: 'stretch',
      alignItems: 'center',
    },
    input: {
      height: 50,
      borderColor: '#fff',
      borderWidth: 1,
      marginBottom: 18,
      paddingHorizontal: 12,
      marginTop: 50,
      backgroundColor: '#fff',
      borderRadius: 15,
      borderColor: '#000',
      
  },
      
  });