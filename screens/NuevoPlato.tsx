import * as React from 'react';
import { Alert, ImageBackground, Platform, StyleSheet, TextInput, TouchableOpacity, Image, AsyncStorage } from 'react-native';

import { Text, View } from '../components/Themed';
import { Icon,} from 'react-native-elements';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

export default function NuevoPlato({
  navigation,
}: StackScreenProps<RootStackParamList>) {
  const [nombre, setNombre] = useState("");
  const [calorias, setCalorias] = useState("");
  interface foodObject {nombre: string, calorias: string, foto: string}

  async function createFood() {
    if(!nombre){
      Alert.alert('Introduce un nombre')
    }else if(!calorias){
      Alert.alert('Introduce las calorías')
    }else{
      if(!image){
        setImage("https://image.freepik.com/free-vector/engraving-hand-drawn-shawarma-illustration_23-2148994562.jpg")
      }
      var food:foodObject = { nombre: nombre, calorias: calorias, foto: image}
      var listado:foodObject[] = []
      listado.push(food)
      const listaComidas = await AsyncStorage.getItem('listaComidas')
      if(listaComidas){
        var array = JSON.parse(listaComidas)
        array.push(food)
        await AsyncStorage.setItem('listaComidas', JSON.stringify(array))
      }else{
        await AsyncStorage.setItem('listaComidas', JSON.stringify(listado))
      }
      navigation.navigate("MenuControlDiario")
    }
    
  }

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Necesitamos permisos de acceso a tu galería');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ImageBackground style={ blueStyles.imgBackground } 
                 resizeMode='cover' 
                 source={require('../assets/images/habitacion.png')}> 
     <View style={blueStyles.recuadroFondo}>
     {image ? <TouchableOpacity onPress={pickImage}><Image source={{ uri: image }} style={{ width: 200, height: 200 }} /></TouchableOpacity>:
     <TouchableOpacity style={blueStyles.buttonPhoto} onPress={pickImage}>
          <View style={blueStyles.buttonContent}>
            <Icon style={blueStyles.buttonIcon} type='material-community' name="camera"></Icon>
            <Text style={blueStyles.buttonText}>Elige foto</Text> 
          </View>
        </TouchableOpacity>}
     <TextInput
          style = {blueStyles.input}
          underlineColorAndroid = "transparent"
          placeholder = "  Nombre del plato"
          placeholderTextColor = {'#237CE2'}
          autoCapitalize = "none"
          value={nombre}
          onChangeText = {text => setNombre(text)}
        /> 
        <TextInput
          style = {blueStyles.input}
          underlineColorAndroid = "transparent"
          placeholder = "  Calorías (kcal)"
          placeholderTextColor = {'#237CE2'}
          keyboardType='numeric'
          autoCapitalize = "none"
          value={calorias}
          onChangeText = {text => setCalorias(text)}
        /> 
        <LinearGradient colors={['#EEEEFC', '#9EC6F3', '#2F8AF2']} style={blueStyles.gradient}>
        <TouchableOpacity style={blueStyles.button} onPress={() => createFood()}>
          <View style={blueStyles.buttonContent}>
            <Icon style={blueStyles.buttonIcon} type='material-community' name="food"></Icon>
            <Text style={blueStyles.buttonText}>Crear plato</Text> 
          </View>
        </TouchableOpacity>
        </LinearGradient>
        </View>
    </ImageBackground>
  );
}

const blueStyles = StyleSheet.create({
  recuadroFondo: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(157,220,243,0.9)',
    borderRadius: 20,
  },
  gradient: {
    height: 100, 
    marginTop: 10,
    width: '70%',
    borderRadius: 20,
  },
  input: {
    margin: 15,
    height: '8%',
    width: '80%',
    borderColor: '#237CE2',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 ,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    paddingVertical: '15%'
  },
  buttonPhoto: {
    margin: 15,
    height: '20%',
    width: '45%',
    borderColor: '#237CE2',
    backgroundColor: 'rgba(35,167,215,0.4)',
    borderWidth: 3,   
    justifyContent: 'center',
    borderRadius: 100,
    alignItems: 'center',
    borderTopColor: 'white',
    borderBottomColor: 'white',
    borderStartColor: 'white',
    borderEndColor: 'white',
  },
  buttonText: {
    fontSize: 20,
    textAlignVertical: 'center'
  },
  buttonIcon: {    
    backgroundColor: 'rgba(157,220,243,0)'
  },
  buttonContent: {
    flexDirection: 'row',
    backgroundColor: 'rgba(157,220,243,0)'
  },
});


