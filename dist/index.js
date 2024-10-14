import { CalculatorModel as Calculator } from "./model/CalculatorModel.js";
import { CalculatorView } from "./view/CalculatorView.js";
import { CalculatorPresenter } from "./presenter/CalculatorPresenter.js";
document.addEventListener("DOMContentLoaded", () => {
    const model = new Calculator();
    const view = new CalculatorView();
    new CalculatorPresenter(model, view);
    console.log("Calculator initialized");
});
