import usedCars from "./usedCars.js";

const form = document.getElementById("filters-form");
const container = document.getElementById("content-container");
const color = document.getElementById("color");
const make = document.getElementById("make");
const year = document.getElementById("year");

function clearContainer() {
  container.innerHTML = "";
}

function createCarCard(car) {
  const { year, color, make, model, price, mileage, gasMileage } = car;
  return `
  <div class="car-card">
    <div class="card-img-container">
      <img src="./assets/images/${make}-${model}.png" alt="${color}-${make}-${model}" />
    </div>
    <div class="car-card-info">
      <h2>${make} ${model}</h2>
      <p>${year}</p>
      <p>$${price}</p>
      <p>Mileage: ${mileage}</p>
      <p>Gas Mileage: ${gasMileage}</p>
      <p>Color: ${color}</p>
    </div>
  </div>
  `;
}

function generateCarCards(cars) {
  clearContainer();
  return cars.map((car) => createCarCard(car)).join("");
}

function getCarColors(cars) {
  var uniqueColors = new Set(); 
  cars.forEach((car) => {
    uniqueColors.add(car.color);
  });
  uniqueColors = [...uniqueColors];
  return uniqueColors.sort();
}

function createColorFilter(color) {
  return `
    <div>
      <input type="radio" name="color" id="${color}" value="${color}" />
      <label for="${color}">${color}</label>
    </div>
    `;
}

function generateColorFilters(colors) {
  return colors.map((color) => createColorFilter(color)).join("");
}

function getCarYears(cars) {
  var uniqueYears = new Set();
  cars.forEach((car) => {
    uniqueYears.add(car.year);
  });
  uniqueYears = [...uniqueYears];
  return uniqueYears.sort(function (a, b) {
    return a - b; 
  });
}

function createYearFilter(year) {
  return `
  <div>
    <input type="radio" name="year" id="${year}" />
    <label for="${year}">${year}</label>
  </div>
  `;
}

function generateYearFilters(years) {
  return years.map((year) => createYearFilter(year)).join("");
}

function getCarMakes(cars) {
  var uniqueMakes = new Set();
  cars.forEach((car) => {
    uniqueMakes.add(car.make);
  });
  uniqueMakes = [...uniqueMakes];
  return uniqueMakes.sort();
}

function createMakeFilter(make) {
  return `
  <div>
    <input type="radio" name="make" id="${make}" />
    <label for="${make}">${make}</label>
  </div>
  `;
}

function generateMakeFilters(makes) {
  return makes.map((make) => createMakeFilter(make)).join("");
}

const colors = getCarColors(usedCars);
const makes = getCarMakes(usedCars);
const years = getCarYears(usedCars).toString();
const prices = ["16000", "20000", "40000", "50000"];
const mileages = ["15000", "30000", "45000", "60000"];

form.addEventListener("submit", (event, car) => {
  event.preventDefault();

  var checkedCheckboxes = document.querySelectorAll(
    "input[type=radio]:checked"
  );
  console.log(checkedCheckboxes);
  var choiceFilters = [];
  var priceFilters = [];
  var mileageFilters = [];
  if (checkedCheckboxes.length === 0) {
    var filteredCars = [""];
    console.log("No filters selected, resetting page...");
    container.innerHTML = generateCarCards(usedCars);
  } else {
    checkedCheckboxes.forEach((checkbox) => {
      if (colors.includes(checkbox.id)) {
        choiceFilters.push(checkbox.id);
      } else if (makes.includes(checkbox.id)) {
        choiceFilters.push(checkbox.id);
      } else if (years.includes(checkbox.id)) {
        choiceFilters.push(checkbox.id);
      } else if (prices.includes(checkbox.id)) {
        priceFilters.push(checkbox.id);
      } else if (mileages.includes(checkbox.id)) {
        mileageFilters.push(checkbox.id);
      }
      console.log(choiceFilters);
      filteredCars = usedCars.filter((car) => {
        return (
          choiceFilters.every(
            (filter) =>
              car.color === filter ||
              car.year === parseInt(filter) ||
              car.make === filter
          ) &&
          priceFilters.every( filter => car.price <= filter) &&
          mileageFilters.every( filter => car.mileage >= filter)
        );
      });
      container.innerHTML =
        filteredCars.length > 0
          ? generateCarCards(filteredCars)
          : "<p>Sorry, we don't possess any cars that match your filters. :(</p>";
    });
  }
});

document.getElementById("clear-btn").addEventListener("click", function () {
  var checkedCheckboxes = document.querySelectorAll("input[type=radio]");
  checkedCheckboxes.forEach((checkbox) => {
    checkbox.checked = false; 
  });
  container.innerHTML = generateCarCards(usedCars);
});

function init() {
  container.innerHTML = generateCarCards(usedCars);
  color.innerHTML = generateColorFilters(getCarColors(usedCars));
  make.innerHTML = generateMakeFilters(getCarMakes(usedCars));
  year.innerHTML = generateYearFilters(getCarYears(usedCars));
}

init();