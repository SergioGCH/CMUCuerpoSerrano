/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import Calculadora from '../screens/Calculadora';
import CaloriasRecomendadas from '../screens/CaloriasRecomendadas';
import Historial from '../screens/Historial';
import Menu from '../screens/Menu';
import MenuControlDiario from '../screens/MenuControlDiario';

import NotFoundScreen from '../screens/NotFoundScreen';
import NuevoPlato from '../screens/NuevoPlato';
import TabOneScreen from '../screens/TabOneScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={TabOneScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Historial" component={Historial}  />
      <Stack.Screen name="Calculadora" component={Calculadora}  />
      <Stack.Screen name="Menu" component={Menu}  />
      <Stack.Screen name="CaloriasRecomendadas" component={CaloriasRecomendadas}  />
      <Stack.Screen name="MenuControlDiario" component={MenuControlDiario}  />
      <Stack.Screen name="NuevoPlato" component={NuevoPlato}  />
    </Stack.Navigator>
  );
}
