document.addEventListener("keyup", (e) => {
  if (e.key === 'Enter') {
    const input1 = Number(document.querySelector("#input1").value);

    const select1 = document.querySelector("#select1").value;
    const select2 = document.querySelector("#select2").value;

    if (input1 > 0 && select1 && select2) return fetchData(input1, select1, select2);
  }
});

const fetchData = (value, currencyFrom, currencyTo) => {
  fetch("https://www.cbr-xml-daily.ru/latest.js")
    .then((response) => response.json())
    .then((data) => {
      const rates = data.rates;

      let rubFrom = 0;
      let rubTo = 0;

      if (currencyFrom === currencyTo) return document.querySelector("#input2").value = value;
      if (currencyFrom === "RUB") rubFrom = value;

      Object.keys(rates).forEach((rkey) => {
        if (rkey == currencyFrom) rubFrom = value / rates[rkey];
      });

      if (currencyTo === "RUB") {
        Object.keys(rates).forEach((rkey) => {
          if (rkey == currencyFrom) rubTo = value / rates[rkey];
        });

      } else { 
        Object.keys(rates).forEach((rkey) => {
          if (rkey == currencyTo) rubTo = rubFrom * rates[rkey];
        });
      }

      rubTo = rubTo.toFixed(2);

      return document.querySelector("#input2").value = rubTo;
    });
}