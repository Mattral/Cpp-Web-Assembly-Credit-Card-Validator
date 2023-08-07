// Create an object to hold the Module
const Module = {};

// Attach the onRuntimeInitialized function to Module
Module.onRuntimeInitialized = function() {
  function is_credit_card_valid(p0) {
    console.log("WebAssembly function: is_credit_card_valid() called with parameter:", p0);
    var ret = Module.ccall('is_credit_card_valid', 'number', ['string'], [p0]);
    console.log("WebAssembly function: is_credit_card_valid() returned:", ret);
    return ret !== 0;
  }

  function validateCreditCard() {
    console.log("Validating credit card...");

    const cardNumber = document.getElementById('cardNumber').value;
    console.log("Card number:", cardNumber);

    const result = is_credit_card_valid(cardNumber);
    console.log("Result:", result);

    document.getElementById('result').innerText = result ? 'Valid card number!' : 'Invalid card number!';
  }

  // Attach the validateCreditCard function to the button click event
  document.getElementById('validateButton').addEventListener('click', validateCreditCard);
};

// Load the WebAssembly module
const wasmFile = 'credit_card_validator.wasm';
const xhr = new XMLHttpRequest();
xhr.open('GET', wasmFile, true);
xhr.responseType = 'arraybuffer';

xhr.onload = function () {
  // Create an Uint8Array from the response
  const data = new Uint8Array(xhr.response);

  // Initialize the Emscripten runtime with the provided Module object
  Module = window.Module(Module);
  Module.wasmBinary = data;

  // Call the onRuntimeInitialized function manually
  Module.onRuntimeInitialized();
};

xhr.send();
