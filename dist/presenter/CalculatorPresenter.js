export class CalculatorPresenter {
    constructor(model, view) {
        this.isNewInput = true;
        this.handleNumber = (number) => {
            let currentValue = this.view.getDisplayValue();
            if (this.isNewInput) {
                currentValue = "";
                this.isNewInput = false;
            }
            // Handle negation
            if (number === "-") {
                if (currentValue === "" || currentValue === "0") {
                    this.view.setDisplayValue("-");
                }
                else if (currentValue.charAt(0) === "-") {
                    this.view.setDisplayValue(currentValue.substr(1));
                }
                else {
                    this.view.setDisplayValue("-" + currentValue);
                }
                return;
            }
            // Handle decimal point
            if (number === "." && currentValue.includes(".")) {
                return;
            }
            // Allow typing more than two decimal places
            this.view.setDisplayValue(currentValue + number);
        };
        this.handleEquals = () => {
            try {
                const currentValue = parseFloat(this.view.getDisplayValue());
                if (this.model.getFirstNumber() !== null &&
                    this.model.getOperator() !== null) {
                    this.model.setSecondNumber(currentValue);
                    const result = this.model.calculate();
                    this.view.setDisplayValue(this.formatResult(result)); // Use the new format method
                    this.model.setFirstNumber(result);
                    this.model.setSecondNumber(null);
                    this.model.setOperator(null);
                    this.view.setOperatorDisplay("");
                    this.isNewInput = true;
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    this.view.setDisplayValue(error.message, true);
                    this.model.clear();
                    this.isNewInput = true;
                }
            }
        };
        this.handleOperator = (operator) => {
            try {
                const currentValue = parseFloat(this.view.getDisplayValue());
                if (this.model.getFirstNumber() === null) {
                    this.model.setFirstNumber(currentValue);
                }
                else if (this.model.getOperator() !== null && !this.isNewInput) {
                    this.model.setSecondNumber(currentValue);
                    const result = this.model.calculate();
                    this.view.setDisplayValue(this.formatResult(result)); // Use the new format method
                    this.model.setFirstNumber(result);
                    this.model.setSecondNumber(null);
                }
                this.model.setOperator(operator);
                this.view.setOperatorDisplay(operator);
                this.isNewInput = true;
            }
            catch (error) {
                if (error instanceof Error) {
                    this.view.setDisplayValue(error.message, true);
                    this.model.clear();
                    this.isNewInput = true;
                }
            }
        };
        this.handleClear = () => {
            this.model.clear();
            this.view.setDisplayValue("0");
            this.view.setOperatorDisplay("");
            this.isNewInput = true;
        };
        this.model = model;
        this.view = view;
        this.view.bindNumber(this.handleNumber);
        this.view.bindOperator(this.handleOperator);
        this.view.bindEquals(this.handleEquals);
        this.view.bindClear(this.handleClear);
    }
    formatResult(value) {
        // Check if the number is an integer
        if (Number.isInteger(value)) {
            return value.toString();
        }
        else {
            // If it's a decimal, format to 2 decimal places
            return value.toFixed(2);
        }
    }
}
