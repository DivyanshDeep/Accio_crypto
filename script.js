"use strict";

const apiUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

// Fetch data using .then
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => renderTable(data))
  .catch((error) => console.error(error));

// Fetch data using async/await
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    console.error(error);
  }
}
fetchData();

// Render table with the data
function renderTable(data) {
  const coinTableBody = document.getElementById("coinTableBody");
  coinTableBody.innerHTML = "";

  data.forEach((coin) => {
    const { name, id, image, symbol, current_price, total_volume } = coin;

    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${name}</td>
          <td>${id}</td>
          <td><img src="${image}" width="25" height="25"></td>
          <td>${symbol}</td>
          <td>${current_price}</td>
          <td>${total_volume}</td>
        `;

    coinTableBody.appendChild(row);
  });
}
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", () => {
  const filter = searchInput.value.toLowerCase();
  const filteredData = data.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(filter) ||
      coin.symbol.toLowerCase().includes(filter) ||
      coin.id.toLowerCase().includes(filter)
    );
  });

  renderTable(filteredData);
});

const sortButton = document.getElementById("sortButton");
sortButton.addEventListener("click", () => {
  const sortedData = [...data];
  sortedData.sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sortedData);
});
