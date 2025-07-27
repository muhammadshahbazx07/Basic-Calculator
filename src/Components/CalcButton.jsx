import { View, Text, TouchableOpacity } from 'react-native'
import React, { Component, useContext } from 'react'
import { counterEvent } from 'react-native/Libraries/Performance/Systrace'
import { useDarkTheme } from '../Context/ThemeProvider'
import { WIDTH, HEIGHT } from '../Context/Dimensions'

const CalcButton = ({ title, isPrimaryColor = false, isGray = false, onPress }) => {

  // { DarkTheme }
  const theme = useDarkTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        width: WIDTH * 0.19,
        height: WIDTH * 0.19,
        backgroundColor: isPrimaryColor
          ? theme.primary
          : isGray
            ? theme.btnGray
            : theme.btnDarkLight,
        borderRadius: WIDTH * 0.06,
        justifyContent: 'center',
        alignItems: 'center',
        margin: WIDTH * 0.018,
      }}
      onPress={onPress}>
      <Text
        style={{
          fontSize: WIDTH * 0.07,
          color: isPrimaryColor || isGray
            ? theme.white
            : theme.text
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CalcButton

// { Usage of This Component } 

{/* <CalcButton title="9" isPrimaryColor onPress={() => console.log('Pressed 9')} />
<CalcButton title="C" isGray onPress={() => console.log('Clear Pressed')} />
<CalcButton title="2" isPrimaryColor={false} onPress={() => console.log('Pressed 9')} /> */}
