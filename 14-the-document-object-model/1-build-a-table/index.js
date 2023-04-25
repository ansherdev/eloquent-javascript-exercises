const MOUNTAINS = [
  { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
  { name: "Everest", height: 8848, place: "Nepal" },
  { name: "Mount Fuji", height: 3776, place: "Japan" },
  { name: "Vaalserberg", height: 323, place: "Netherlands" },
  { name: "Denali", height: 6168, place: "United States" },
  { name: "Popocatepetl", height: 5465, place: "Mexico" },
  { name: "Mont Blanc", height: 4808, place: "Italy/France" },
];

function buildTable(arr) {
  const table = document.createElement("table");
  const header = document.createElement("tr");

  for (let i = 0; i < arr.length; i++) {
    const keys = Object.keys(arr[i]);
    const row = document.createElement("tr");

    keys.forEach((key) => {
      if (i === 0) {
        const cell = document.createElement("th");
        cell.innerText = key;
        header.append(cell);
      }

      const cell = document.createElement("td");
      cell.innerText = MOUNTAINS[i][key];
      row.appendChild(cell);
    });

    if (i === 0) {
      table.appendChild(header);
    }

    table.appendChild(row);
  }

  return table;
}

document.querySelector("#app").appendChild(buildTable(MOUNTAINS));
