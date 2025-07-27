import React, { useContext } from 'react'
import { StatusBar } from 'react-native'
import { DARK_MODE } from '../Context/DarkMode';
import { useDarkTheme } from '../Context/ThemeProvider';

const AppStatusBar = () => {
  const theme = useDarkTheme();
  const { darkMode } = useContext(DARK_MODE);

  return (
    <StatusBar
      backgroundColor={theme.background}
      barStyle={darkMode ? 'light-content' : 'dark-content'}
    />
  );
};

export default AppStatusBar
