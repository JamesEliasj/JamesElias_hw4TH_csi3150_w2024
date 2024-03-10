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
  const cardsHtml = cars.map((car) => createCarCard(car)).join("");
  container.innerHTML = cardsHtml || "<p>No cars found.</p>";
}

function getUniqueValues(cars, key) {
  return [...new Set(cars.map(car => car[key]))].sort();
}

function createFilterOptions(options) {
  return options.map(option => `
    <div>
      <input type="radio" name="${option}" id="${option}" value="${option}" />
      <label for="${option}">${option}</label>
    </div>
  `).join("");
}

function filterCars(event) {
  event.preventDefault();

  const checkedOptions = [...document.querySelectorAll("input[type=radio]:checked")].map(input => input.value);

  const filteredCars = usedCars.filter(car =>
    checkedOptions.every(option =>
      car.color === option || car.make === option || car.year === parseInt(option) || car.price <= parseInt(option) || car.mileage >= parseInt(option)
    )
  );

  generateCarCards(filteredCars);
}

function clearFilters() {
  form.reset();
  generateCarCards(usedCars);
}

form.addEventListener("submit", filterCars);
document.getElementById("clear-btn").addEventListener("click", clearFilters);

function init() {
  generateCarCards(usedCars);
  color.innerHTML = createFilterOptions(getUniqueValues(usedCars, 'color'));
  make.innerHTML = createFilterOptions(getUniqueValues(usedCars, 'make'));
  year.innerHTML = createFilterOptions(getUniqueValues(usedCars, 'year').map(year => year.toString()));
}

init();
