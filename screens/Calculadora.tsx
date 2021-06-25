import * as React from 'react';
import { Alert, ImageBackground, Modal, Picker, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { Button, Icon } from 'react-native-elements';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function Calculadora() {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [sexo, setSexo] = useState("Hombre");
  var [resultado, setResultado] = useState(0);
  const [edad, setEdad] = useState("");
  const [esMujer, setEsMujer] = useState(false);
  const [modal, setModal] = useState(false);
  var [mensaje, setMensaje] = useState("");

  function calculate() {
    if(!altura){
      Alert.alert('Introduce una altura')
    }else if(!peso){
      Alert.alert('Introduce un peso')
    }else if(!edad){
      Alert.alert('Introduce una edad')
    }else{
      var pesoInt = +peso
      var alturaInt = ((+altura)/100)^2
      var edadInt = +edad
      console.log(pesoInt)
      console.log(alturaInt)
      var imc = pesoInt / alturaInt

      if(esMujer){
        var res = 1.2 * imc + 0.23 * edadInt - 5.4 
        if(edadInt < 20 || edadInt > 60){
          setMensaje("Lo sentimos, no contemplamos esas edades")
        }if((res < 16 && edadInt >= 20 && edadInt <= 29) || (res < 17 && edadInt > 29 && edadInt <= 39) || (res < 18 && edadInt > 39 && edadInt <= 49) || (res < 19 && edadInt > 49 && edadInt <= 60)){
          setMensaje("Atleta. Ten cuidado, si bajas más puedes tener problemas de salud")
        }else if((res >= 16 && res < 20 && edadInt <= 29) || (res >= 17 && res < 21 && edadInt > 29 && edadInt <= 39) || (res >= 18 && res < 22 && edadInt > 39 && edadInt <= 49) || (res >= 19 && res < 23 && edadInt > 49 && edadInt <= 60)){
          setMensaje("En forma. Estás en buen estado")
        }else if((res >= 20 && res < 29 && edadInt <= 29) || (res >= 21 && res < 30 && edadInt > 29 && edadInt <= 39) || (res >= 22 && res < 31 && edadInt > 39 && edadInt <= 49) || (res >= 23 && res < 32 && edadInt > 49 && edadInt <= 60)){
          setMensaje("Normal. Estás en la media")
        }else if((res >= 29 && res < 31 && edadInt <= 29) || (res >= 30 && res < 33 && edadInt > 29 && edadInt <= 39) || (res >= 31 && res < 34 && edadInt > 39 && edadInt <= 49) || (res >= 32 && res < 35 && edadInt > 49 && edadInt <= 60)){
          setMensaje("Elevado. Ten cuidado, si subes más puedes tener problemas de salud")
        }else if((res >= 31 && edadInt <= 29) || (res >= 33 && edadInt > 39 && edadInt <= 49) || (res >= 34 && edadInt > 29 && edadInt <= 39) || (res >= 35 && edadInt > 49 && edadInt <= 60)){
          setMensaje("Muy elevado. Tu salud corre peligro")
        }
      }else{
        var res = 1.2 * imc + 0.23 * edadInt - 5.4 - 10.8
        if(edadInt < 20 || edadInt > 60){
          setMensaje("Lo sentimos, no contemplamos esas edades")
        }if((res < 11 && edadInt >= 20 && edadInt <= 29) || (res < 12 && edadInt > 29 && edadInt <= 39) || (res < 14 && edadInt > 39 && edadInt <= 49) || (res < 15 && edadInt > 49 && edadInt <= 60)){
          setMensaje("Atleta. Ten cuidado, si bajas más puedes tener problemas de salud")
        }else if((res >= 11 && res < 14 && edadInt <= 29) || (res >= 12 && res < 15 && edadInt > 29 && edadInt <= 39) || (res >= 14 && res < 17 && edadInt > 39 && edadInt <= 49) || (res >= 15 && res < 18 && edadInt > 49 && edadInt <= 60)){
          setMensaje("En forma. Estás en buen estado")
        }else if((res >= 14 && res < 21 && edadInt <= 29) || (res >= 15 && res < 22 && edadInt > 29 && edadInt <= 39) || (res >= 17 && res < 24 && edadInt > 39 && edadInt <= 49) || (res >= 18 && res < 25 && edadInt > 49 && edadInt <= 60)){
          setMensaje("Normal. Estás en la media")
        }else if((res >= 21 && res < 23 && edadInt <= 29) || (res >= 22 && res < 24 && edadInt > 29 && edadInt <= 39) || (res >= 24 && res < 26 && edadInt > 39 && edadInt <= 49) || (res >= 25 && res < 27 && edadInt > 49 && edadInt <= 60)){
          setMensaje("Elevado. Ten cuidado, si subes más puedes tener problemas de salud")
        }else if((res >= 23 && edadInt <= 29) || (res >= 26 && edadInt > 39 && edadInt <= 49) || (res >= 24 && edadInt > 29 && edadInt <= 39) || (res >= 27 && edadInt > 49 && edadInt <= 60)){
          setMensaje("Muy elevado. Tu salud corre peligro")
        }
      }
      setResultado(res)
      setModal(true)
    }
  }

  function cambiaSexo(sexo: string){
    setSexo(sexo)
    sexo == "Hombre" ? setEsMujer(false) : setEsMujer(true)
  }
  return (
    <ImageBackground style={ styles.imgBackground } 
                 resizeMode='cover' 
                 source={require('../assets/images/habitacion.png')}> 
     <View style={esMujer ?styles.recuadroFondo : blueStyles.recuadroFondo}>
     <TextInput
          style = {esMujer ? styles.input : blueStyles.input}
          underlineColorAndroid = "transparent"
          placeholder = "  Altura (cm)"
          placeholderTextColor = {esMujer ?"#9a73ef" : '#237CE2'}
          autoCapitalize = "none"
          keyboardType='numeric'
          value={altura}
          onChangeText = {text => setAltura(text)}
        /> 
        <TextInput
          style = {esMujer ? styles.input : blueStyles.input}
          underlineColorAndroid = "transparent"
          placeholder = "  Peso (kg)"
          placeholderTextColor = {esMujer ?"#9a73ef" : '#237CE2'}
          autoCapitalize = "none"
          keyboardType='numeric'
          value={peso}
          onChangeText = {text => setPeso(text)}
        /> 
        <TextInput
          style = {esMujer ? styles.input : blueStyles.input}
          underlineColorAndroid = "transparent"
          placeholder = "  Edad (años)"
          placeholderTextColor = {esMujer ?"#9a73ef" : '#237CE2'}
          autoCapitalize = "none"
          keyboardType='numeric'
          value={edad}
          onChangeText = {text => setEdad(text)}
        /> 
        <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 4, marginTop: '5%'}}>
        <Picker
          selectedValue={sexo}
          mode="dropdown"
          style={{height: 40, width: 200}}
          itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17, }}
          onValueChange={(itemValue, itemIndex) => cambiaSexo(itemValue)}
        >
          <Picker.Item label="Hombre" value="Hombre" />
          <Picker.Item label="Mujer" value="Mujer" />
        </Picker>
        </View>

        <LinearGradient colors={['#EEEEFC', '#9EC6F3', '#2F8AF2']} style={styles.gradient}>
        <TouchableOpacity style={blueStyles.button} onPress={() => calculate()}>
          <View style={blueStyles.buttonContent}>
            <Icon style={blueStyles.buttonIcon} type='material-community' name="calculator-variant"></Icon>
            <Text style={blueStyles.buttonText}>Calcular</Text> 
          </View>
        </TouchableOpacity>
        </LinearGradient>

        <Modal transparent={true} visible={modal}>
          <View style={esMujer ?{backgroundColor:'#AF9CB6aa', flex:1} : {backgroundColor:'#9AD5FCaa', flex:1}}>
          <View style={esMujer ?{backgroundColor:'#A265A2', margin:20, padding:40, borderRadius:10, flex:1}:{backgroundColor:'#62B5EC', margin:20, padding:40, borderRadius:10, flex:1}}>
          <Text style={{fontSize:50}}>{resultado.toFixed(2)}%</Text>
          <Text style={{fontSize:30}}>{mensaje}</Text>
          <Button title="Ok" onPress={() => {setModal(false)}}></Button>
          </View>
          
          </View>
          
        </Modal>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  recuadroFondo: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(245,171,255,0.9)',
    borderRadius: 20,
  },
  gradient: {
    height: 100, 
    marginTop: '10%',
    width: '70%',
    borderRadius: 20,
  },
  input: {
    margin: 15,
    height: '8%',
    width: '80%',
    borderColor: '#7a42f4',
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
  picker: {
    width: '80%',
    height: '15%',
    backgroundColor: '#B41FEB',
  },
});

const blueStyles = StyleSheet.create({
  recuadroFondo: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(157,220,243,0.9)',
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
  picker: {
    width: '80%',
    height: '15%',
    backgroundColor: '#237CE2',
  },
});


