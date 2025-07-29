import { View, Text, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import CalculatorScreen from './src/Modules/CalculatorScreen'
import { DARK_MODE } from './src/Context/DarkMode'
import SplashScreen from './src/Modules/SplashScreen'

const Stack = createStackNavigator();

const App = () => {
  // { DarkMOde }
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  
  return (
    <DARK_MODE.Provider value={{ darkMode, setDarkMode }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='SPLASH_SCREEN' component={SplashScreen} />
          <Stack.Screen name='CALCULATOR_SCREEN' component={CalculatorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DARK_MODE.Provider>
  )
}

export default App