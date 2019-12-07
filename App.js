/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


//IMPORT custom components

import MainScreen from './app/main_app/MainScreen.js';
// import PimsScherm from './app/components/PimsScherm.js';

//main backgroundcolor
const AppNavigator = createStackNavigator({
  Home : {screen : MainScreen}
})
const App = createAppContainer(AppNavigator);

export default App;
