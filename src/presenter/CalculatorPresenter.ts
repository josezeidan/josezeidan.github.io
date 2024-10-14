import { CalculatorModel } from "../model/CalculatorModel.js";
import { CalculatorView } from "../view/CalculatorView.js";

export class CalculatorPresenter {
  private model: CalculatorModel;
  private view: CalculatorView;
  private isNewInput: boolean = true;

  constructor(model: CalculatorModel, view: CalculatorView) {
    this.model = model;
    this.view = view;

    this.view.bindNumber(this.handleNumber);
    this.view.bindOperator(this.handleOperator);
    this.view.bindEquals(this.handleEquals);
    this.view.bindClear(this.handleClear);
  }

  private handleNumber = (number: string): void => {
    let currentValue = this.view.getDisplayValue();

    if (this.isNewInput) {
      currentValue = "";
      this.isNewInput = false;
    }

    // Handle negation
    if (number === "-") {
      if (currentValue === "" || currentValue === "0") {
        this.view.setDisplayValue("-");
      } else if (currentValue.charAt(0) === "-") {
        this.view.setDisplayValue(currentValue.substr(1));
      } else {
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

  private formatResult(value: number): string {
    // Check if the number is an integer
    if (Number.isInteger(value)) {
      return value.toString();
    } else {
      // If it's a decimal, format to 2 decimal places
      return value.toFixed(2);
    }
  }

  private handleEquals = (): void => {
    try {
      const currentValue = parseFloat(this.view.getDisplayValue());
      if (
        this.model.getFirstNumber() !== null &&
        this.model.getOperator() !== null
      ) {
        this.model.setSecondNumber(currentValue);
        const result = this.model.calculate();
        this.view.setDisplayValue(this.formatResult(result)); // Use the new format method
        this.model.setFirstNumber(result);
        this.model.setSecondNumber(null);
        this.model.setOperator(null);
        this.view.setOperatorDisplay("");
        this.isNewInput = true;
      }
    } catch (error) {
      if (error instanceof Error) {
        this.view.setDisplayValue(error.message, true);
        this.model.clear();
        this.isNewInput = true;
      }
    }
  };

  private handleOperator = (operator: string): void => {
    try {
      const currentValue = parseFloat(this.view.getDisplayValue());

      if (this.model.getFirstNumber() === null) {
        this.model.setFirstNumber(currentValue);
      } else if (this.model.getOperator() !== null && !this.isNewInput) {
        this.model.setSecondNumber(currentValue);
        const result = this.model.calculate();
        this.view.setDisplayValue(this.formatResult(result)); // Use the new format method
        this.model.setFirstNumber(result);
        this.model.setSecondNumber(null);
      }

      this.model.setOperator(operator);
      this.view.setOperatorDisplay(operator);
      this.isNewInput = true;
    } catch (error) {
      if (error instanceof Error) {
        this.view.setDisplayValue(error.message, true);
        this.model.clear();
        this.isNewInput = true;
      }
    }
  };

  private handleClear = (): void => {
    this.model.clear();
    this.view.setDisplayValue("0");
    this.view.setOperatorDisplay("");
    this.isNewInput = true;
  };
}
