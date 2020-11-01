import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import api from '../services/api'

// import { Container } from './styles';

function Main() {

  const [currentRegion, setCurrentRegion] = useState(null)
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function carregarLocalizacao() {
      Geolocation.requestAuthorization("whenInUse")
        .then(resposta => {
          if (resposta) {
            Geolocation.getCurrentPosition(local => {
              const { coords } = local
              const { latitude, longitude } = coords

              setCurrentRegion({
                latitude,
                longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04
              })

            })
          }
        })

    }
    carregarLocalizacao();
  }, []);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/users');
      setUsuarios(response.data)
    }
    loadUsers();
  }, [usuarios])

  async function deleteLocation(){

    const response = await api.delete('/users/', {
       
    })

  }
  
  
  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null
  }

  return (
    <>
      <MapView 
      onRegionChangeComplete={handleRegionChanged} 
      initialRegion={currentRegion}
      style={styles.map}>
        {usuarios.map(user => (
          <Marker
            key={user._id}
            coordinate={{ latitude: user.location.coordinates[1], longitude: user.location.coordinates[0] }}>
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.name}>{user.name}</Text>
                <Text tyle={styles.email}>{user.email}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TouchableOpacity style={styles.loadButton}>
          <Text>📍</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 50,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#fff'

  },
  callout: {
    width: 200
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16
  },
  email: {
    fontSize: 16
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FFC513',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  }
})

export default Main;