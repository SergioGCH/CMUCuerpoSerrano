import * as React from 'react';
import { Alert, ImageBackground, Modal, Picker, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { Button, Icon } from 'react-native-elements';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function CaloriasRecomendadas() {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [sexo, setSexo] = useState("Hombre");
  var [resultado, setResultado] = useState(0);
  const [edad, setEdad] = useState("");
  const [actividad, setActividad] = useState("Hago poco o nada de ejercicio");
  const [esMujer, setEsMujer] = useState(false);
  const [modal, setModal] = useState(false);
  var [mensaje, setMensaje] = useState("");

  function isNumber(value: string | number): boolean {
    return ((value != null) &&
            (value !== '') &&
            !isNaN(Number(value.toString())));
  }

  function calculate() {
    if(!altura){
      Alert.alert('Introduce una altura')
    }else if(!peso){
      Alert.alert('Introduce un peso')
    }else if(!isNumber(peso) || !isNumber(edad) || !isNumber(altura)){
      Alert.alert('Introduce valores numéricos')
    }else if(!edad){
      Alert.alert('Introduce una edad')
    }else{
      var pesoInt = +peso
      var alturaInt = (+altura)
      var edadInt = +edad
      var ejercicioInt = 0
      switch(actividad){
        case "Hago poco o nada de ejercicio":
          ejercicioInt = 1.2
          break;
        case "Hago ejercicio de 1 a 3 veces por semana":
          ejercicioInt = 1.375
          break;
        case "Hago ejercicio de 3 a 5 veces por semana":
          ejercicioInt = 1.55
          break;
        case "Casi todos los días hago ejercicio":
          ejercicioInt = 1.72
          break;
        case "Vivo por y para el ejercicio":
          ejercicioInt = 1.9
          break;
      }

      if(esMujer){
        var tmb = 655 + (9.6 * pesoInt) + (1.8 * alturaInt) - (4.7 * edadInt)
      }else{
        var tmb = 66 + (13.7 * pesoInt) + (5 * alturaInt) - (6.75 * edadInt)
      }

      var res = tmb * ejercicioInt
      setResultado(res)
      setMensaje("El número de calorías necesarias para mantener tu peso actual es " +res.toFixed(2))
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
        <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 4, marginTop: '4%'}}>
        <Picker
          selectedValue={actividad}
          mode="dropdown"
          style={{height: 40, width: 250}}
          itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17, }}
          onValueChange={(itemValue, itemIndex) => setActividad(itemValue)}
        >
          <Picker.Item label="Hago poco o nada de ejercicio" value="Hago poco o nada de ejercicio" />
          <Picker.Item label="Hago ejercicio de 1 a 3 veces por semana" value="Hago ejercicio de 1 a 3 veces por semana" />
          <Picker.Item label="Hago ejercicio de 3 a 5 veces por semana" value="Hago ejercicio de 3 a 5 veces por semana" />
          <Picker.Item label="Casi todos los días hago ejercicio" value="Casi todos los días hago ejercicio" />
          <Picker.Item label="Vivo por y para el ejercicio" value="Vivo por y para el ejercicio" />
        </Picker>
        </View>
        <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 4, marginTop: '8%'}}>
        <Picker
          selectedValue={sexo}
          mode="dropdown"
          style={{height: 40, width: 250}}
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
    width: '90%',
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
    width: '90%',
    height: '15%',
    backgroundColor: '#237CE2',
  },
});



