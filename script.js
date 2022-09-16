/* Selecionando os elementos do arquivo HTML. */
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");


/* Criando uma classe chamada Calculator */
class Calculator {

    /* Criando uma função construtora que é chamada quando uma instância da classe é criada */
    constructor(previousOperandTextElement, currentOperandTextElement ) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;

        /* Limpando o currentOperand e o previousOperand. */
        this.clear();
    }

    /* Convertendo o número em uma string. */
    formatDisplayNumber(number) {
        const stringNumber = number.toString();

        /* Dividindo o número em duas partes, a parte inteira e a parte decimal. */
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        /* Declarando uma variável chamada integerDisplay. */
        let integerDisplay;

       /* Verificando se o número não é um número. Se não for um número, retornará uma string vazia. 
       Se for um número, retornará o número com os dígitos fracionários máximos de 0. */
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }

        /* Verificando se o decimalDigits não é nulo. Se não for nulo, retornará o
         integerDisplay e decimalDigits. Se for nulo, retornará o integerDisplay. */
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    /**
     * Ele exclui o último caractere da string currentOperand.
     */
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    /* Convertendo o previousOperand e currentOperand para um número. */
    calculate() {
        let result;

        const _previousOperand = parseFloat(this.previousOperand);
        const _currentOperand = parseFloat(this.currentOperand);

       
       /* Verificando se o previousOperand ou currentOperand não é um número. Se não for um número,
        retornará. */
        if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

        /* Uma instrução switch. Ele é usado para executar diferentes ações com base em diferentes condições. */
        switch (this.operation) {
            case '+':
                result = _previousOperand + _currentOperand;
                break;
    
             case '-':
                result = _previousOperand - _currentOperand;
                break;

            case '/':
                result = _previousOperand / _currentOperand;
                break;

            case 'X':
                result = _previousOperand * _currentOperand;
                break;
            default:
                return;
        }

        /* Limpando o previousOperand e operation. */
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    /* Verificando se o currentOperand está vazio. Se estiver vazio, ele retornará. */
    chooseOperation(operation) {
        if (this.currentOperand == "") return;

       /* Verificando se o previusOperand anterior não está vazio. Se não estiver vazio, ele chamará a função de calculate. */
        if (this.previousOperand != "") {
            this.calculate()
        }

       /* Configurando o operation para operação atual e configurando o previousOperand para o
       currentOperand. */
        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
/**
 * Se o currentOperand incluir um ponto decimal e o número for um ponto decimal, retorne. Por outro lado,
 * anexar o número ao currentOperand
 * @param number - O número que está sendo anexado ao currentOperand.
 * @returns O currentOperand está sendo retornado.
 */
    appendNumber(number) {
        if (this.currentOperand.includes(".") && number == ".") return;

        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

  /**
   * A função clear define o currentOperand, previousOperand como string vazia e a operation como undefined.
   */
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;    
    }

    /**
     * Esta função atualiza o display da calculadora exibindo o operando anterior, o
      * operação e o operando atual.
     */
    updateDisplay() {
        this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation || ""}`;
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);

    }
}

/* Criando uma nova instância da classe Calculator.*/
const calculator = new Calculator(
   /* Passando os valores de previousOperandTextElement e currentOperandTextElement para o
    construtor.*/
    previousOperandTextElement,
    currentOperandTextElement
);

/* Adicionando um ouvinte de evento a cada botão numérico. Quando o botão for clicado, ele anexará o
number para o currentOperand e atualiza o display. */
for (const numberButton of numberButtons) {
    numberButton.addEventListener("click", () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
}

/*Adicionando um ouvinte de eventos a cada botão de operação. Quando o botão for clicado, ele escolherá o
operação e atualiza o visor. */
for (const operationButton of operationButtons) {
    operationButton.addEventListener("click", () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    });
}

/* Adicionando um ouvinte de evento ao allClearButton. Quando o allClearButton for clicado, ele chamará o
limpar a função e atualizar a exibição.*/
allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

/* Adicionando um ouvinte de evento ao equalsButton. Quando o equalsButton for clicado, ele chamará o
calcular a função e atualizar a exibição. */
equalsButton.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
});

/* Excluindo o último caractere do currentOperand. */
deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});