// script.js
document.addEventListener('DOMContentLoaded', function() {
  const input1 = document.getElementById('input1');
  const input2 = document.getElementById('input2');
  const andOutput = document.getElementById('and-output');

  function updateAndOutput() {
    const inputValue1 = input1.checked;
    const inputValue2 = input2.checked;
    const outputValue = inputValue1 && inputValue2;
    andOutput.textContent = outputValue.toString();
  }

  input1.addEventListener('change', updateAndOutput);
  input2.addEventListener('change', updateAndOutput);

  // Add similar event listeners for other gates
});
