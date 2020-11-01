import React, {useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, Button } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import api from '../services/api';

function UserCadastro({navigation}) {

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [latitude, setLatitude] = useState('');
   const [longitude, setLongitude] = useState('');

  useEffect(() => {
      Geolocation.requestAuthorization("whenInUse")
        .then(resposta => {
          if (resposta) {
            Geolocation.getCurrentPosition(local => {
              const { coords } = local
              const { latitude, longitude } = coords

              setLatitude(latitude)
              setLongitude(longitude)

            })
          }
          
        })
  }, []);

  async function cadastrar(){
    
    const response = await api.post('/users', {
      name,
      email,
      latitude,
      longitude
    })

    console.log(response.data);
  }

  console.log(name)
  console.log(email)
  console.log(latitude)
  console.log(longitude)

    return (
            <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
              <Text style={styles.title}>Dados</Text>
        
    <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={text => setName(text)}
              />
        
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, { height: 56 }]}
                multiline
                value={email}
                onChangeText={text => setEmail(text)}
              />
              <Button style={styles.nextButton} 
                title= "Cadastrar"
                onPress={cadastrar}
              />
              <Button style={styles.nextButton} 
                title= "Localizar"
                onPress={() => navigation.navigate('MAIN')}
              />
            </ScrollView>
        
    )
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    title: {
      color: '#5c8599',
      fontSize: 24,
      marginBottom: 32,
      paddingBottom: 24,
      borderBottomWidth: 0.8,
      borderBottomColor: '#D3E2E6'
    },
  
    label: {
      color: '#8fa7b3',
      marginBottom: 8,
    },
    input: {
      backgroundColor: '#fff',
      borderWidth: 1.4,
      borderColor: '#d3e2e6',
      borderRadius: 20,
      height: 56,
      paddingVertical: 18,
      paddingHorizontal: 24,
      marginBottom: 16,
      textAlignVertical: 'top',
    },
    nextButton: {
      backgroundColor: '#FFC513',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      height: 56,
      marginTop: 32,
    },
  
    nextButtonText: {
      fontSize: 16,
      color: '#FFF',
    }
  })
  export default UserCadastro;
