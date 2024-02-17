import { apiKey } from "./api-key.js"; // i have my API keys there
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/`;

const convertButton = document.getElementById("convert");

convertButton.addEventListener("click", () => {
     let firstNumber = Number(document.getElementById("first").value);

     if (isNaN(firstNumber)) {
          alert("THE ENTRY IS NOT A NUMBER, FIX IT");
     } else {
          let pair = `EUR/USD`;
          console.log("CLICK CONVERT " + firstNumber);
          apiCall(url + pair, firstNumber);
     }
});

function apiCall(url, firstNumber) {
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
               console.log(json);
               switch (status) {
                    case 404:
                         alert("CURRENCY NOT FOUND, TRY AGAIN");
                         break;
                    case 200:
                         console.log("YIPPI !!");
                         console.log("RESULT " + json["conversion_rate"]);
                         break;
                    default:
                         handleUnexpected(status, json);
               }
          });
}

function handleUnexpected(status, json) {
     alert(status + ": " + json["error-type"]);
}
