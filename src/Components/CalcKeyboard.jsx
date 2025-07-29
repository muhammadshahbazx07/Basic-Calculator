import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CalcButton from './CalcButton';
import { useDarkTheme } from '../Context/ThemeProvider';
import { WIDTH } from '../Context/Dimensions';

const CalcKeyboard = () => {

    // { DarkTheme }
    const theme = useDarkTheme();

    // State
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState(null);
    const [caretPosition, setCaretPosition] = useState(0);
    const [isEditable, setIsEditable] = useState(true);

    // NumberPress
    const handleNumberPress = (value) => {
        const beforeCaret = expression.slice(0, caretPosition);
        const afterCaret = expression.slice(caretPosition);
        const newExpression = beforeCaret + value + afterCaret;
        setExpression(newExpression);
        setCaretPosition(caretPosition + 1); // Move caret position forward by 1
        getResult(newExpression);
    }

    // OperationPress
    const handleOperationPress = (value) => {
        const beforeCaret = expression.slice(0, caretPosition);
        const afterCaret = expression.slice(caretPosition);
        const lastChar = beforeCaret.trim().slice(-1);

        if (!/[\+\-\*\/]$/.test(lastChar)) {
            const operatorSymbol = value === '/' ? '÷' : value === '*' ? '×' : value;
            const newExpression = beforeCaret + ' ' + operatorSymbol + ' ' + afterCaret;
            setExpression(newExpression);
            setCaretPosition(caretPosition + operatorSymbol.length + 2);
            getResult(newExpression);
        }
    }

    // Clear
    const clear = () => {
        setIsEditable(false);
        setExpression('');
        setResult(null);
        setTimeout(() => setIsEditable(true), 10);
    }

    // getResult
    const getResult = (exp) => {
        try {
            const calcExpression = exp.replace('×', '*').replace('÷', '/');
            if (calcExpression) {
                const evalResult = eval(calcExpression);
                setResult(evalResult);
            }
        } catch (error) {
            if (!exp.includes("=")) {
                setResult(result);
            }
        }
    }

    const handleBackspace = () => {
        const beforeCaret = expression.slice(0, caretPosition - 1); // Remove the character before caret
        const afterCaret = expression.slice(caretPosition); // Keep the part after caret
        const newExpression = beforeCaret + afterCaret; // Combine both parts
        setExpression(newExpression);
        setCaretPosition(caretPosition - 1); // Move caret position back by 1
        getResult(newExpression);
    }

    return (
        <View style={{ position: 'absolute', bottom: 50 }}>

            {/* DisplayResult */}
            <View style={{
                height: '30%',
                width: '90%',
                justifyContent: 'flex-end',
                alignSelf: 'center',
                marginBottom: 2,
            }}>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
                    showsHorizontalScrollIndicator={false}
                >
                    <TextInput
                        style={[styles.screenSecondNumber, { color: theme.StationaryResult }]}
                        value={expression}
                        onChangeText={text => {
                            setExpression(text);
                            getResult(text);
                        }}
                        placeholder=''
                        placeholderTextColor={theme.StationaryResult}
                        keyboardType='default'
                        multiline={true}
                        showSoftInputOnFocus={false}
                        editable={isEditable}
                        onSelectionChange={(e) => setCaretPosition(e.nativeEvent.selection.start)}
                    />
                </ScrollView>

                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
                    showsHorizontalScrollIndicator={false}
                >
                    <Text style={[styles.screenFirstNumber, { color: theme.result }]}>
                        {result !== null ? result : '0'}
                    </Text>
                </ScrollView>
            </View>

            {/* Calculator KeyBaord */}
            <View style={styles.row}>
                <CalcButton title='AC' isGray onPress={clear} />
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
                <CalcButton title='⌫' onPress={handleBackspace} /> {/* Updated backspace handler */}
                <CalcButton title='=' isPrimaryColor onPress={() => getResult(expression)} />
            </View>
        </View>
    )
};

export default CalcKeyboard;

const styles = StyleSheet.create({
    row: {
        maxWidth: '100%',
        flexDirection: 'row'
    },
    screenFirstNumber: {
        fontSize: 96,
        fontWeight: '200',
        alignSelf: 'flex-end',
        paddingRight: WIDTH * 0.03
    },
    screenSecondNumber: {
        fontSize: 40,
        fontWeight: '200',
        alignSelf: 'flex-end',
        paddingRight: WIDTH * 0.01
    }
});
