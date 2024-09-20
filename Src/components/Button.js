import react from "react";
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const Botao = ({labelButton , onPress}) => {
    return (
        <TouchableOpacity style= {styles.button}
            onPress={onPress}>
            <Text>{labelButton} </Text>
        </TouchableOpacity>
    )

    }
export default Botao

const styles = StyleSheet.create ({
    button:{
        backgroundColor: '#4682B4',
        width: 280,
        height: 40,
        justifyContent:'center',
        alignItems: 'center',
        marginBottom: 10,    
        borderRadius: 15,
        marginHorizontal:'auto',
        marginTop: 30,
    
    },

})