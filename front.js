var expressionNode = document.getElementById("Expression");
var expression = expressionNode.innerHTML;
var expressionLength = expression.length;
var maskLength;
if (expressionLength <= 3) maskLength = 1;
else if (expressionLength <= 6) maskLength = 3;
else maskLength = 4;

var maskedExp;
if (expressionLength <= 3) {
  maskedExp = `${expression[0]}__`;
} else if (expressionLength <= 8) {
  maskedExp = `${expression.substring(0, 2)}___${
    expression[expressionLength - 1]
  }`;
} else {
  maskedExp = `${expression.substring(0, 2)}___${expression.substring(
    expressionLength - 3,
    expressionLength - 1
  )}`;
}
