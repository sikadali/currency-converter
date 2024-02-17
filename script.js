import { apiKey } from "./api-key.js"; // i have my API keys there
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/`;

const firstInput = document.getElementById("first");
const secondInput = document.getElementById("second");
const convertButton = document.getElementById("convert");
const switchButton = document.getElementById("switch");
const secondPair = document.getElementById("second-pair");
const firstSelect = document.getElementById("first-cr");
const secondSelect = document.getElementById("second-cr");

convertButton.addEventListener("click", convertAction);
firstInput.addEventListener("input", whitenSecondPair);
switchButton.addEventListener("click", switchAction);

function convertAction() {
     let firstNumber = Number(firstInput.value);

     if (isNaN(firstNumber)) {
          alert("THE ENTRY IS NOT A NUMBER, FIX IT");
     } else {
          let pair = `${firstSelect.value}/${secondSelect.value}`;
          //console.log("CLICK CONVERT " + firstNumber);
          apiCall(url + pair, firstNumber);
          darkenSecondPair();
     }
}

function apiCall(url, value) {
     fetch(url)
          .then((response) => {
               return new Promise((resolve) =>
                    response.json().then((json) =>
                         resolve({
                              status: response.status,
                              ok: response.ok,
                              json,
                         })
                    )
               );
          })
          .then(({ status, json, ok }) => {
               //console.log(json);
               switch (status) {
                    case 404:
                         alert("CURRENCY NOT FOUND, TRY AGAIN");
                         break;
                    case 200:
                         convertCurrencyAndDisplay(value, json["conversion_rate"]);
                         break;
                    default:
                         handleUnexpected(status, json);
               }
          });
}

function darkenSecondPair() {
     secondPair.style.background = "var(--less-dark)";
     secondPair.style.boxShadow = "2px 2px 2px var(--less-dark)";
     secondInput.style.color = "var(--white)";
     secondSelect.style.color = "var(--white)";
}

function whitenSecondPair() {
     secondPair.style.background = "var(--less-white)";
     secondPair.style.boxShadow = "2px 2px 2px var(--less-white)";
     secondInput.style.color = "var(--dark)";
     secondSelect.style.color = "var(--dark)";
}

function convertCurrencyAndDisplay(value, rate) {
     document.getElementById("second").value = (value * rate).toFixed(2);
}

function handleUnexpected(status, json) {
     alert(status + ": " + json["error-type"]);
}

function switchAction() {
     let tempSelect = firstSelect.value;
     firstSelect.value = secondSelect.value;
     secondSelect.value = tempSelect;

     let tempInput = firstInput.value;
     firstInput.value = secondInput.value;
     secondInput.value = tempInput;

     whitenSecondPair();
}
