export class CalculatorView {
  private display: HTMLInputElement;
  private operatorDisplay: HTMLSpanElement;
  private buttons: NodeListOf<HTMLButtonElement>;

  constructor() {
    this.display = document.getElementById("display") as HTMLInputElement;
    this.operatorDisplay = document.querySelector(
      "#operator-display span"
    ) as HTMLSpanElement;
    this.buttons = document.querySelectorAll(
      "#buttons button"
    ) as NodeListOf<HTMLButtonElement>;
    console.log("CalculatorView initialized");
  }

  public getDisplayValue(): string {
    return this.display.value;
  }

  public setDisplayValue(value: string, isError: boolean = false): void {
    this.display.value = value;
    this.display.classList.toggle("error", isError);
    console.log("Display updated:", value, isError ? "(error)" : "");
  }

  public setOperatorDisplay(operator: string): void {
    this.operatorDisplay.textContent = operator;
    console.log("Operator display updated:", operator);
  }

  public bindNumber(handler: (number: string) => void): void {
    this.buttons.forEach((button) => {
      if (
        button.classList.contains("number") ||
        button.classList.contains("decimal")
      ) {
        button.addEventListener("click", () => {
          console.log("Number clicked:", button.textContent);
          if (button.textContent === "+/-") {
            handler("-"); // Use '-' as the input for negation
          } else {
            handler(button.textContent!);
          }
        });
      }
    });
  }

  public bindOperator(handler: (operator: string) => void): void {
    this.buttons.forEach((button) => {
      if (button.classList.contains("operator")) {
        button.addEventListener("click", () => {
          console.log("Operator clicked:", button.textContent);
          handler(button.textContent!);
        });
      }
    });
  }

  public bindEquals(handler: () => void): void {
    const equalsButton = document.querySelector(".equals") as HTMLButtonElement;
    equalsButton.addEventListener("click", () => {
      console.log("Equals clicked");
      handler();
    });
  }

  public bindClear(handler: () => void): void {
    const clearButton = document.querySelector(".clear") as HTMLButtonElement;
    clearButton.addEventListener("click", () => {
      console.log("Clear clicked");
      handler();
    });
  }
}
