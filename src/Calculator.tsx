import Header from "./components/Header.tsx";
import Display from "./components/Display.tsx";
import Keypad from "./components/Keypad.tsx";
import type { Button } from "./types/keypad.types.ts";
import { formatNumber, parseFormattedNumber } from "./parser/expression.parser.ts";
import {useState} from "react";

const btnContent: Button[] = [
    // Ligne 1
    { label: '7', isDigit: true, color: 'normal' },
    { label: '8', isDigit: true, color: 'normal' },
    { label: '9', isDigit: true, color: 'normal' },
    { label: 'DEL', isFunction: true, color: 'special' },

    // Ligne 2
    { label: '4', isDigit: true, color: 'normal' },
    { label: '5', isDigit: true, color: 'normal' },
    { label: '6', isDigit: true, color: 'normal' },
    { label: '+', isFunction: true, color: 'normal' },

    // Ligne 3
    { label: '1', isDigit: true, color: 'normal' },
    { label: '2', isDigit: true, color: 'normal' },
    { label: '3', isDigit: true, color: 'normal' },
    { label: '-', isFunction: true, color: 'normal' },

    // Ligne 4
    { label: '.', isDigit: true, color: 'normal' },
    { label: '0', isDigit: true, color: 'normal' },
    { label: '/', isFunction: true, color: 'normal' },
    { label: 'x', isFunction: true, color: 'normal' },

    // Ligne 5
    { label: 'RESET', isFunction: true, color: 'special', colSpan: 2 },
    { label: '=', isFunction: true, color: 'red', colSpan: 2 }
]

const Calculator = () => {
    const [currentValue, setCurrentValue] = useState<string>('0')
    const [leftOperand, setLeftOperand] = useState<string | null>(null)
    const [operator, setOperator] = useState<string | null>(null)
    const [isNewNumber, setIsNewNumber] = useState(true)

    const calculate = (op1: string, op: string, op2: string): number => {
        const num1 = parseFormattedNumber(op1);
        const num2 = parseFormattedNumber(op2);

        switch (op) {
            case '+': return num1 + num2;
            case '-': return num1 - num2;
            case 'x': return num1 * num2;
            case '/':
                if (num2 === 0) return Infinity;
                return num1 / num2;
            default: return num2;
        }
    }

    const handleClick = (key: Button) => {
        if (key.isDigit) {
            handleDigit(key.label);
        } else {
            handleFunction(key.label);
        }
    }

    const handleDigit = (label: string) => {
        if (currentValue.length >= 16 && !isNewNumber) return;

        let newCurrentValue: string;

        if (label === '.') {
            if (isNewNumber) {
                newCurrentValue = '0,';
            } else if (!currentValue.includes(',')) {
                newCurrentValue = currentValue + ',';
            } else {
                return;
            }
        } else {
            if (isNewNumber || currentValue === '0') {
                newCurrentValue = label;
            } else {
                newCurrentValue = currentValue + label;
            }
        }

        setCurrentValue(newCurrentValue);
        setIsNewNumber(false);
    }

    const handleFunction = (label: string) => {
        switch (label) {
            case 'RESET':
                setCurrentValue('0');
                setLeftOperand(null);
                setOperator(null);
                setIsNewNumber(true);
                break;
            case 'DEL':
                if (isNewNumber) return;
                let newval = currentValue.slice(0, -1);
                if (newval === '') newval = '0';
                setCurrentValue(newval);
                break;
            case '+':
            case '-':
            case 'x':
            case '/':
                if (operator && !isNewNumber) {
                    const result = String(calculate(leftOperand!, operator, currentValue))
                    let resultStr
                    if (result.length > 16) {
                        const sign = result.startsWith('-') ? '-' : ''
                        const num = sign ? result.slice(1) : result

                        resultStr = `${sign}${num[0]},${num.slice(1, 15)}e+${num.length - 1}`
                    } else {
                        resultStr = formatNumber(result)
                    }
                    setLeftOperand(resultStr)
                    setCurrentValue(resultStr)
                } else {
                    setLeftOperand(currentValue)
                }
                setOperator(label)
                setIsNewNumber(true)
                break;
            case '=':
                if (leftOperand && operator) {
                    const result = String(calculate(leftOperand, operator, currentValue))
                    let resultStr
                    if (result.length > 16) {
                        const sign = result.startsWith('-') ? '-' : ''
                        const num = sign ? result.slice(1) : result

                        resultStr = `${sign}${num[0]},${num.slice(1, 15)}e+${num.length - 1}`
                    } else {
                        resultStr = formatNumber(result.replace('.', ','))
                    }
                    setCurrentValue(resultStr);
                    setLeftOperand(null);
                    setOperator(null);
                    setIsNewNumber(true);
                }
                break;
        }
    }

    return (
        <div className="w-75 md:w-100">
            <Header />
            <Display digitsDisplay={formatNumber(currentValue)} />
            <Keypad keys={btnContent} handleClick={handleClick} />
        </div>
    )
}

export default Calculator