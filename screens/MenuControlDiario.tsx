import * as React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';

import { ImageBackground, Text, View } from 'react-native';
import { Avatar, Icon, ListItem, Button, SearchBar } from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import {
  ToastAndroid
} from 'react-native';
import { useEffect, useState } from 'react';

export default function MenuControlDiario({
  navigation,
}: StackScreenProps<RootStackParamList>) {
  const [list, setList] = useState([{nombre: "No hay alimentos", calorias: "0", foto: "https://image.freepik.com/free-vector/engraving-hand-drawn-shawarma-illustration_23-2148994562.jpg"},]);
  interface foodObject {nombre: string, calorias: string, foto: string, fecha: Date}
  const [cambio, setCambio] = useState(0)
  const [search, setSearch] = useState("")

  async function addFood(nombre: string, foto: string, calorias: string,) {    
    var food:foodObject = { nombre: nombre, calorias: calorias, foto: foto, fecha: new Date()}
    var listado:foodObject[] = []
    listado.push(food)
    const listaComidas = await AsyncStorage.getItem('historial')

    if(listaComidas){
      var array = JSON.parse(listaComidas)
      array.push(food)
      await AsyncStorage.setItem('historial', JSON.stringify(array))
    }else{
      await AsyncStorage.setItem('historial', JSON.stringify(listado))
    }
    ToastAndroid.show("Plato añadido, puedes verlo en el historial", ToastAndroid.SHORT)
  }

  async function deleteFood(arg0: string, caloriasComida: string, fotoComida: string) {
    const listaComidas = await AsyncStorage.getItem('listaComidas')
    if(listaComidas){
      var array = JSON.parse(listaComidas)
      
      if(array.nombre != ""){
        var salto = false
        array.forEach( (comida, index) => {
          if(comida.nombre == arg0 && comida.calorias == caloriasComida && comida.foto == fotoComida && salto == false){
            array.splice(index, 1)
            salto = true
          }
        });
        setList(array)
        await AsyncStorage.setItem('listaComidas', JSON.stringify(array))
        setCambio(cambio+1)
      }
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      rellenaLista()
    });
    rellenaLista()
  }, [cambio])

  async function rellenaLista(){
    const listaComidas = await AsyncStorage.getItem('listaComidas')
    if(listaComidas){
      if(JSON.parse(listaComidas).nombre != ""){
        setList(JSON.parse(listaComidas))
      }
      
    }
  }

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = list.filter(function (item) {
        const itemData = item.nombre
          ? item.nombre.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setList(newData);
      setSearch(text);
    } else {
      rellenaLista()
      setSearch(text);
    }
  };
  return (
    <ImageBackground style={ styles.imgBackground } 
                 resizeMode='cover' 
                 source={require('../assets/images/habitacion.png')}>
                   
        <SafeAreaView style={styles.safeAreaView}>
        <SearchBar
          round
          searchIcon={{ size: 28, color: 'black' }}
          clearIcon={{ size: 24, color: 'black' }}
          onChangeText={text => searchFilterFunction(text)}
          onClear={text => searchFilterFunction('')}
          placeholder="Buscar"
          value={search}
          inputStyle={{backgroundColor: '#9EC6F3', color: 'black'}}
          containerStyle={{backgroundColor: '#9EC6F3', borderTopColor: '#9EC6F3', borderBottomColor: '#9EC6F3'}}
          inputContainerStyle={{backgroundColor: '#9EC6F3'}}
          placeholderTextColor={'black'}
        />
      <ScrollView style={styles.scrollView}>
      
      <View>
        {
          list.map((l, i) => (
            <ListItem.Swipeable
            rightContent={list[0].nombre != "No hay alimentos" ?
              <Button
                title="Añadir"
                icon={{ name: 'add', color: 'white'}}
                buttonStyle={{ minHeight: '100%', backgroundColor: '#53DD38' }}
                onPress={() => addFood(l.nombre, l.foto, l.calorias)}
              /> : <Button
              title="Nada por aquí"
              buttonStyle={{ minHeight: '100%', backgroundColor: '#53DD38' }}
              
            />
            }leftContent={list[0].nombre != "No hay alimentos" ?
            <Button
              title="Borrar"
              icon={{ name: 'delete', color: 'white'}}
              buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
              onPress={() => deleteFood(l.nombre, l.calorias, l.foto)}
            /> : <Button
            title="Nada por aquí"
            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
            
          />
          } key={i} bottomDivider>
              <Avatar source={{uri: l.foto}} size='large'/>
              <ListItem.Content>
                <ListItem.Title>{l.nombre}</ListItem.Title>
                <ListItem.Subtitle>{l.calorias} calorías</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem.Swipeable>
          ))
        }
      </View>
      </ScrollView>
      <LinearGradient colors={['#EEEEFC', '#9EC6F3', '#2F8AF2']} style={styles.gradient}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("NuevoPlato")}>
          <View style={styles.buttonContent}>
            <Icon style={styles.buttonIcon} type='material-community' name="food"></Icon>
            <Text style={styles.buttonText}>Crear plato</Text> 
          </View>
        </TouchableOpacity>
        </LinearGradient> 
    </SafeAreaView> 
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    alignItems: 'center',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    marginTop: '6%'
  },
  gradient: {
    height: '10%', 
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttonText: {
    fontSize: 20,
  },
  buttonIcon: {
  },
  safeAreaView:{
    marginTop: '20%',
    marginBottom: '20%',
    width: '80%',
    height: '80%'
  },
  scrollView: {
    backgroundColor: 'rgba(158,198,243,0.7)',
  },
});
