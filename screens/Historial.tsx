import * as React from 'react';
import { AsyncStorage, ImageBackground, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Avatar , Button, ListItem } from 'react-native-elements';
import { useEffect, useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Historial() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [totalCalorias, setTotalCalorias] = useState(0);
  const today = new Date()
  const [dateMessage, setDateMessage] = useState("Fecha seleccionada: "+today.toDateString());
  const [list, setList] = useState([{nombre: "No hay alimentos", calorias: "0", foto: "https://image.freepik.com/free-vector/engraving-hand-drawn-shawarma-illustration_23-2148994562.jpg"},]);
  interface foodObject {nombre: string, calorias: string, foto: string, fecha: Date}
  const [cambio, setCambio] = useState(0)
  
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setDate(date)
    setDateMessage("Fecha seleccionada: "+date.toDateString())
    hideDatePicker();
  };

  useEffect(() => {
    rellenaLista()
  }, [date, cambio])

  function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  async function rellenaLista(){  
    const listaComidas = await AsyncStorage.getItem('historial')
    if(listaComidas){
      var array = JSON.parse(listaComidas)
      var arrayFinal:foodObject[] = []
      
      if(array.nombre != ""){
        let cal = 0
        array.forEach( (comida) => {
          let fecha = new Date(comida.fecha)
          if(sameDay(fecha, date)){
            arrayFinal.push(comida)
            cal +=  +comida.calorias
          }
        });
        setDate(date)
        setTotalCalorias(cal)
        setList(arrayFinal)        
      }
    }
  }
   
  async function deleteFood(arg0: string, fechaComida: Date, caloriasComida: string, fotoComida: string) {
    const listaComidas = await AsyncStorage.getItem('historial')
    if(listaComidas){
      var array = JSON.parse(listaComidas)
      
      if(array.nombre != ""){
        var salto = false
        array.forEach( (comida, index) => {
          let fecha = new Date(comida.fecha)
          if(comida.nombre == arg0 && comida.calorias == caloriasComida && comida.foto == fotoComida && sameDay(fecha, fechaComida) && salto == false){
            array.splice(index, 1)
            salto = true
          }
        });
        setList(array)
        await AsyncStorage.setItem('historial', JSON.stringify(array))
        setCambio(cambio+1)
      }
    }
  }
  return (
    <ImageBackground style={ styles.imgBackground } 
                 resizeMode='cover' 
                 source={require('../assets/images/habitacion.png')}> 
      
      <SafeAreaView style={styles.safeAreaView}>
      <Button title={dateMessage} onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      <ScrollView style={styles.scrollView}>
      <View>
        {
          list.map((l, i) => (
            <ListItem.Swipeable
            rightContent={ list[0].nombre != "No hay alimentos" ?
              <Button
                title="Borrar"
                icon={{ name: 'delete', color: 'white' }}
                buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                onPress={() => deleteFood(l.nombre, date, l.calorias, l.foto)}
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
      <Text style={styles.title}> Calorías ingeridas: {totalCalorias}</Text>  
    </SafeAreaView>   
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 ,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 42,
  },
  datePicker: {
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#237CE2',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 5,
  },
});


