const OPERATORS = new Set(["+", "-", "*", "/"]);

function performOperation(left, operator, right) {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      if (right === 0) {
        throw new Error("Cannot divide by zero");
      }
      return left / right;
    default:
      return right;
  }
}

function normalizeNumber(value) {
  const asNumber = Number(value);
  if (!Number.isFinite(asNumber)) {
    throw new Error("Invalid result");
  }
  return String(Number(asNumber.toFixed(12)));
}

export class CalculatorTwin {
  constructor() {
    this.reset();
  }

  reset() {
    this.display = "0";
    this.previousValue = null;
    this.operator = null;
    this.waitingForNextValue = false;
    this.error = null;
  }

  input(token) {
    if (token === "C") {
      this.reset();
      return this.getSnapshot();
    }

    if (this.error) {
      if (/^[0-9.]$/.test(token)) {
        this.reset();
      } else {
        return this.getSnapshot();
      }
    }

    if (/^[0-9]$/.test(token)) {
      this.handleDigit(token);
      return this.getSnapshot();
    }

    if (token === ".") {
      this.handleDot();
      return this.getSnapshot();
    }

    if (token === "DEL") {
      this.handleDelete();
      return this.getSnapshot();
    }

    if (OPERATORS.has(token)) {
      this.handleOperator(token);
      return this.getSnapshot();
    }

    if (token === "=") {
      this.handleEquals();
      return this.getSnapshot();
    }

    return this.getSnapshot();
  }

  handleDigit(digit) {
    if (this.waitingForNextValue) {
      this.display = digit;
      this.waitingForNextValue = false;
      return;
    }

    this.display = this.display === "0" ? digit : this.display + digit;
  }

  handleDot() {
    if (this.waitingForNextValue) {
      this.display = "0.";
      this.waitingForNextValue = false;
      return;
    }

    if (!this.display.includes(".")) {
      this.display += ".";
    }
  }

  handleDelete() {
    if (this.waitingForNextValue) {
      return;
    }

    this.display = this.display.length === 1 ? "0" : this.display.slice(0, -1);
  }

  handleOperator(nextOperator) {
    const inputValue = Number(this.display);

    if (this.operator && !this.waitingForNextValue) {
      this.compute(inputValue);
    } else {
      this.previousValue = inputValue;
    }

    this.operator = nextOperator;
    this.waitingForNextValue = true;
  }

  handleEquals() {
    if (!this.operator) {
      return;
    }

    const inputValue = Number(this.display);
    this.compute(inputValue);
    this.operator = null;
    this.waitingForNextValue = true;
  }

  compute(inputValue) {
    try {
      const result = performOperation(this.previousValue ?? 0, this.operator, inputValue);
      const normalized = normalizeNumber(result);
      this.display = normalized;
      this.previousValue = Number(normalized);
      this.error = null;
    } catch (error) {
      this.error = error.message;
      this.display = "0";
      this.previousValue = null;
      this.operator = null;
      this.waitingForNextValue = true;
    }
  }

  getSnapshot() {
    return {
      display: this.display,
      previousValue: this.previousValue,
      operator: this.operator,
      waitingForNextValue: this.waitingForNextValue,
      error: this.error
    };
  }
}

export function runSequence(sequence) {
  const twin = new CalculatorTwin();
  let snapshot = twin.getSnapshot();
  for (const key of sequence) {
    snapshot = twin.input(key);
  }
  return snapshot;
}