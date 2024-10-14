export class CalculatorView {
    constructor() {
        this.display = document.getElementById("display");
        this.operatorDisplay = document.querySelector("#operator-display span");
        this.buttons = document.querySelectorAll("#buttons button");
        console.log("CalculatorView initialized");
    }
    getDisplayValue() {
        return this.display.value;
    }
    setDisplayValue(value, isError = false) {
        this.display.value = value;
        this.display.classList.toggle("error", isError);
        console.log("Display updated:", value, isError ? "(error)" : "");
    }
    setOperatorDisplay(operator) {
        this.operatorDisplay.textContent = operator;
        console.log("Operator display updated:", operator);
    }
    bindNumber(handler) {
        this.buttons.forEach((button) => {
            if (button.classList.contains("number") ||
                button.classList.contains("decimal")) {
                button.addEventListener("click", () => {
                    console.log("Number clicked:", button.textContent);
                    if (button.textContent === "+/-") {
                        handler("-"); // Use '-' as the input for negation
                    }
                    else {
                        handler(button.textContent);
                    }
                });
            }
        });
    }
    bindOperator(handler) {
        this.buttons.forEach((button) => {
            if (button.classList.contains("operator")) {
                button.addEventListener("click", () => {
                    console.log("Operator clicked:", button.textContent);
                    handler(button.textContent);
                });
            }
        });
    }
    bindEquals(handler) {
        const equalsButton = document.querySelector(".equals");
        equalsButton.addEventListener("click", () => {
            console.log("Equals clicked");
            handler();
        });
    }
    bindClear(handler) {
        const clearButton = document.querySelector(".clear");
        clearButton.addEventListener("click", () => {
            console.log("Clear clicked");
            handler();
        });
    }
}
