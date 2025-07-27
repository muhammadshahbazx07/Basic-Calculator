import { View, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import CalcButton from './CalcButton';
import { useDarkTheme } from '../Context/ThemeProvider';

const CalcKeyboard = () => {

    // { DarkTheme }
    const theme = useDarkTheme();

    // { State }
    const [firstNumber, setFirstNumber] = useState('');
    const [secondNumber, setSecondNumber] = useState('');
    const [operation, setOperation] = useState();
    const [result, setResult] = useState(null);

    const handleNumberPress = (buttonValue) => {
        if (firstNumber.length < 10) {
            setFirstNumber(firstNumber + buttonValue);
        }
    }

    const handleOperationPress = (buttonValue) => {
        setOperation(buttonValue);
        setSecondNumber(firstNumber);
        setFirstNumber('');
    }

    const clear = () => {
        setFirstNumber('');
        setSecondNumber('');
        setOperation('');
        setResult(null);
    }

    const getResult = () => {
        switch (operation) {
            case '+':
                clear();
                setResult(parseInt(secondNumber) + parseInt(firstNumber));
                break;
            case '-':
                clear();
                setResult(parseInt(secondNumber) - parseInt(firstNumber));
                break;
            case '*':
                clear();
                setResult(parseInt(secondNumber) * parseInt(firstNumber));
                break;
            case '/':
                clear();
                setResult(parseInt(secondNumber) / parseInt(firstNumber));
                break;
            default:
                clear();
                setResult(0);
                break;
        }
    }

    const firstNumberDisplay = () => {
        const baseStyle = [styles.screenFirstNumber, { color: theme.StationaryResult }];
        
        if (result !== null) {
            return <Text style={result < 99999 ? [...baseStyle, { color: theme.result }] : [...baseStyle, { fontSize: 50, color: theme.result }]}>{result?.toString()}</Text>;
        }
        if (firstNumber &&  firstNumber.length < 6) {
            return <Text style={baseStyle}>{firstNumber}</Text>;
        }
        if (firstNumber === '') {
            return <Text style={baseStyle}>{'0'}</Text>;
        }
        if (firstNumber.length > 5 && firstNumber.length < 8) {
            return (
                <Text style={[...baseStyle, { fontSize: 70 }]}>
                    {firstNumber}
                </Text>
            );
        }
        if (firstNumber.length > 7) {
            return (
                <Text style={[...baseStyle, { fontSize: 50 }]}>
                    {firstNumber}
                </Text>
            )
        }
    }

    return (
        <View style={{ position: 'absolute', bottom: 50, }}>

            {/* Display Number */}
            <View style={{
                height: 120,
                width: '90%',
                justifyContent: 'flex-end',
                alignSelf: 'center',
            }}>
                <Text style={[styles.screenSecondNumber, { color: theme.StationaryResult}]}>
                    {secondNumber}
                    <Text style={{ color: theme.result, fontSize: 50, fontWeight: '200' }}>{operation}</Text>
                </Text>
                {firstNumberDisplay()}
            </View>

            {/* Calculator KeyBaord */}
            <View style={styles.row}>
                <CalcButton title='C' isGray onPress={clear} />
                <CalcButton title='+/-' isGray onPress={() => handleOperationPress('+/-')} />
                <CalcButton title='%' isGray onPress={() => handleOperationPress('%')} />
                <CalcButton title='÷' isGray onPress={() => handleOperationPress('/')} />
            </View>
            <View style={styles.row}>
                <CalcButton title='7' onPress={() => handleNumberPress('7')} />
                <CalcButton title='8' onPress={() => handleNumberPress('8')} />
                <CalcButton title='9' onPress={() => handleNumberPress('9')} />
                <CalcButton title='×' isPrimaryColor onPress={() => handleOperationPress('*')} />
            </View>
            <View style={styles.row}>
                <CalcButton title='4' onPress={() => handleNumberPress('4')} />
                <CalcButton title='5' onPress={() => handleNumberPress('5')} />
                <CalcButton title='6' onPress={() => handleNumberPress('6')} />
                <CalcButton title='–' isPrimaryColor onPress={() => handleOperationPress('-')} />
            </View>
            <View style={styles.row}>
                <CalcButton title='1' onPress={() => handleNumberPress('1')} />
                <CalcButton title='2' onPress={() => handleNumberPress('2')} />
                <CalcButton title='3' onPress={() => handleNumberPress('3')} />
                <CalcButton title='+' isPrimaryColor onPress={() => handleOperationPress('+')} />
            </View>
            <View style={styles.row}>
                <CalcButton title='.' onPress={() => handleNumberPress('.')} />
                <CalcButton title='0' onPress={() => handleNumberPress('0')} />
                <CalcButton title='⌫' onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
                <CalcButton title='=' isPrimaryColor onPress={() => getResult()} />
            </View>
        </View>
    )
}

export default CalcKeyboard

const styles = StyleSheet.create({
    row: {
        maxWidth: '100%',
        flexDirection: 'row'
    },
    screenFirstNumber: {
        fontSize: 96,
        fontWeight: '200',
        alignSelf: 'flex-end'
    },
    screenSecondNumber: {
        fontSize: 40,
        fontWeight: '200',
        alignSelf: 'flex-end'
    }
})