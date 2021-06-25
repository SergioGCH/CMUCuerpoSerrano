import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ImageBackground, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

export default function TabOneScreen({
  navigation,
}: StackScreenProps<RootStackParamList>) {
  return (
    <ImageBackground style={ styles.imgBackground } 
                 resizeMode='cover' 
                 source={require('../assets/images/resi.png')}>
      
        <LinearGradient colors={['#EEEEFC', '#9EC6F3', '#2F8AF2']} style={styles.gradient}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Historial")}>
          <View style={styles.buttonContent}>
            <Icon style={styles.buttonIcon} type='material-community' name="history"></Icon>
            <Text style={styles.buttonText}>Historial</Text> 
          </View>
        </TouchableOpacity>
        </LinearGradient>
        <LinearGradient colors={['#EEEEFC', '#9EC6F3', '#2F8AF2']} style={styles.gradient}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MenuControlDiario")}>
          <View style={styles.buttonContent}>
            <Icon style={styles.buttonIcon} type='material-community' name="noodles"></Icon>
            <Text style={styles.buttonText}>Control diario</Text> 
          </View>
        </TouchableOpacity>
        </LinearGradient>
        <LinearGradient colors={['#EEEEFC', '#9EC6F3', '#2F8AF2']} style={styles.gradient}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Calculadora")}>
          <View style={styles.buttonContent}>
            <Icon style={styles.buttonIcon} type='material-community' name="calculator"></Icon>
            <Text style={styles.buttonText}>% de grasa corporal</Text> 
          </View>
        </TouchableOpacity>
        </LinearGradient>
        <LinearGradient colors={['#EEEEFC', '#9EC6F3', '#2F8AF2']} style={styles.gradient}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CaloriasRecomendadas")}>
          <View style={styles.buttonContent}>
            <Icon style={styles.buttonIcon} type='material-community' name="fire"></Icon>
            <Text style={styles.buttonText}>Calorías diarias recomendadas</Text> 
          </View>
        </TouchableOpacity>
        </LinearGradient>
        <LinearGradient colors={['#EEEEFC', '#9EC6F3', '#2F8AF2']} style={styles.gradient}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Menu")}>
          <View style={styles.buttonContent}>
            <Icon style={styles.buttonIcon} type='material-community' name="book-open-variant"></Icon>
            <Text style={styles.buttonText}>Menú</Text> 
          </View>
        </TouchableOpacity>
        </LinearGradient>
        
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
    alignItems: 'flex-start',
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
  },
  gradient: {
    height: 100, 
    marginTop: 10,
    width: '70%',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    textAlignVertical: 'center'
  },
  buttonIcon: {
    paddingVertical: '50%',
    paddingHorizontal: '10%'
  }
});
