import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { useDarkTheme } from '../Context/ThemeProvider';
import { DARK_MODE } from '../Context/DarkMode';
import CalcButton from '../Components/CalcButton';
import AppStatusBar from '../Components/AppStatusBar';
import CalcKeyboard from '../Components/CalcKeyboard';

const CalculatorScreen = () => {
    const theme = useDarkTheme();
    const { darkMode, setDarkMode } = useContext(DARK_MODE);

    return (
        <View style={{
            backgroundColor: theme.background,
            width: '100%',
            height: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start'
        }}>
            <AppStatusBar />
            
            {/* <Button title={`change to ${!darkMode ? "Dark" : "Light"} `} onPress={() => setDarkMode(!darkMode)} /> */}
            {/* Toggle Theme Button */}
            <View style={{
                width: '100%',
                alignItems: 'flex-end',
                padding: 16,
            }}>
                <TouchableOpacity
                    onPress={() => setDarkMode(!darkMode)}
                    style={{
                        paddingHorizontal: 14,
                        paddingVertical: 6,
                        backgroundColor: theme.surface,
                        borderRadius: 30,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 5,
                    }}
                >
                    <Text style={{
                        color: theme.white,
                        fontWeight: '600',
                        fontSize: 14
                    }}>
                        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                    </Text>
                </TouchableOpacity>
            </View>

            <CalcKeyboard />
        </View>
    )
}

export default CalculatorScreen
