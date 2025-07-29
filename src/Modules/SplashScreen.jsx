import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDarkTheme } from '../Context/ThemeProvider'
import { WIDTH } from '../Context/Dimensions'
import AppStatusBar from '../Components/AppStatusBar'

const SplashScreen = () => {

    // { Dark Theme }
    const theme = useDarkTheme();

    // { Navigate }
    const navigation = useNavigation();

    useEffect(() => {
        // Navigation to onBoarding after sec
        setTimeout(() => {
            navigation.reset({ index: 1, routes: [{ name: 'CALCULATOR_SCREEN' }] });
        }, 1000);
    }, []);

    return (
        <View style={{
            backgroundColor: theme.background,
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>

            {/* StatusBar  */}
            <AppStatusBar />

            {/* Centre Text */}
            <Text style={{
                color: theme.text,
                fontSize: WIDTH * 0.12,
            }}>Calculator</Text>
        </View>
    )
}

export default SplashScreen