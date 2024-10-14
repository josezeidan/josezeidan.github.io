export class CalculatorModel {
    constructor() {
        this.firstNumber = null;
        this.secondNumber = null;
        this.operator = null;
    }
    checkBoundaries(value) {
        if (value > CalculatorModel.MAX_VALUE ||
            value < CalculatorModel.MIN_VALUE) {
            throw new Error("ERROR: number out of boundaries.");
        }
    }
    setFirstNumber(value) {
        this.checkBoundaries(value);
        this.firstNumber = value;
    }
    setSecondNumber(value) {
        if (value !== null) {
            this.checkBoundaries(value);
            this.secondNumber = value;
        }
        else {
            this.secondNumber = null;
        }
    }
    setOperator(operator) {
        this.operator = operator;
    }
    calculate() {
        if (this.firstNumber === null ||
            this.secondNumber === null ||
            this.operator === null) {
            throw new Error("Incomplete operation");
        }
        let result;
        switch (this.operator) {
            case "+":
                result = this.firstNumber + this.secondNumber;
                break;
            case "-":
                result = this.firstNumber - this.secondNumber;
                break;
            case "*":
                result = this.firstNumber * this.secondNumber;
                break;
            case "/":
                if (this.secondNumber === 0) {
                    throw new Error("Cannot divide by zero");
                }
                result = this.firstNumber / this.secondNumber;
                break;
            default:
                throw new Error("Invalid operator");
        }
        result = this.truncateToTwoDecimals(result);
        this.checkBoundaries(result);
        return result;
    }
    clear() {
        this.firstNumber = null;
        this.secondNumber = null;
        this.operator = null;
    }
    getFirstNumber() {
        return this.firstNumber;
    }
    getSecondNumber() {
        return this.secondNumber;
    }
    getOperator() {
        return this.operator;
    }
    truncateToTwoDecimals(value) {
        return Math.trunc(value * 100) / 100;
    }
}
CalculatorModel.MAX_VALUE = 9999.99;
CalculatorModel.MIN_VALUE = -9999.99;
