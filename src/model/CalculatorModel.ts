export class CalculatorModel {
  private static readonly MAX_VALUE = 9999.99;
  private static readonly MIN_VALUE = -9999.99;

  private firstNumber: number | null = null;
  private secondNumber: number | null = null;
  private operator: string | null = null;

  private checkBoundaries(value: number): void {
    if (
      value > CalculatorModel.MAX_VALUE ||
      value < CalculatorModel.MIN_VALUE
    ) {
      throw new Error("ERROR: number out of boundaries.");
    }
  }

  public setFirstNumber(value: number): void {
    this.checkBoundaries(value);
    this.firstNumber = value;
  }

  public setSecondNumber(value: number | null): void {
    if (value !== null) {
      this.checkBoundaries(value);
      this.secondNumber = value;
    } else {
      this.secondNumber = null;
    }
  }

  public setOperator(operator: string | null): void {
    this.operator = operator;
  }

  public calculate(): number {
    if (
      this.firstNumber === null ||
      this.secondNumber === null ||
      this.operator === null
    ) {
      throw new Error("Incomplete operation");
    }

    let result: number;
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

  public clear(): void {
    this.firstNumber = null;
    this.secondNumber = null;
    this.operator = null;
    
  }

  public getFirstNumber(): number | null {
    return this.firstNumber;
  }

  public getSecondNumber(): number | null {
    return this.secondNumber;
  }

  public getOperator(): string | null {
    return this.operator;
  }

  public truncateToTwoDecimals(value: number): number {
    return Math.trunc(value * 100) / 100;
  }
}
